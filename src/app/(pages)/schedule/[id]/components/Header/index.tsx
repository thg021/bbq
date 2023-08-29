import { People, Money } from "@/components/svgs"
import { formatDateToDDMM, formatCurrency } from "@/utils/formatter"
import { ISchedule } from "../../../types"

interface HeaderProps {
  schedule: ISchedule
}
export function Header({ schedule }: HeaderProps) {
  return (
    <header className="flex justify-between">
      <div>
        <h2 className="font-extrabold text-[1.75rem]">{schedule.title}</h2>
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
  )
}
