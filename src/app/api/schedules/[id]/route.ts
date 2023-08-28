import { NextResponse as res } from "next/server"
import { prisma } from "../../../../../lib/prisma"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const schedules = await prisma.schedule.findFirst({
    where: {
      id: params.id
    },
    include: {
      participants: true
    }
  })

  return res.json(schedules)
}
