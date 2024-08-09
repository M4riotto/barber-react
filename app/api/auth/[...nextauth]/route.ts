import { db } from "@/app/_lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import { Adapter } from "next-auth/adapters"
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({

    adapter: PrismaAdapter(db) as Adapter,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENTE_ID as string,
            clientSecret: process.env.GOOGLE_CLIENTE_SECRET as string,
        })
    ],
    callbacks:{
        async session({session, user}){
            session.user = {
                ...session.user,
                id: user.id,
            } as any
            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET, 
})

export { handler as GET, handler as POST }