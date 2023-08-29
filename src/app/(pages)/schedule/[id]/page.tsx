"use client"
import { useParams, useRouter } from "next/navigation"
import { useMutation, useQuery } from "@tanstack/react-query"
import { queryClient } from "@/lib/react-query"
import { ISchedule, IParticipant } from "../types"
import { Header } from "./components/Header"
import { User } from "./components/User"
import { FormAddParticipant } from "./components/FormAddParticipant"
import Link from "next/link"
import { Button } from "@/components/Button"
import { deleteSchedule, getSchedule } from "@/services/schedule"
import {
  deleteParticipant,
  updatePaymentParticipant
} from "@/services/participant"

export default function Details() {
  const { id } = useParams()
  const scheduleId = String(id)
  const router = useRouter()
  const { data: schedule } = useQuery<ISchedule>(
    ["schedule", scheduleId],
    async () => {
      const { data } = await getSchedule(String(scheduleId))

      return data ?? {}
    }
  )

  const { mutateAsync: updateStatusParticipant } = useMutation(
    updatePaymentParticipant,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["schedules"])
        queryClient.invalidateQueries(["schedule", scheduleId])
      }
    }
  )

  function handlePayment(participant: IParticipant) {
    const updataPaymentProps = {
      ...participant,
      scheduleId: scheduleId
    }
    updateStatusParticipant(updataPaymentProps)
  }

  const { mutateAsync: onDeleteParticipant } = useMutation(deleteParticipant, {
    onSuccess: () => {
      queryClient.invalidateQueries(["schedules"])
      queryClient.invalidateQueries(["schedule", scheduleId])
    }
  })

  function handleDeleteParticipant(participantId: string) {
    onDeleteParticipant({ participantId, scheduleId })
  }

  const { mutateAsync: onDeleteSchedule } = useMutation(deleteSchedule, {
    onSuccess: () => {
      queryClient.invalidateQueries(["schedules"])
      router.push("/schedule")
    }
  })

  function handleDeleteSchedule() {
    onDeleteSchedule(scheduleId)
  }

  return (
    <section className="flex flex-col bg-white shadow-md p-6 mx-4">
      <div className="flex justify-between items-center mb-8">
        <Link href="/schedule">voltar</Link>
        <Button
          variant="secondary"
          text="Deletar evento"
          onClick={handleDeleteSchedule}
        />
      </div>
      {!schedule ? (
        <div>nao tem nada ainda</div>
      ) : (
        <>
          <Header schedule={schedule} />
          <div className="mt-16 mb-14">
            <ul className="w-full my-4">
              {schedule.participants.map((participant) => {
                return (
                  <User
                    key={participant.id}
                    participant={participant}
                    onPayment={handlePayment}
                    onDelete={handleDeleteParticipant}
                  />
                )
              })}
            </ul>
            <FormAddParticipant />
          </div>
        </>
      )}
    </section>
  )
}
