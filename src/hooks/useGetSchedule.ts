import { ISchedule, getSchedule } from "@/services/schedule"
import { useQuery } from "@tanstack/react-query"

export function useGetSchedule(scheduleId: string) {
  return useQuery<ISchedule>(["schedule", scheduleId], async () => {
    const { data } = await getSchedule(String(scheduleId))

    return data ?? {}
  })
}
