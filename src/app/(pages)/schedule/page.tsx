"use client"
import { useSession } from "next-auth/react"
import { Card } from "./components/Card"
import { Modal } from "./components/Modal"
import { useAllSchedules } from "@/hooks/useAllSchedules"
import { Spinner } from "@/components/Spinner"

export default function Schedule() {
  const { data: session } = useSession()
  const user = session?.user

  const { data, isLoading, error } = useAllSchedules(user!.email)

  return (
    <>
      {isLoading && (
        <div className="w-full h-screen flex justify-center items-center">
          <Spinner />
        </div>
      )}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-1 gap-4 px-4">
        {!isLoading &&
          !error &&
          data?.schedules.map((schedule) => (
            <Card key={schedule.id} schedule={schedule} />
          ))}

        <Modal user={user!} />
      </section>
    </>
  )
}
