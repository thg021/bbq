"use client"
import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useFieldArray, useForm } from "react-hook-form"

import * as Dialog from "@radix-ui/react-dialog"
import * as Switch from "@radix-ui/react-switch"

import { Input } from "@/components/Input"
import { Bbq, Close } from "@/components/svgs"
import { Button } from "@/components/Button"
import { Alert } from "@/components/Alert"
import { useCreateSchedule } from "@/hooks/useCreateSchedule"
export interface ParticipantProps {
  name: string
  drink: boolean
}

const createEventFormSchema = z.object({
  title: z.string().nonempty("O titulo do evento é obrigatório!").toLowerCase(),
  date: z.string().nonempty("A data do evento é obrigatório."),

  participants: z.array(
    z.object({
      participant: z.string().nonempty("O nome é obrigatório."),
      contribution_value: z
        .string()
        .refine((value) => /^(\d+([\\,|\\.]\d{1,2})?)?$/.test(value), {
          message: "Favor informar um valor correto."
        })
        .transform((value) => parseFloat(value.replace(",", "."))),
      drink: z.boolean()
    })
  )
})

type CreateEventFormSchema = z.infer<typeof createEventFormSchema>

type ModalProps = {
  user: {
    email: string
  }
}

export function Modal({ user }: ModalProps) {
  const [open, setOpen] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
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
    append({ participant: "", drink: false, contribution_value: 0 })
  }

  const { mutateAsync: onCreateSchedule } = useCreateSchedule()

  function handleAddEvent(data: CreateEventFormSchema) {
    const email = user!.email
    onCreateSchedule({ ...data, email })
    setOpen(false)
    reset()
  }

  return (
    <>
      <Dialog.Root onOpenChange={setOpen} open={open}>
        <Dialog.Trigger asChild>
          <div className="flex flex-col justify-center items-center gap-2 bg-slate-100 shadow-md p-6 h-48 cursor-pointer hover:bg-[--background-rgb] group transform transition duration-500 hover:scale-105">
            <Bbq />
            <h1 className="font-bold text-xl">Adicionar Churras</h1>
          </div>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className=" absolute w-full h-screen md:w-2/3 overflow-y-scroll md:h-2/3 top-0 left-0 md:top-1/2 md:-translate-x-1/2 md:left-1/2 md:-translate-y-1/2 rounded-md bg-white p-8 text-gray-900 shadow-md">
            <div className="flex w-full justify-between items-center">
              <h2 className="font-bold text-xl">Adicionar novo encontro:</h2>
              <Dialog.Close className="text-gray-400 hover:text-gray-500">
                <Close className="h-6 fill-slate-400 hover:fill-[--background-rgb]" />
              </Dialog.Close>
            </div>

            <form
              onSubmit={handleSubmit(handleAddEvent)}
              className="flex flex-col mt-8 gap-2 overflow-x-auto h-"
            >
              <Input
                label="Evento"
                placeholder="Nome do evento"
                className="border border-slate-200"
                {...register("title")}
              />
              {errors.title && (
                <span className="text-sm text-red-600">
                  {errors.title.message}
                </span>
              )}
              <Input
                type="date"
                label="Data do evento"
                placeholder="Data do evento"
                className="border border-slate-200"
                pattern="[0-9]{2}-[0-9]{4}"
                {...register("date")}
              />
              <div className="my-8 flex items-center justify-between">
                <h2 className="font-bold text-xl my-4">Participantes</h2>
                <Button
                  variant="primary"
                  text="Adicionar"
                  onClick={onAddNewParticipant}
                />
              </div>
              {fields.length > 0 && (
                <span className="font-bold text-right">bebida alcoolica?</span>
              )}

              {fields.map((field, index) => {
                return (
                  <div key={field.id} className="my-2 flex items-center gap-4 ">
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
                        {...register(
                          `participants.${index}.contribution_value`
                        )}
                      />
                    </div>

                    <Controller
                      render={({ field: { onChange, value, ref } }) => {
                        return (
                          <Switch.Root
                            className="ml-6 w-12 h-7 rounded-full bg-slate-200 shadow-lg focus:shadow-xl data-[state='checked']:bg-[--background-rgb]"
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
                <Button variant="primary" text="Salvar" type="submit" />
                <Dialog.Close asChild>
                  <Button variant="secondary" text="Cancelar" />
                </Dialog.Close>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <Alert open={openAlert} onOpen={setOpenAlert} />
    </>
  )
}
