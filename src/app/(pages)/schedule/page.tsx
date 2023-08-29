"use client"
import { useSession } from "next-auth/react"
import { Card } from "./components/Card"
import { Modal } from "./components/Modal"
import { useAllSchedules } from "@/hooks/useAllSchedules"

export default function Schedule() {
  const { data: session } = useSession()
  const user = session?.user

  const { data, isLoading, error } = useAllSchedules(user!.email)

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 grid-rows-1 gap-4 px-4">
      {isLoading && <div>nao tem nada ainda</div>}
      {!isLoading &&
        !error &&
        data?.schedules.map((schedule) => (
          <Card key={schedule.id} schedule={schedule} />
        ))}

      <Modal user={user!} />
    </section>
  )
}
