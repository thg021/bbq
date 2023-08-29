import { prisma } from "@/lib/prisma"
import { NextResponse as res } from "next/server"

export async function DELETE(
  req: Request,
  { params }: { params: { idParticipant: string; id: string } }
) {
  console.log(params)
  await prisma.participant.delete({
    where: {
      id: params.idParticipant,
      schedule_id: params.id
    }
  })

  return res.json({ message: "ok" })
}

export async function PUT(req: Request) {
  const body = await req.json()

  await prisma.participant.update({
    where: {
      id: body.id,
      schedule_id: body.schedule_id
    },
    data: {
      paid: body.paid
    }
  })
  return res.json({ message: "Pagamento atualizado com sucesso", status: 200 })
}
