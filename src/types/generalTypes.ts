export interface ModalContextType {
  showModal: boolean
  setShowModal: (s: boolean) => void
}

export type Language = 'en' | 'es'

export interface WebSocketContextType {
  connect: (sessionParam?: ChatType) => void
  cleanReceivedData: () => void
  socket: WebSocket | null
  receivedData: string | null
  setChatType: (chat: ChatType | null) => void
}

export type WebSocketMessageType = 'join' | 'message' | 'leave'

export type ChatType = 'pets' | 'football' | 'movies'
export interface WebSocketsMessage {
  type: WebSocketMessageType
  content: string
  chat: ChatType
  socketId: string
}
