"use client"
import { useParams, useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { ISchedule, IParticipant } from "../types"
import { Header } from "./components/Header"
import { User } from "./components/User"
import { FormAddParticipant } from "./components/FormAddParticipant"
import Link from "next/link"
import { Button } from "@/components/Button"
import { getSchedule } from "@/services/schedule"
import { useUpdatePaymentParticipant } from "@/hooks/useUpdatePaymentParticipant"
import { useDeleteParticipant } from "@/hooks/useDeleteParticipant"
import { useDeleteSchedule } from "@/hooks/useDeleteSchedule"

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

  const { mutateAsync: onUpdatePaymentParticipant } =
    useUpdatePaymentParticipant(scheduleId)
  function handlePayment(participant: IParticipant) {
    const updataPaymentProps = {
      ...participant,
      scheduleId: scheduleId
    }
    onUpdatePaymentParticipant(updataPaymentProps)
  }

  const { mutateAsync: onDeleteParticipant } = useDeleteParticipant(scheduleId)

  function handleDeleteParticipant(participantId: string) {
    onDeleteParticipant({ participantId, scheduleId })
  }

  const { mutateAsync: onDeleteSchedule } = useDeleteSchedule()

  function handleDeleteSchedule() {
    onDeleteSchedule(scheduleId)
    router.push("/schedule")
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
