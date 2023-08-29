import { IScheduleResponse, getSchedules } from "@/services/schedule"
import { useQuery } from "@tanstack/react-query"

export function useAllSchedules(email: string) {
  return useQuery<IScheduleResponse>(["schedules"], async () => {
    const { data } = await getSchedules(email)

    return data ?? []
  })
}
