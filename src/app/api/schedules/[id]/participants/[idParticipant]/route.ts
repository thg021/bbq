import { prisma } from "@/lib/prisma"
import { NextResponse as res } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()

  console.log(body)
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
