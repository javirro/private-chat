import { createContext, ReactNode, useEffect, useState } from 'react'
import { WebSocketContextType, WebSocketsMessage } from '../types/generalTypes'
import { useChatId } from '../hooks/useChatId'
import { useDispatch } from 'react-redux'
import { updateChatId } from '../redux/chatIdSlice'

const WEBSOCKET_URL = 'ws://localhost:5000'

export const SocketContext = createContext<WebSocketContextType | undefined>(undefined)

const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [receivedData, setReceivedData] = useState<string | null>(null)

  const chatId = useChatId()

  const dispatch = useDispatch()

  //* Connect to the websocket server
  const connect = (sessionParam?: string) => {
    const socketUrl = sessionParam ? `${WEBSOCKET_URL}?chat=${sessionParam}` : WEBSOCKET_URL
    try {
      setSocket((prevSockect: WebSocket | null) => {
        if (!prevSockect) return new WebSocket(`${socketUrl}`)
        return prevSockect
      })
    } catch (error) {
      console.error('Error connecting to websocket', error)
    }
  }

  //* Clean received data
  const cleanReceivedData = () => {
    setReceivedData(null)
  }

  // Open connection
  useEffect(() => {
    socket?.addEventListener('open', () => {
      console.info('Open socket connection')
    })

    return () => {
      socket?.removeEventListener('open', () => console.log('Unmounting open listener'))
    }
  }, [socket])

  // Error handler
  useEffect(() => {
    socket?.addEventListener('error', (event: Event) => {
      console.error('Error in websocket.', event)
    })

    return () => {
      socket?.removeEventListener('error', () => console.log('Unmounting error listener'))
    }
  }, [socket])

  //* listen messages
  useEffect(() => {
    socket?.addEventListener('message', (event) => {
      const stringMessage: string = event.data
      setReceivedData(stringMessage)
      const data: WebSocketsMessage = JSON.parse(stringMessage)
      if (data.type === 'join') {
        dispatch(updateChatId(data.socketId))
      }
    })
    return () => {
      socket?.removeEventListener('message', () => console.log('Unmounting message listener'))
    }
  }, [socket])

  //* Reconnect after 3 seconds if the connection is closed
  useEffect(() => {
    if (!socket) return
    socket?.addEventListener('close', () => {
      console.log('Close listenner chatId', chatId)
      console.warn(`Socket ${chatId} closed. Trying to reconnect in 3 seconds...`)
      setSocket(null)
      setTimeout(() => connect(), 3000)
    })
    return () => {
      socket?.removeEventListener('close', () => console.log('Unmounting close listener'))
    }
  }, [chatId])

  return <SocketContext.Provider value={{ connect, cleanReceivedData, socket, receivedData }}>{children}</SocketContext.Provider>
}

export default WebSocketProvider
