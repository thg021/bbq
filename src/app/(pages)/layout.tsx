"use client"

import { ReactNode } from "react"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { useSession } from "next-auth/react"

interface LayoutPageProps {
  children: ReactNode
}

export default function LayoutAuthPage({ children }: LayoutPageProps) {
  const { data: session, status } = useSession()

  console.log("data", session, status)

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
