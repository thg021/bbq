import "./globals.css"
import type { Metadata } from "next"
import { Raleway } from "next/font/google"
import AuthProvider from "@/providers/AuthProvider"
import ReactQueryProvider from "@/providers/ReactQueryProvider"

const raleway = Raleway({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Agenda de Churras",
  description: "Trinca"
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ReactQueryProvider>
      <html lang="en">
        <AuthProvider>
          <body className={raleway.className} suppressHydrationWarning={true}>
            <div className="flex min-h-screen flex-col">{children}</div>
          </body>
        </AuthProvider>
      </html>
    </ReactQueryProvider>
  )
}
