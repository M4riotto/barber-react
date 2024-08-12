import { Prisma } from "@prisma/client";
import { Avatar, AvatarImage } from "./avatar";
import { Badge } from "./badge";
import { Card, CardContent } from "./card";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";

interface BookingItemProps{
    booking: Prisma.BookingGetPayload<{
        include:{
            service: {
                include:{
                    barbershop: true
                },
            },
        },
    }>
}

// TODO: RECEBER AGENDA,ENTO COMO PROP

const BookingItem = ({booking}: BookingItemProps) => {

    const isConfirmed = isFuture(booking.date)
    return (
        <>
            <Card className="min-w-[90%]">
                <CardContent className="flex justify-between p-0">

                    {/* esquerda  */}
                    <div className="flex flex-col gap-2 py-5 pl-5 ">
                        <Badge className="w-fit" variant={isConfirmed ? 'default' : 'secondary'}>{isConfirmed ? 'Confirmado' : 'Finalizado'}</Badge>
                        <h3 className="font-semibold">{booking.service.name}</h3>
                        <div className="flex gap-2 item-center">
                            <Avatar className="h-6 w-6">
                                <AvatarImage alt="" src={booking.service.barbershop.imageUrl} />
                            </Avatar>

                            <p className="text-sm">{booking.service.barbershop.name}</p>

                        </div>
                    </div>

                    {/* DIREITA  */}

                    <div className="flex flex-col flex-center items-center justify-center px-5 border-l-2 border-solid">
                        <p className="text-sm capitalize">{format(booking.date, 'MMMM', {locale: ptBR})}</p>
                        <p className="text-2xl">{format(booking.date, 'dd', {locale: ptBR})}</p>
                        <p className="text-sm">{format(booking.date, 'HH:mm', {locale: ptBR})}</p>
                    </div>

                </CardContent>
            </Card>
        </>
    );
}

export default BookingItem;