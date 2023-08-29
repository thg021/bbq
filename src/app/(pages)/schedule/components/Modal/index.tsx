"use client"
import { Input } from "@/components/Input"
import { Bbq } from "@/components/svgs"
import { api } from "@/lib/axios"
import { queryClient } from "@/lib/react-query"
import { zodResolver } from "@hookform/resolvers/zod"
import * as Dialog from "@radix-ui/react-dialog"
import * as Switch from "@radix-ui/react-switch"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
export interface ParticipantProps {
  name: string
  drink: boolean
}

export interface Participant {
  id: string
  name: string
  drink: boolean
  contribution_value: number
  paid: boolean
  created_at: string
}

export interface ScheduleProps {
  id: string
  title: string
  event_date: string
  created_at: string
  user_id: string
  totalContribution: number
  participants: Participant[]
}

const createEventFormSchema = z.object({
  title: z.string().nonempty("O titulo do evento é obrigatório!").toLowerCase(),
  date: z.string().nonempty("A data do evento é obrigatório."),

  participants: z.array(
    z.object({
      participant: z.string().nonempty("O nome é obrigatório."),
      contribuition_value: z.string(),
      drink: z.boolean()
    })
  )
})

type CreateEventFormSchema = z.infer<typeof createEventFormSchema>
type EventRequest = CreateEventFormSchema & {
  email: string
}

type ModalProps = {
  user: {
    email: string
  }
}

export function Modal({ user }: ModalProps) {
  const [open, setOpen] = useState(false)
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CreateEventFormSchema>({
    resolver: zodResolver(createEventFormSchema)
  })

  const { fields, append } = useFieldArray({
    name: "participants",
    control
  })

  function onAddNewParticipant() {
    append({ participant: "", drink: false, contribuition_value: "" })
  }

  const { mutateAsync } = useMutation(
    async (event: EventRequest) => {
      await api.post(`/schedules`, event)
    },
    {
      onSuccess: () => {
        alert("OK")
        queryClient.invalidateQueries(["schedules"])
        setOpen(false)
        reset()
      }
    }
  )

  function handleAddEvent(data: CreateEventFormSchema) {
    const email = user!.email
    mutateAsync({ ...data, email })
  }

  return (
    <Dialog.Root onOpenChange={setOpen} open={open}>
      <Dialog.Trigger asChild>
        <div className="flex flex-col justify-center items-center gap-2 bg-slate-100 shadow-md p-6 h-48 cursor-pointer hover:bg-yellow-400 group transform transition duration-500 hover:scale-105">
          <Bbq />
          <h1 className="font-bold text-xl">Adicionar Churras</h1>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed w-full sm:h-screen md:h-auto lg:w-1/2 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-8 text-gray-900 shadow-md">
          <div className="flex w-full justify-between items-center">
            <h2 className="font-bold text-xl">Adicionar novo encontro:</h2>
            <Dialog.Close className="text-gray-400 hover:text-gray-500">
              X
            </Dialog.Close>
          </div>

          <form
            onSubmit={handleSubmit(handleAddEvent)}
            className="flex flex-col mt-8"
          >
            <Input
              label="Titulo"
              className="border border-slate-200"
              {...register("title")}
            />
            {errors.title && <span>{errors.title.message}</span>}
            <Input
              type="date"
              label="Data do evento"
              className="border border-slate-200"
              {...register("date")}
            />
            <div className="my-8 flex items-center justify-between">
              <h2 className="font-bold text-xl my-4">Adicionar participante</h2>

              <button
                onClick={onAddNewParticipant}
                className="relative rounded px-5 py-2.5 overflow-hidden group bg-yellow-500 hover:bg-gradient-to-r hover:from-yellow-500 hover:to-yellow-400 text-black font-bold hover:ring-2 hover:ring-offset-2 hover:ring-yellow-400 transition-all ease-out duration-300"
              >
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative">Adicionar novo</span>
              </button>
            </div>
            {fields.length > 0 && (
              <span className="font-bold text-right">bebida alcoolica?</span>
            )}

            {fields.map((field, index) => {
              return (
                <div
                  key={field.id}
                  className="my-2 flex items-center justify-between gap-4"
                >
                  <div className="flex-1">
                    <Input
                      className="border border-slate-200"
                      placeholder="Nome do participante"
                      {...register(`participants.${index}.participant`)}
                    />
                  </div>
                  <div>
                    <Input
                      className="border border-slate-200"
                      placeholder="Valor de contribuição"
                      {...register(`participants.${index}.contribuition_value`)}
                    />
                  </div>

                  <Controller
                    render={({ field: { onChange, value, ref } }) => {
                      return (
                        <Switch.Root
                          className="ml-6 w-12 h-7 rounded-full bg-slate-200 shadow-lg focus:shadow-xl data-[state='checked']:bg-yellow-400"
                          id={`participants.${index}.drink`}
                          checked={value}
                          onCheckedChange={onChange}
                          ref={ref}
                        >
                          <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow-lg  transition-transform duration-100 transform translate-x-1  will-change-transform data-[state='checked']:transform data-[state='checked']:translate-x-6" />
                        </Switch.Root>
                      )
                    }}
                    name={`participants.${index}.drink`}
                    control={control}
                  />
                </div>
              )
            })}

            <div className="self-end flex gap-4 mt-4">
              <button
                type="submit"
                className="relative rounded px-5 py-2.5 overflow-hidden group bg-yellow-500 hover:bg-gradient-to-r hover:from-yellow-500 hover:to-yellow-400 text-black font-bold hover:ring-2 hover:ring-offset-2 hover:ring-yellow-400 transition-all ease-out duration-300"
              >
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative">Salvar</span>
              </button>
              <Dialog.Close asChild>
                <button className="relative rounded px-5 py-2.5 overflow-hidden group bg-white text-black font-bold hover:ring-2 hover:ring-offset-2 hover:ring-yellow-400 transition-all ease-out duration-300">
                  <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                  <span className="relative">Cancelar</span>
                </button>
              </Dialog.Close>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
