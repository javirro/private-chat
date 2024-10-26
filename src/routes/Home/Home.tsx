import React from 'react'
import CTAButton from '../../components/Buttons/CTAButton'
import { useWebSocket } from '../../hooks/useSocket'

import './Home.css'

const Home: React.FC = () => {
  const { connect, receivedData } = useWebSocket()
  console.log('Home -> receivedData', receivedData)
  const handleJoin = () => {
    connect()
  }
  return (
    <section className="home">
      <h1>Welcome to the chat</h1>
      <div className="join-box">
        <p>Join to the biggest real time chat</p>
        <CTAButton text="Join chat" onClick={handleJoin} />
      </div>
    </section>
  )
}

export default Home
