import { ReactNode } from "react"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"

interface LayoutPageProps {
  children: ReactNode
}

export default function LayoutPage({ children }: LayoutPageProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
