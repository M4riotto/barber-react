"use server"

import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";

interface createBokingParams {
    serviceId: string
    date: Date
}

const createBoking = async (params: createBokingParams) => {
    const user = await getServerSession(authOptions)
    if (!user) {
        throw new Error("Usuario não autenticado")
    }
    await db.booking.create({
        data: { ...params, userId: (user.user as any).id },
    }),
        revalidatePath('barbershops/[id]')
        revalidatePath("/bookings")

}

export default createBoking;