import { getServerSession } from "next-auth";
import Header from "../_components/ui/header";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import { notFound } from "next/navigation";
import BookingItem from "../_components/ui/booking-item";

const Bookings = async () => {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        // TODO: mostrar pop-up para logar caso nao eseja logado
        return notFound()
    }
    const confirmedBookings = await db.booking.findMany({
        where: {
            userId: (session.user as any).id,
            date: {
                gte: new Date(),
            }
        },
        include: {
            service: {
                include: {
                    barbershop: true
                },
            },
        },
        orderBy: {
            date: "asc"
        }
    })

    const concludeBookings = await db.booking.findMany({
        where: {
            userId: (session.user as any).id,
            date: {
                lt: new Date()
            }
        },
        include: {
            service: {
                include: {
                    barbershop: true
                },
            },
        },
        orderBy: {
            date: "asc"
        }
    })
    return (
        <>
            <Header />
            <div className="space-y-3 p-5">
                <h1 className="text-xl font-bold">Agendamentos</h1>
                {confirmedBookings.length > 0 && (
                    <>
                        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
                            Confirmados
                        </h2>
                        {confirmedBookings.map((booking) => (
                            <BookingItem key={booking.id} booking={booking} />
                        ))}
                    </>
                )}
                {concludeBookings.length > 0 && (
                    <>
                        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
                            Finalizados
                        </h2>
                        {concludeBookings.map((booking) => (
                            <BookingItem key={booking.id} booking={booking} />
                        ))}
                    </>
                )}
            </div>
        </>
    )
}

export default Bookings;