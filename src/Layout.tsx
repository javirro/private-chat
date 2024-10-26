import { ReactNode } from 'react'
import './App.css'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div id="layout">
      <section className="body">{children}</section>
    </div>
  )
}

export default Layout
