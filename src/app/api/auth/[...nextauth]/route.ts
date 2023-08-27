import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "../../../../../lib/prisma"
import bcrypt from "bcryptjs"

const options = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      id: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials!.email
          }
        })

        console.log("cheguei aquiiii", user)
        // Add logic here to look up the user from the credentials supplied
        if (!user) {
          return null
        }

        const validPassword = await bcrypt.compare(
          credentials!.password,
          user.password
        )

        if (!validPassword) {
          return null
        }

        return user
      }
    })
  ],
  pages: {
    error: "/login"
  }
})

export { options as GET, options as POST }
