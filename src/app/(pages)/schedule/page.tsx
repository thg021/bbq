"use client"
import { useSession } from "next-auth/react"
import { useQuery } from "@tanstack/react-query"
import { Card } from "./components/Card"
import { Modal } from "./components/Modal"
import { ISchedule } from "./types"
import { getSchedules } from "@/services/schedule"

interface SchedulesData {
  schedules: ISchedule[]
}
export default function Schedule() {
  const { data: session } = useSession()
  const user = session?.user

  const { data } = useQuery<SchedulesData>(["schedules"], async () => {
    const { data } = await getSchedules(user!.email)

    return data ?? []
  })

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 grid-rows-1 gap-4 px-4">
      {!data?.schedules ? (
        <div>nao tem nada ainda</div>
      ) : (
        data.schedules.map((schedule) => (
          <Card key={schedule.id} schedule={schedule} />
        ))
      )}

      <Modal user={user!} />
    </section>
  )
}
