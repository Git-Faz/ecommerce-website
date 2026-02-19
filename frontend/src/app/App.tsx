import type { JSX } from 'react'

import './App.css'
import AppRoutes from '../routes/AppRoutes'
import { Header } from '../shared/components/layout/Header'
import { Toaster } from '@/shared/components/ui/sonner'
import Footer from '../shared/components/layout/Footer'

export default function App(): JSX.Element {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
          <AppRoutes />
          <Toaster position="top-center" />
      <Footer />
    </div>
  )
}

