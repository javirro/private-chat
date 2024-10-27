import { useContext } from 'react'
import { SocketContext } from '../Websockets/WebSocketProvider'
import { WebSocketContextType } from '../types/generalTypes'

export const useWebSocket = () => {
  const { socket, connect, receivedData, cleanReceivedData } = useContext(SocketContext) as WebSocketContextType
  return { socket, connect, receivedData, cleanReceivedData }
}
