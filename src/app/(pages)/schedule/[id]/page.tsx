"use client"
import { Checkbox } from "@/components/Checkbox"
import { Money, People, Beer } from "@/components/svgs"
import { useParams } from "next/navigation"
import { useMutation, useQuery } from "@tanstack/react-query"
import { api } from "@/lib/axios"
import { formatCurrency, formatDateToDDMM } from "@/utils/formatter"
import { queryClient } from "@/lib/react-query"
import { ISchedule, IParticipant } from "../types"

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

  function handlePaidEvent(participant: IParticipant) {
    console.log("Paguei", participant, idSchedule)
    updateStatusParticipant(participant)
  }

  return (
    <section className="flex flex-col bg-white shadow-md p-6 mx-4">
      {!schedule ? (
        <div>nao tem nada ainda</div>
      ) : (
        <>
          <header className="flex justify-between">
            <div>
              <h2 className="font-extrabold text-[1.75rem]">
                {schedule?.title}
              </h2>
              <h1 className="font-bold text-[2.25rem]">
                {formatDateToDDMM(schedule.event_date)}
              </h1>
            </div>
            <div className="flex flex-col justify-around items-start">
              <div className="flex justify-center items-center gap-3">
                <People />
                <span className="font-medium text-[1.312rem]">
                  {schedule.participants.length}
                </span>
              </div>

              <div className="flex justify-center items-center gap-3">
                <Money />
                <span className="font-medium text-[1.312rem]">
                  {formatCurrency(schedule.totalContribution)}
                </span>
              </div>
            </div>
          </header>
          <div className="mt-16 mb-14">
            <ul className="w-full">
              {schedule.participants.map((participant) => {
                return (
                  <li
                    key={participant.id}
                    className="flex items-center justify-between gap-4 py-3 border-b-2 border-[#E5C231]"
                  >
                    <Checkbox
                      id={participant.id}
                      label={participant.name}
                      defaultChecked={participant.paid}
                      onChange={() => handlePaidEvent(participant)}
                    />
                    <div className="flex-1 flex justify-end items-center peer-checked:last-of-type:line-through peer-checked:last-of-type:text-xl">
                      {participant.drink && <Beer className="w-6 h-6" />}
                      <span
                        data-paid={participant.paid}
                        className={`font-bold text-xl`}
                      >
                        {formatCurrency(participant.contribution_value)}
                      </span>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </>
      )}
    </section>
  )
}
