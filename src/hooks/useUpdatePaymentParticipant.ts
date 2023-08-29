import { queryClient } from "@/lib/react-query"
import { updatePaymentParticipant } from "@/services/participant"
import { useMutation } from "@tanstack/react-query"

export function useUpdatePaymentParticipant(scheduleId: string) {
  return useMutation(updatePaymentParticipant, {
    onSuccess: () => {
      queryClient.invalidateQueries(["schedules"])
      queryClient.invalidateQueries(["schedule", scheduleId])
    }
  })
}
