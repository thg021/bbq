import { api } from "@/lib/axios"

export interface IParticipant {
  id?: string
  name: string
  drink: boolean
  contribution_value: number
  paid?: boolean
  created_at?: string
}

export interface IParticipantRequest {
  participants: IParticipant[]
  scheduleId: string
}

export interface IUpdatePaymentParticipantRequest extends IParticipant {
  scheduleId: string
}

export interface DeleteParticipantRequest {
  participantId: string
  scheduleId: string
}

export const createParticipant = async (participant: IParticipantRequest) => {
  await api.post(
    `/schedules/${participant.scheduleId}/participants`,
    participant
  )
}

export const updatePaymentParticipant = async (
  participant: IUpdatePaymentParticipantRequest
) => {
  const updatedParticipant: IParticipant = {
    ...participant,
    paid: !participant.paid
  }
  await api.put(
    `/schedules/${participant.scheduleId}/participants/${participant.id}`,
    updatedParticipant
  )
}

export const deleteParticipant = async ({
  participantId,
  scheduleId
}: DeleteParticipantRequest) => {
  await api.delete(`/schedules/${scheduleId}/participants/${participantId}`)
}
