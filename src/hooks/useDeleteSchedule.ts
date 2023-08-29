import { queryClient } from "@/lib/react-query"
import { deleteSchedule } from "@/services/schedule"
import { useMutation } from "@tanstack/react-query"

export function useDeleteSchedule() {
  return useMutation(deleteSchedule, {
    onSuccess: () => {
      queryClient.invalidateQueries(["schedules"])
    }
  })
}
