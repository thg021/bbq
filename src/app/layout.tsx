import "./globals.css"
import type { Metadata } from "next"
import { Raleway } from "next/font/google"
import Image from "next/image"

import logo from "../../public/img/logo.svg"

const raleway = Raleway({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app"
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={raleway.className}>
        <div className="flex min-h-screen flex-col">
          <header className="h-52 w-full flex justify-center items-center bg-[url('/img/hero.svg')] bg-[--background-rgb]">
            <h1 className="text-3xl font-extrabold text-zinc-900">
              Agenda de Churras
            </h1>
          </header>
          {children}
          <footer className="flex justify-center absolute bottom-0 mb-4 w-full">
            <Image src={logo} alt="" />
          </footer>
        </div>
      </body>
    </html>
  )
}
