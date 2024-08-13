// import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
// import { authOptions } from "../_lib/auth";


const getAllBookings = async () => {
    // const session = await getServerSession(authOptions)

    const barbershopId = "3cfcc585-2e3c-43c6-9202-ee431ed344b9"; // Substitua pelo ID da barbearia desejada

    return await db.booking.findMany({
        where: {
            service: {
                barbershopId: barbershopId, // Filtra pelos agendamentos na barbearia com o ID especificado
            }
        },
        include: {
            service: {
                select: {
                    name: true, // Nome do serviço
                }
            },
            user: {
                select: {
                    name: true,  // Nome do usuário
                    email: true  // E-mail do usuário
                }
            }
        },
        orderBy: {
            date: "asc" // Ordena por data, se necessário
        }
    });

}

export default getAllBookings;