"use client"
import { Card } from "@/app/components/Card"
import { Input } from "@/app/components/Input"
import { Bbq } from "@/app/components/svgs"
import * as Dialog from "@radix-ui/react-dialog"
import * as Switch from "@radix-ui/react-switch"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"

interface ParticipantProps {
  name: string
  drink: boolean
}

export default function Schedule() {
  const [participants, setParticipants] = useState<ParticipantProps[]>([])
  const { handleSubmit, register, control, reset, watch } = useForm()
  function handleAddParticipant() {
    const [name, drink] = watch(["name", "drink"])
    if (name) {
      setParticipants((oldState) => [...oldState, { name, drink }])
    }

    reset()
  }

  function handleAddEvent() {
    const [title, date] = watch(["title", "date"])
    if (title && date) {
      console.log({ title, date, participants })
    }
  }

  return (
    <main className="w-full flex-1 flex justify-start items-center flex-col bg-slate-100">
      <div className="w-full lg:w-[64rem] flex-1 mt-[-3rem]">
        <section className="grid grid-cols-2 lg:grid-cols-3 grid-rows-1 gap-4 px-4">
          <Card />

          <Dialog.Root>
            <Dialog.Trigger asChild>
              <div className="flex flex-col justify-center items-center gap-2 bg-slate-100 shadow-md p-6 h-48 cursor-pointer hover:bg-yellow-400 group transform transition duration-500 hover:scale-105">
                <Bbq />
                <h1 className="font-bold text-xl">Adicionar Churras</h1>
              </div>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/50" />
              <Dialog.Content className="fixed w-1/2 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-8 text-gray-900 shadow-md">
                <div className="flex w-full justify-between items-center">
                  <h2 className="font-bold text-xl">
                    Adicionar novo encontro:
                  </h2>
                  <Dialog.Close className="text-gray-400 hover:text-gray-500">
                    X
                  </Dialog.Close>
                </div>

                <div className="flex flex-col mt-8">
                  <Input
                    label="Titulo"
                    className="border border-slate-200"
                    {...register("title")}
                  />
                  <Input
                    label="Data do evento"
                    className="border border-slate-200"
                    {...register("date")}
                  />
                  <h2 className="font-bold text-xl my-4">
                    Adicionar participante
                  </h2>
                  {
                    // add participants
                  }
                  <div className="w-full flex items-center justify-between gap-6">
                    <div className="flex-1">
                      <Input
                        className="flex-1 border border-slate-200"
                        {...register("name")}
                      />
                    </div>

                    <Controller
                      render={({ field: { onChange, value, name, ref } }) => {
                        console.log(value, name, onChange)
                        return (
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <label
                              className="Label"
                              htmlFor="drink"
                              style={{ paddingRight: 15 }}
                            >
                              Bebida Alcoolica
                            </label>
                            <Switch.Root
                              className="w-12 h-7 rounded-full bg-slate-200 shadow-lg focus:shadow-xl data-[state='checked']:bg-yellow-400"
                              id="drink"
                              checked={value}
                              onCheckedChange={onChange}
                              ref={ref}
                            >
                              <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow-lg  transition-transform duration-100 transform translate-x-1  will-change-transform data-[state='checked']:transform data-[state='checked']:translate-x-6" />
                            </Switch.Root>
                          </div>
                        )
                      }}
                      name="drink"
                      control={control}
                      defaultValue={false}
                    />

                    <button
                      onClick={handleAddParticipant}
                      className="relative rounded px-5 py-2.5 overflow-hidden group bg-yellow-500 hover:bg-gradient-to-r hover:from-yellow-500 hover:to-yellow-400 buttontext-black font-bold hover:ring-2 hover:ring-offset-2 hover:ring-yellow-400 transition-all ease-out duration-300"
                    >
                      <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                      <span className="relative">Adicionar</span>
                    </button>
                  </div>

                  <table className="my-10 w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                    <thead className="py-6 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Participante
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Bebida
                        </th>
                        <th scope="col" className="px-6 py-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {participants.map((participant, index) => {
                        return (
                          <tr
                            key={index}
                            className="bg-white border-b dark:bg-gray-800 border-yellow-400"
                          >
                            <td
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {participant.name}
                            </td>
                            <td className="px-6 py-4">
                              {participant.drink ? "Sim" : "Não"}
                            </td>
                            <td className="px-6 py-4"> Excluir</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>

                  <div className="self-end flex gap-6">
                    <button
                      onClick={handleAddEvent}
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
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </section>
      </div>
    </main>
  )
}
