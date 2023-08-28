"use client"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "../../../../lib/react-query"
import { ReactNode } from "react"

interface ReactQueryProviderProps {
  children: ReactNode
}

export default function ReactQueryProvider({
  children
}: ReactQueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
