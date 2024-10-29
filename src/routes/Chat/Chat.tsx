import chats from '../../data/chats.json'
import { useNavigate, useParams } from 'react-router-dom'
import { ChangeEvent, useMemo, useState } from 'react'
import { AppRoutes } from '../routesDefinition'
import { useWebSocket } from '../../hooks/useSocket'
import { ChatType, WebSocketsMessage } from '../../types/generalTypes'
import { useChatId } from '../../hooks/useChatId'

import './Chat.css'

type OwsershipMessage = 'sent' | 'received'

interface MessagesShown {
  message: string
  ownership: OwsershipMessage
}

const Chat = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const thisChat = chats.find((chat) => chat.id === parseInt(id as string))
  const chatName: ChatType = (thisChat?.name as string).toLowerCase() as ChatType
  const [text, setText] = useState<string>('')
  const [messages, setMessages] = useState<MessagesShown[]>([])
  const { socket, receivedData, setChatType } = useWebSocket()
  const chatId = useChatId()

  useMemo(() => {
    if (receivedData) {
      const data: WebSocketsMessage = JSON.parse(receivedData)
      if (data.chat === chatName) {
        setMessages([...messages, { message: data.content, ownership: 'received' }])
      }
    }
  }, [receivedData])

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const sendMessage = () => {
    if (!socket) return
    const message: WebSocketsMessage = {
      type: 'message',
      content: text,
      chat: chatName,
      socketId: chatId,
    }
    socket.send(JSON.stringify(message))
    setMessages([...messages, { message: message.content, ownership: 'sent' }])
    setText('')
  }

  const handleLeave = () => {
    socket?.close()
    setChatType(null)
    navigate(AppRoutes.Home)
  }

  return (
    <div className="chat-page">
      <section className="middle">
        <header>
          <h4>{thisChat?.name}</h4>
          <button onClick={handleLeave}>Leave</button>
        </header>

        <section className="content-box">
          <div className="messages-list">
            {messages.map((m: MessagesShown, index) => (
              <div className={`message ${m.ownership}`} key={index}>
                <p>{m.message}</p>
              </div>
            ))}
          </div>
          <div className="input">
            <input type="text" placeholder="Type a message" onChange={handleInput} value={text} max={120} />
            <button onClick={sendMessage}>Send</button>
          </div>
        </section>
      </section>
    </div>
  )
}

export default Chat
