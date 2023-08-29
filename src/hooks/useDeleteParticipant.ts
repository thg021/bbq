import { queryClient } from "@/lib/react-query"
import { deleteParticipant } from "@/services/participant"
import { useMutation } from "@tanstack/react-query"

export function useDeleteParticipant(scheduleId: string) {
  return useMutation(deleteParticipant, {
    onSuccess: () => {
      queryClient.invalidateQueries(["schedules"])
      queryClient.invalidateQueries(["schedule", scheduleId])
    }
  })
}
