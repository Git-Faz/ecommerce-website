import type { JSX } from 'react'
import { Header } from './components/Header'
import './App.css'
import AppRoutes from './routes/AppRoutes'

export default function App() : JSX.Element {
  return (
    <>
      <Header/>
      <AppRoutes />
    </>
  )
}

