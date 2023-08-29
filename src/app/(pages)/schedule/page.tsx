"use client"
import { useSession } from "next-auth/react"
import { useQuery } from "@tanstack/react-query"

import { api } from "@/lib/axios"

import { Card } from "./components/Card"
import { Modal } from "./components/Modal"
import { ISchedule } from "./types"

export default function Schedule() {
  const { data: session } = useSession()
  const user = session?.user

  const { data: schedules } = useQuery<ISchedule[]>(["schedules"], async () => {
    const { data } = await api.get("/schedules", {
      params: { email: user?.email }
    })
    return data.schedules ?? []
  })

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 grid-rows-1 gap-4 px-4">
      {schedules &&
        schedules.map((schedule) => (
          <Card key={schedule.id} schedule={schedule} />
        ))}
      <Modal user={user!} />
    </section>
  )
}
