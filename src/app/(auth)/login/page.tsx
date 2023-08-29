"use client"
import { useRouter } from "next/navigation"
import { Footer } from "@/components/Footer"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { AxiosError } from "axios"
import { Input } from "@/components/Input"
import { signIn } from "next-auth/react"
import Link from "next/link"

const LoginFormSchema = z.object({
  email: z.string().email({ message: "Digite um email válido." }),
  password: z.string().min(4)
})

type LoginFormData = z.infer<typeof LoginFormSchema>

export default function Login() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema)
  })

  async function handleLogin(data: LoginFormData) {
    try {
      signIn("Credentials", { ...data, redirect: false }).then((data) => {
        if (!data?.error) {
          router.push("/schedule")
          return
        }

        reset()
      })

      reset()
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError && error.response?.data?.message) {
        alert("Error: " + error.response?.data?.message)
      }
    }
  }

  return (
    <main className="w-full h-screen flex flex-col bg-[url('/img/hero.svg')] bg-[--background-rgb]">
      <header className="h-52 flex justify-center items-center">
        <h1 className="text-3xl font-extrabold text-zinc-900">
          Agenda de Churras
        </h1>
      </header>
      <div className="w-full flex-1 flex flex-col items-center justify-center bg-gradient-to-t from-[--background-rgb] from-60% to-transparent">
        <form
          className="flex flex-col gap-6  lg:w-96 px-6 "
          onSubmit={handleSubmit(handleLogin)}
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
        <span className="text-xs mt-10">
          Não possui conta?
          <strong className="">
            <Link href="/register"> Inscreva-se</Link>
          </strong>
        </span>
      </div>
      <Footer bg />
    </main>
  )
}
