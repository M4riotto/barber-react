"use server"

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
        })
     );
}
 
export default createBoking;