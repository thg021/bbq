import { prisma } from "@/lib/prisma"
import { NextResponse as res } from "next/server"

export async function POST(req: Request) {
  const { scheduleId, participants } = await req.json()

  // body.map(
  //   (participant: {
  //     name: string
  //     drink: boolean
  //     contribution_value: number
  //   }) => ({
  //     name: participant.name,
  //     drink: participant.drink,
  //     contribution_value: participant.contribution_value
  //   })
  // )
  const addParticipantPromise = []
  for (const participant of participants) {
    addParticipantPromise.push(
      prisma.participant.create({
        data: {
          name: participant.name,
          drink: participant.drink,
          contribution_value: participant.contribution_value,
          schedule_id: scheduleId
        }
      })
    )
    await Promise.all(addParticipantPromise)
  }

  // await prisma.participant.create({
  //   data: {

  //   }
  // })
  return res.json(
    { message: "Participante adicionado com sucesso" },
    { status: 200 }
  )
}
