import { Link } from 'react-router-dom'
import { AppRoutes } from '../../routes/routesDefinition'
import { useWebSocket } from '../../hooks/useSocket'
import './ChatsCard.css'



export interface ChatsCardProps {
  name: string
  description: string
  id: number
}

const ChatsCard: React.FC<ChatsCardProps> = ({ name, description, id }) => {
  const { connect} = useWebSocket()

  const handleConnect = () => {
    connect(name.toLowerCase())

  }
  return (
    <Link className="chat-card" to={AppRoutes.Chat + id} onClick={handleConnect}>
      <h3>{name}</h3>
      <p>{description}</p>
    </Link>
  )
}

export default ChatsCard
