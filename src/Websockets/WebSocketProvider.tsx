import { createContext, ReactNode, useEffect, useState } from 'react'

const WEBSOCKET_URL = 'wss://api.example.com/ws/'

interface WebSocketContextType {
  connect: (sessionParam?: string) => void
  cleanReceivedData: () => void
  socket: WebSocket | null
  receivedData: string | null
}

export const SocketContext = createContext<WebSocketContextType | undefined>(undefined)

const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [receivedData, setReceivedData] = useState<string | null>(null)

  // Connect to the websocket server
  const connect = (sessionParam?: string) => {
    const socketUrl = sessionParam ? `${WEBSOCKET_URL}${sessionParam}` : WEBSOCKET_URL
    try {
      setSocket((prevSockect: WebSocket | null) => {
        if (!prevSockect) return new WebSocket(`${socketUrl}`)
        return prevSockect
      })
    } catch (error) {
      console.error('Error connecting to websocket', error)
    }
  }

  //Clean received data
  const cleanReceivedData = () => {
    setReceivedData(null)
  }

  // Open connection
  useEffect(() => {
    socket?.addEventListener('open', (event: Event) => {
      console.log('Socket open connection', event)
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

  // listen messages
  useEffect(() => {
    socket?.addEventListener('message', (event) => {
      console.log('Received message from server')
      const stringMessage: string = event.data
      setReceivedData(stringMessage)
    })
    return () => {
      socket?.removeEventListener('message', () => console.log('Unmounting message listener'))
    }
  }, [socket])

  // Reconnect after 3 seconds if the connection is closed
  useEffect(() => {
    socket?.addEventListener('close', () => {
      console.log('WebSocket closed, trying to reconnect...')
      setTimeout(() => connect(), 3000)
    })
    return () => {
      socket?.removeEventListener('close', () => console.log('Unmounting close listener'))
    }
  }, [socket])

  // Clean up the socket connection
  useEffect(() => {
    return () => {
      if (socket) {
        socket.close()
      }
    }
  }, [socket])

  return <SocketContext.Provider value={{ connect, cleanReceivedData, socket, receivedData }}>{children}</SocketContext.Provider>
}

export default WebSocketProvider
