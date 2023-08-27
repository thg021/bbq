"use client"

import { useForm } from "react-hook-form"
import { Input } from "../Input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "../../../../lib/axios"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"

const LoginFormSchema = z.object({
  email: z.string().email({ message: "Digite um email válido." }),
  password: z.string().min(4)
})

type LoginFormData = z.infer<typeof LoginFormSchema>

export function LoginForm() {
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
        <span className="text-red-50 font-bold">{errors.email?.message}</span>
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
  )
}
