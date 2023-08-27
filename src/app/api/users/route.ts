import { NextResponse as res } from "next/server"
import { prisma } from "../../../../lib/prisma"
import { cookies } from "next/headers"

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
    return res.json({ error: "User already exists!" }, { status: 400 })
  }

  const user = await prisma.user.create({
    data: {
      email,
      password
    }
  })

  cookies().set("@bbq:userId", user.id, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/"
  })

  return res.json({ status: 201 })
}
