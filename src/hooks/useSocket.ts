import { useContext } from 'react'
import { SocketContext, WebSocketContextType } from '../Websockets/WebSocketProvider'

export const useWebSocket = () => {
  const { socket, connect, receivedData, cleanReceivedData } = useContext(SocketContext) as WebSocketContextType
  return { socket, connect, receivedData, cleanReceivedData }
}
