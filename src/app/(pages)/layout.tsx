"use client"

import { ReactNode } from "react"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

interface LayoutPageProps {
  children: ReactNode
}

export default function LayoutAuthPage({ children }: LayoutPageProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === "loading") {
    return null
  }

  if (!session) {
    setTimeout(() => {
      router.push("/login")
    }, 100)

    return null
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
