import { createContext, ReactNode, useEffect, useState } from 'react'
import { ChatType, WebSocketContextType, WebSocketsMessage } from '../types/generalTypes'
import { useChatId } from '../hooks/useChatId'
import { useDispatch } from 'react-redux'
import { updateChatId } from '../redux/chatIdSlice'
import { DEVELOPMENT } from '../contants'

const WEBSOCKET_URL =  DEVELOPMENT ? 'ws://localhost:5000' : 'wss://chat-back.bilito.fun'

export const SocketContext = createContext<WebSocketContextType | undefined>(undefined)

const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [receivedData, setReceivedData] = useState<string | null>(null)
  const [chatType, setChatType] = useState<ChatType | null>(null)

  const socketId = useChatId()

  const dispatch = useDispatch()

  //* Connect to the websocket server
  const connect = (sessionParam?: ChatType) => {
    setChatType(sessionParam as ChatType)
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
      console.log('Close listenner chatId', socketId)
      console.warn(`Socket ${socketId} closed. Trying to reconnect in 3 seconds...`)
      setSocket(null)
      setTimeout(() => {
        if (!chatType) return
        connect(chatType)
      }, 3000)
    })
    return () => {
      socket?.removeEventListener('close', () => console.log('Unmounting close listener'))
    }
  }, [socketId])

  return <SocketContext.Provider value={{ connect, cleanReceivedData, socket, receivedData, setChatType }}>{children}</SocketContext.Provider>
}

export default WebSocketProvider
