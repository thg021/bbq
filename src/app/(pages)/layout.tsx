"use client"

import { ReactNode } from "react"
import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { ToastProvider } from "@radix-ui/react-toast"

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
      <ToastProvider>
        <button
          className="absolute right-6 top-4 font-bold hover:font-extrabold"
          onClick={() =>
            signOut({
              redirect: true
            })
          }
        >
          logout
        </button>
        <Header />
        <main className="w-full flex-1 flex justify-start items-center flex-col bg-slate-100">
          <div className="w-full lg:w-[64rem] flex-1 mt-[-3rem]">
            {children}
          </div>
        </main>
        <Footer />
      </ToastProvider>
    </>
  )
}
