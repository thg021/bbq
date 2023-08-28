import { ScheduleProps } from "@/app/(pages)/schedule/page"
import { Money, People } from "../svgs"
import Link from "next/link"

interface CardProps {
  schedule: ScheduleProps
}

export function Card({ schedule }: CardProps) {
  function formatDateToDDMM(dateString: string): string {
    const date = new Date(dateString)
    const formatter = new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit"
    })
    return formatter.format(date)
  }

  return (
    <Link
      href={`/schedule/${schedule.id}`}
      className="w-full flex flex-col bg-white shadow-md p-6 h-48 cursor-pointer hover:bg-yellow-400 group transform transition duration-500 hover:scale-105"
    >
      <header className="font-extrabold text-3xl">
        {formatDateToDDMM(schedule.event_date)}
      </header>
      <span className="flex-1 font-bold text-xl">{schedule.title}</span>

      <footer className="w-full flex items-center justify-between font-medium text-xl">
        <div className="flex justify-center items-center gap-3">
          <People className="group-hover:fill-black transition duration-500" />
          <span>{schedule.participants.length}</span>
        </div>

        <div className="flex justify-center items-center gap-3">
          <Money className="group-hover:fill-black transition duration-500" />
          <span>R$ 140,00</span>
        </div>
      </footer>
    </Link>
  )
}
