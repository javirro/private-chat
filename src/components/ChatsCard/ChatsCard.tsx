import { Link } from 'react-router-dom'
import { AppRoutes } from '../../routes/routesDefinition'
import { useWebSocket } from '../../hooks/useSocket'
import { ChatType } from '../../types/generalTypes'

import './ChatsCard.css'

export interface ChatsCardProps {
  name: string
  description: string
  id: number
}

const ChatsCard: React.FC<ChatsCardProps> = ({ name, description, id }) => {
  const { connect } = useWebSocket()
  const chatType = name.toLowerCase() as ChatType
  const handleConnect = () => {
    connect(chatType)
  }
  return (
    <Link className="chat-card" to={AppRoutes.Chat + id} onClick={handleConnect}>
      <h3>{name}</h3>
      <p>{description}</p>
    </Link>
  )
}

export default ChatsCard
