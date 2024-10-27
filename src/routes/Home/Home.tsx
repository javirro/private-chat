import React from 'react'
import chats from '../../data/chats.json'
import ChatsCard from '../../components/ChatsCard/ChatsCard'

import './Home.css'


const Home: React.FC = () => {

  return (
    <section className="home">
      <h1>Welcome to the chat</h1>
      <div className="join-box">
        <p>Join to the biggest real time chat</p>
        <div className="grid-chats">
          {chats.map((chat) => (
            <ChatsCard key={chat.id} name={chat.name} description={chat.description} id={chat.id} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Home
