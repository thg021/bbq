"use client"
import { Checkbox } from "@/app/components/Checkbox"
import { Money, People, Beer } from "@/app/components/svgs"
import { useParams } from "next/navigation"
import { Participant, ScheduleProps } from "../page"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { api } from "../../../../../lib/axios"

export default function Details() {
  const { id: idSchedule } = useParams()

  const { data: schedule } = useQuery<ScheduleProps>(
    ["schedule", idSchedule],
    async () => {
      const { data } = await api.get(`/schedules/${idSchedule}`, {
        params: { idSchedule }
      })

      return data ?? {}
    }
  )

  const queryClient = useQueryClient()

  const { mutateAsync: updateStatusParticipant } = useMutation(
    async (participant: Participant) => {
      const updatedParticipant: Participant = {
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

  function handlePaidEvent(participant: Participant) {
    console.log("Paguei", participant, idSchedule)
    updateStatusParticipant(participant)
  }
  return (
    <main className="w-full flex-1 flex justify-start items-center flex-col bg-slate-100">
      <div className="w-full lg:w-[64rem] flex-1 mt-[-3rem]">
        <div className="flex flex-col bg-white shadow-md p-6 mx-4">
          <header className="flex justify-between">
            <div>
              <h2 className="font-extrabold text-[1.75rem]">
                {schedule?.title}
              </h2>
              <h1 className="font-bold text-[2.25rem]">{schedule?.title}</h1>
            </div>
            <div className="flex flex-col justify-around items-start">
              <div className="flex justify-center items-center gap-3">
                <People />
                <span className="font-medium text-[1.312rem]">
                  {schedule?.participants.length}
                </span>
              </div>

              <div className="flex justify-center items-center gap-3">
                <Money />
                <span className="font-medium text-[1.312rem]">
                  {schedule?.totalContribution}
                </span>
              </div>
            </div>
          </header>
          <div className="mt-16 mb-14">
            <ul className="w-full">
              {schedule?.participants.map((participant) => {
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
                        {participant.contribution_value.toFixed(2)}
                      </span>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
