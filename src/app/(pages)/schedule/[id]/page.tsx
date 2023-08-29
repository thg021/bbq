"use client"
import { useParams } from "next/navigation"
import { useMutation, useQuery } from "@tanstack/react-query"
import { api } from "@/lib/axios"
import { queryClient } from "@/lib/react-query"
import { ISchedule, IParticipant } from "../types"
import { Header } from "./components/Header"
import { User } from "./components/User"

export default function Details() {
  const { id: idSchedule } = useParams()

  const { data: schedule } = useQuery<ISchedule>(
    ["schedule", idSchedule],
    async () => {
      const { data } = await api.get(`/schedules/${idSchedule}`, {
        params: { idSchedule }
      })

      return data ?? {}
    }
  )

  const { mutateAsync: updateStatusParticipant } = useMutation(
    async (participant: IParticipant) => {
      const updatedParticipant: IParticipant = {
        ...participant,
        paid: !participant.paid
      }
      await api.post(
        `/schedules/${idSchedule}/participants/${participant.id}`,
        updatedParticipant
      )
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["schedules"])
        queryClient.invalidateQueries(["schedule", idSchedule])
      }
    }
  )

  function handlePayment(participant: IParticipant) {
    updateStatusParticipant(participant)
  }

  return (
    <section className="flex flex-col bg-white shadow-md p-6 mx-4">
      {!schedule ? (
        <div>nao tem nada ainda</div>
      ) : (
        <>
          <Header schedule={schedule} />
          <div className="mt-16 mb-14">
            <ul className="w-full">
              {schedule.participants.map((participant) => {
                return (
                  <User
                    key={participant.id}
                    participant={participant}
                    onPayment={handlePayment}
                  />
                )
              })}
            </ul>
          </div>
        </>
      )}
    </section>
  )
}
