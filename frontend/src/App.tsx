import type { JSX } from 'react'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import { Header } from './components/layout/Header'
import { Toaster } from 'sonner'

export default function App() : JSX.Element {
  return (
    <>
          
          <Header/>
          <AppRoutes />
          <Toaster position={'top-center'}/>
    </>
  )
}

