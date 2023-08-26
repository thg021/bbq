import { Footer } from "./components/Footer"
import { Input } from "./components/Input"

export default function Home() {
  return (
    <main className="w-full h-screen flex flex-col bg-[url('/img/hero.svg')] bg-yellow-400">
      <header className="h-52 flex justify-center items-center">
        <h1 className="text-3xl font-extrabold text-zinc-900">
          Agenda de Churras
        </h1>
      </header>
      <div className="w-full flex-1 flex justify-center bg-gradient-to-t from-[--background-rgb] from-60% to-transparent">
        <form className="flex flex-col gap-6  lg:w-96 px-6 ">
          <Input name="email" type="email" placeholder="e-mail" label="Login" />
          <Input
            name="password"
            type="password"
            placeholder="Senha"
            label="senha"
          />

          <button className="bg-zinc-900 px-2 py-3 mt-10 rounded-2xl font-bold text-zinc-100">
            Entrar
          </button>
        </form>
      </div>
      <Footer bg />
    </main>
  )
}
