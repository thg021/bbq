import { NextResponse as res } from "next/server"
import { prisma } from "../../../../../lib/prisma"
import bcrypt from "bcryptjs"
export async function GET() {
  return res.json({ hello: "world" })
}

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const userExists = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (userExists) {
    return res.json({ message: "User already exists!" }, { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(password, 4)

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword
    }
  })

  // cookies().set("@bbq:userId", user.id, {
  //   maxAge: 60 * 60 * 24 * 7, // 7 days
  //   path: "/"
  // })

  return res.json({ message: "Usuário criado com sucesso", status: 201 })
}
