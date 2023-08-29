import { Checkbox } from "@/components/Checkbox"
import { IParticipant } from "../../../types"
import { Beer } from "@/components/svgs"
import { formatCurrency } from "@/utils/formatter"

interface UserProps {
  participant: IParticipant
  onPayment: (participant: IParticipant) => void
}

export function User({ participant, onPayment }: UserProps) {
  return (
    <li
      key={participant.id}
      className="flex items-center justify-between gap-4 py-3 border-b-2 border-[#E5C231]"
    >
      <Checkbox
        id={participant.id}
        label={participant.name}
        defaultChecked={participant.paid}
        onChange={() => onPayment(participant)}
      />
      <div className="flex-1 flex justify-end items-center peer-checked:last-of-type:line-through peer-checked:last-of-type:text-xl">
        {participant.drink && <Beer className="w-6 h-6" />}
        <span data-paid={participant.paid} className={`font-bold text-xl`}>
          {formatCurrency(participant.contribution_value)}
        </span>
      </div>
    </li>
  )
}
