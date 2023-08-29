"use client"
import { useParams, useRouter } from "next/navigation"

import { Header } from "./components/Header"
import { User } from "./components/User"
import { FormAddParticipant } from "./components/FormAddParticipant"
import Link from "next/link"
import { Button } from "@/components/Button"
import { useUpdatePaymentParticipant } from "@/hooks/useUpdatePaymentParticipant"
import { useDeleteParticipant } from "@/hooks/useDeleteParticipant"
import { useDeleteSchedule } from "@/hooks/useDeleteSchedule"
import { Spinner } from "@/components/Spinner"
import { useGetSchedule } from "@/hooks/useGetSchedule"
import { IParticipant } from "@/services/participant"

export default function Details() {
  const { id } = useParams()
  const scheduleId = String(id)
  const router = useRouter()

  const { data: schedule, isLoading, error } = useGetSchedule(scheduleId)

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
        <Link
          href="/schedule"
          className="font-bold hover:text-[--background-rgb]"
        >
          voltar
        </Link>
        <Button
          variant="secondary"
          text="Deletar evento"
          onClick={handleDeleteSchedule}
        />
      </div>
      {isLoading && (
        <div className="w-full  flex justify-center items-center">
          <Spinner />
        </div>
      )}
      {!isLoading && !error && schedule && (
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
