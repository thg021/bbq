import { NextResponse as res } from "next/server"
import { prisma } from "../../../../lib/prisma"
import { z } from "zod"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const email = url.searchParams.get("email")
  if (!email) {
    return res.json({ status: 400 })
  }
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (!user) {
    return res.json({ message: "User does not exist." }, { status: 400 })
  }

  const schedulesData = await prisma.schedule.findMany({
    where: {
      user_id: user.id
    },
    include: {
      participants: true
    }
  })

  const schedules = schedulesData.map((schedule) => ({
    ...schedule,
    participants: schedule.participants.map((participant) => ({
      ...participant,
      contribution_value: participant.drink
        ? participant.contribution_value * 1.2 // Aumenta em 20% se drink for true
        : participant.contribution_value
    })),
    totalContribution: schedule.participants.reduce(
      (total, participant) =>
        total +
        (participant.drink
          ? participant.contribution_value * 1.2 // Aumenta em 20% se drink for true
          : participant.contribution_value),
      0
    )
  }))

  return res.json({ schedules })
}

export async function POST(req: Request) {
  const body = await req.json()

  try {
    const bodySchema = z.object({
      title: z.string().nonempty().toLowerCase(),
      date: z.string().nonempty(),
      email: z.string().email(),
      participants: z.array(
        z.object({
          participant: z.string().nonempty(),
          contribuition_value: z.string(),
          drink: z.boolean()
        })
      )
    })

    const { email, title, date, participants } = bodySchema.parse(body)

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!user) {
      return res.json({ message: "user not found" }, { status: 409 })
    }

    await prisma.schedule.create({
      data: {
        title,
        event_date: new Date(date),
        user_id: user.id,
        participants: {
          create: participants.map((participant) => ({
            name: participant.participant,
            drink: participant.drink,
            contribution_value: Number(participant.contribuition_value)
          }))
        }
      }
    })
  } catch (error) {
    return res.json({ status: 400 })
  }

  return res.json({ message: "Agendamento criado com sucesso", status: 201 })
}
