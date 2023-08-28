import { NextResponse as res } from "next/server"
import { prisma } from "../../../../../lib/prisma"

export async function GET(
  req: Request,
  { params }: { params: { email: string } }
) {
  const user = await prisma.user.findUnique({
    where: {
      email: params.email
    }
  })

  if (!user) {
    return res.json({ message: "User does not exist." }, { status: 400 })
  }

  const schedules = await prisma.schedule.findMany({
    where: {
      user_id: user.id
    },
    include: {
      participants: true
    }
  })

  return res.json({ schedules })
}
