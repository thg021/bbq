"use client"

import { ReactNode } from "react"
import * as Toast from "@radix-ui/react-toast"

interface AlertProviderProps {
  children: ReactNode
}

export default function AlertProvider({ children }: AlertProviderProps) {
  return <Toast.Provider swipeDirection="right">{children}</Toast.Provider>
}
