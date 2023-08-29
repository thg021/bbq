import { queryClient } from "@/lib/react-query"
import { createSchedule } from "@/services/schedule"
import { useMutation } from "@tanstack/react-query"

export function useCreateSchedule() {
  return useMutation(createSchedule, {
    onSuccess: () => queryClient.invalidateQueries(["schedules"])
  })
}
