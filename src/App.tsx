import { createContext, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './routes/Home/Home'
import { AppRoutes } from './routes/routesDefinition'
import { Language, ModalContextType } from './types/generalTypes'
import enMessages from './locales/en.json'
import espMessages from './locales/es.json'
import { useSelector } from 'react-redux'
import { IntlProvider } from 'react-intl'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import WebSocketProvider from './Websockets/WebSocketProvider'
import Layout from './Layout'
import Chat from './routes/Chat/Chat'

import './App.css'


export const ModalContext = createContext<ModalContextType | undefined>(undefined)

function App() {
  const queryClient = new QueryClient()
  const language: Language = useSelector((s: any) => s.language)
  const [showModal, setShowModal] = useState<boolean>(false)

  return (
    <QueryClientProvider client={queryClient}>
      <IntlProvider locale={language === 'en' ? 'en' : 'es'} messages={language === 'en' ? enMessages : espMessages}>
        <WebSocketProvider>
          <ModalContext.Provider value={{ showModal, setShowModal }}>
            <Layout>
              <BrowserRouter>
                <Routes>
                  <Route path={AppRoutes.Home} element={<Home />} />
                  <Route path={AppRoutes.Chat + ":id"} element={<Chat />} />
                </Routes>
              </BrowserRouter>
            </Layout>
          </ModalContext.Provider>
        </WebSocketProvider>
      </IntlProvider>
    </QueryClientProvider>
  )
}

export default App
