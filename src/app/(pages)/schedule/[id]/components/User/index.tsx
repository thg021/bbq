import { Checkbox } from "@/components/Checkbox"
import { IParticipant } from "../../../types"
import { Beer, Trash } from "@/components/svgs"
import { formatCurrency } from "@/utils/formatter"
import { Button } from "@/components/Button"

interface UserProps {
  participant: IParticipant
  onPayment: (participant: IParticipant) => void
  onDelete: (participantId: string) => void
}

export function User({ participant, onPayment, onDelete }: UserProps) {
  return (
    <li
      key={participant.id}
      className="flex items-center justify-between gap-4 py-3 border-b-2 border-[#E5C231]"
    >
      <Checkbox
        id={participant.id!}
        label={participant.name}
        defaultChecked={participant.paid}
        onChange={() => onPayment(participant)}
      />
      <div className="flex-1 flex gap-4 justify-end items-center peer-checked:last-of-type:line-through peer-checked:last-of-type:text-xl">
        {participant.drink && <Beer className="w-6 h-6 self-start" />}
        <span data-paid={participant.paid} className={`font-bold text-xl`}>
          {formatCurrency(participant.contribution_value)}
        </span>
      </div>
      <Button
        variant="secondary"
        icon={Trash}
        onClick={() => onDelete(participant.id!)}
      />
    </li>
  )
}
