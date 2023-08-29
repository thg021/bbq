import { Controller, useFieldArray, useForm } from "react-hook-form"
import * as Switch from "@radix-ui/react-switch"
import { Button } from "@/components/Button"
import { z } from "zod"
import { Input } from "@/components/Input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { queryClient } from "@/lib/react-query"
import { api } from "@/lib/axios"
import { useParams } from "next/navigation"

const createEventFormSchema = z.object({
  participants: z.array(
    z.object({
      name: z.string().nonempty("Nome do participante é obrigatória"),
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

type IParticipantRequest = CreateEventFormSchema & {
  idSchedule: string
}
export function FormAddParticipant() {
  const { id } = useParams()
  const idSchedule = String(id)
  const { register, control, handleSubmit, reset } =
    useForm<CreateEventFormSchema>({
      resolver: zodResolver(createEventFormSchema)
    })

  const { fields, append, remove } = useFieldArray({
    name: "participants",
    control
  })

  const { mutateAsync: addNewParticipant } = useMutation(
    async (participant: IParticipantRequest) => {
      await api.post(`/schedules/${idSchedule}/participants`, participant)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["schedules"])
        queryClient.invalidateQueries(["schedule", idSchedule])
        reset()
        remove()
      }
    }
  )

  function onAddInputNewParticipant() {
    append({ name: "", drink: false, contribution_value: 0 })
  }

  function handleAddParticipant(data: CreateEventFormSchema) {
    const participants = { ...data, idSchedule }
    addNewParticipant(participants)
  }

  function handleCancel() {
    remove()
  }

  return (
    <form
      className="w-full flex flex-col gap-2 "
      onSubmit={handleSubmit(handleAddParticipant)}
    >
      <div className="self-end">
        <Button
          variant="primary"
          text="Adicionar participante"
          onClick={onAddInputNewParticipant}
        />
      </div>

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
                {...register(`participants.${index}.name`)}
              />
            </div>
            <div>
              <Input
                className="border border-slate-200"
                placeholder="Valor de contribuição"
                {...register(`participants.${index}.contribution_value`)}
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
      {fields.length > 0 && (
        <div className="self-end flex gap-4 mt-4">
          <Button variant="primary" text="Salvar" type="submit" />
          <Button variant="secondary" text="Cancelar" onClick={handleCancel} />
        </div>
      )}
    </form>
  )
}
