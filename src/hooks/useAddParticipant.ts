import { queryClient } from "@/lib/react-query"
import { createParticipant } from "@/services/participant"
import { useMutation } from "@tanstack/react-query"

export function useAddParticipant(scheduleId: string) {
  return useMutation(createParticipant, {
    onSuccess: () => {
      queryClient.invalidateQueries(["schedules"])
      queryClient.invalidateQueries(["schedule", scheduleId])
    }
  })
}
