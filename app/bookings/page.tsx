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
            <div className="p-5">
                <h1 className="font-bold text-xl">Agendamentos</h1>
                <h2 className="uppercase text-gray-400 font-bold text-xs mt-6 mb-6">Confirmados</h2>
                <div className="space-y-3">
                    {confirmedBookings.map(booking => <BookingItem key={booking.id} booking={booking} />)}
                </div>

                <h2 className="uppercase text-gray-400 font-bold text-xs mt-6 mb-6">Finalizados</h2>
                <div className="space-y-3">
                    {concludeBookings.map(booking => <BookingItem key={booking.id} booking={booking} />)}
                </div>
            </div>
        </>
    );
}

export default Bookings;