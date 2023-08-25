import { Footer } from "./components/Footer"
import { Input } from "./components/Input"

export default function Home() {
  return (
    <main className="w-full flex flex-1 justify-start items-center flex-col bg-gradient-to-t from-[--background-rgb] from-60% to-transparent mt-[-20px]">
      <form className="flex flex-col gap-6 w-full lg:w-96 px-6">
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
    </main>
  )
}
