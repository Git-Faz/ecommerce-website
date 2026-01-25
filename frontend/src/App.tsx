import type { JSX } from 'react'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import { Header } from './components/layout/Header'
import Body from './components/layout/Body'
import { Toaster } from '@/components/ui/sonner'
import Footer from './components/layout/Footer'

export default function App(): JSX.Element {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Body>
        <AppRoutes />
        <Toaster position="top-center" />
      </Body>
      <Footer />
    </div>

  )
}

