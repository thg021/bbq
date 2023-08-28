import { NextResponse as res } from "next/server"
import { prisma } from "../../../../lib/prisma"
import { z } from "zod"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const email = url.searchParams.get("email")
  if (!email) {
    return res.json({ status: 400 })
  }
  console.log("aquuiiiii ", email)
  const user = await prisma.user.findUnique({
    where: {
      email
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
            drink: participant.drink
          }))
        }
      }
    })
  } catch (error) {
    return res.json({ status: 400 })
  }

  return res.json({ message: "Agendamento criado com sucesso", status: 201 })
}
