"use server"

import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";

interface createBokingParams{
    serviceId: string
    userId: string
    date: Date
}

const createBoking = async (params: createBokingParams) => {
    return ( 
        await db.booking.create({
            data: params
        }),
        revalidatePath('barbershops/[id]')
     );
}
 
export default createBoking;