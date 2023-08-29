import { api } from "@/lib/axios"
import { AxiosResponse } from "axios"
import { IParticipant } from "../participant"

type CreateSchedulesProps = {
  title: string
  date: string
  participants: {
    participant: string
    contribution_value: number
    drink: boolean
  }[]
  email: string
}

export interface ISchedule {
  id: string
  title: string
  event_date: string
  created_at: string
  user_id: string
  totalContribution: number
  participants: IParticipant[]
}

export interface IScheduleResponse {
  schedules: ISchedule[]
}

export const getSchedules = async (
  email: string
): Promise<AxiosResponse<IScheduleResponse>> => {
  return await api.get("/schedules", {
    params: { email }
  })
}

export const createSchedule = async (event: CreateSchedulesProps) => {
  await api.post(`/schedules`, event)
}

export const getSchedule = async (scheduleId: string) => {
  return await api.get<ISchedule>(`/schedules/${scheduleId}`, {
    params: { scheduleId }
  })
}

export const deleteSchedule = async (scheduleId: string) => {
  await api.delete(`/schedules/${scheduleId}`)
}
