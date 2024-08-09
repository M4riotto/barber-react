"use server"

import { endOfDay, startOfDay } from "date-fns"
import { db } from "../_lib/prisma"

interface GetBookingsPropos {
    serviceId: string,
    date: Date
}

export const getBookings = async ({ date }: GetBookingsPropos) => {
    return await db.booking.findMany({
        where: {
            date: {
                lte: endOfDay(date),
                gte: startOfDay(date),
            }
        }
    })
}