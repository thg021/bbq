"use client"
import { useRouter } from "next/navigation"
import { Footer } from "../../components/Footer"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { api } from "../../../../lib/axios"
import { AxiosError } from "axios"
import { Input } from "@/app/components/Input"

const LoginFormSchema = z.object({
  email: z.string().email({ message: "Digite um email válido." }),
  password: z.string().min(4)
})

type LoginFormData = z.infer<typeof LoginFormSchema>

export default function Register() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema)
  })

  async function handleRegister(data: LoginFormData) {
    try {
      await api.post("/auth/register", {
        email: data.email,
        password: data.password
      })
      reset()
      router.push("/login")
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.message) {
        alert("Error: " + error.response?.data?.message)
      }
    }
  }

  return (
    <main className="w-full h-screen flex flex-col bg-[url('/img/hero.svg')] bg-yellow-400">
      <header className="h-52 flex justify-center items-center">
        <h1 className="text-3xl font-extrabold text-zinc-900">
          Agenda de Churras - Registro
        </h1>
      </header>
      <div className="w-full flex-1 flex justify-center bg-gradient-to-t from-[--background-rgb] from-60% to-transparent">
        <form
          className="flex flex-col gap-6  lg:w-96 px-6 "
          onSubmit={handleSubmit(handleRegister)}
        >
          <Input
            type="text"
            placeholder="e-mail"
            label="Login"
            {...register("email")}
          />
          {errors && (
            <span className="text-red-50 font-bold">
              {errors.email?.message}
            </span>
          )}
          <Input
            type="password"
            placeholder="Senha"
            label="Senha"
            {...register("password")}
          />
          <button
            className="bg-zinc-900 px-2 py-3 mt-10 rounded-2xl font-bold text-zinc-100"
            type="submit"
          >
            Entrar
          </button>
        </form>
      </div>
      <Footer bg />
    </main>
  )
}
