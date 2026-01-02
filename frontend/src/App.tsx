import type { JSX } from 'react'
import './App.css'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import AppRoutes from './routes/AppRoutes'

export default function App() : JSX.Element {
  return (
    <>
      <AppRoutes />
    </>
  )
}

