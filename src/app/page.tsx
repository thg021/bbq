import { Footer } from "./components/Footer"
import { LoginForm } from "./components/LoginForm"

export default function Home() {
  return (
    <main className="w-full h-screen flex flex-col bg-[url('/img/hero.svg')] bg-yellow-400">
      <header className="h-52 flex justify-center items-center">
        <h1 className="text-3xl font-extrabold text-zinc-900">
          Agenda de Churras
        </h1>
      </header>
      <div className="w-full flex-1 flex justify-center bg-gradient-to-t from-[--background-rgb] from-60% to-transparent">
        <LoginForm />
      </div>
      <Footer bg />
    </main>
  )
}
