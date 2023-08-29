import { NextResponse as res } from "next/server"
import { prisma } from "../../../../../lib/prisma"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const schedulesData = await prisma.schedule.findFirst({
    where: {
      id: params.id
    },
    include: {
      participants: true
    }
  })

  const schedules = {
    ...schedulesData,
    participants: schedulesData?.participants.map((participant) => ({
      ...participant,
      contribution_value: participant.drink
        ? participant.contribution_value * 1.2 // Aumenta em 20% se drink for true
        : participant.contribution_value
    })),
    totalContribution: schedulesData?.participants.reduce(
      (total, participant) =>
        total +
        (participant.drink
          ? participant.contribution_value * 1.2 // Aumenta em 20% se drink for true
          : participant.contribution_value),
      0
    )
  }

  return res.json(schedules)
}
