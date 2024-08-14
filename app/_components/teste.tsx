"use client"

import { format, isFuture } from "date-fns";

import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { ptBR } from "date-fns/locale";
import { Avatar, AvatarImage } from "./ui/avatar";
// import getAllBookings from "../_actions/get-all-booking";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import Image from "next/image";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { deleteBooking } from "../_actions/delete-booking";
import { toast } from "sonner";
import { Decimal } from "@prisma/client/runtime/library";

interface TesteProps {
    booking: {
        id: string;
        userId: string;
        serviceId: string;
        date: Date;
        createdAt: Date;
        updatedAt: Date;
        user: {
            name: string | null;
            email: string;
            image: string | null;
        };
        service: {
            name: string;
            imageUrl: string;
            price: Decimal;
        };
    };
}


const Teste = ({ booking }: TesteProps) => {


    const isConfirmed = isFuture(booking.date)
    const handleCancelBookingClick = async () => {
        try {
            await deleteBooking(booking.id)
            toast.success("Reserva cancelada com sucesso")
        } catch (error) {
            console.error(error)
            toast.error("Erro ao cancelar reserva. Tente novamente")
        }
    }

    return (
        <>
            <Sheet>
                <SheetTrigger className="w-full min-w-[90%]">
                    <Card className="min-w-[90%]">
                        <CardContent className="flex justify-between p-0">

                            {/* esquerda  */}
                            <div className="flex flex-col gap-2 py-5 pl-5 ">
                                <Badge className="w-fit" variant={isConfirmed ? 'default' : 'secondary'}>{isConfirmed ? 'Confirmado' : 'Finalizado'}</Badge>
                                <h3 className="font-semibold">{booking.user.name}</h3>
                                <div className="flex gap-2 item-center">
                                    <Avatar className="h-6 w-6">
                                        {booking.user.image && <AvatarImage alt={booking.user.image} src={booking.user.image} />}
                                    </Avatar>

                                    <p className="text-sm">{booking.user.email}</p>

                                </div>
                            </div>

                            {/* DIREITA  */}

                            <div className="flex flex-col flex-center items-center justify-center px-5 border-l-2 border-solid">
                                <p className="text-sm capitalize">{format(booking.date, 'MMMM', { locale: ptBR })}</p>
                                <p className="text-2xl">{format(booking.date, 'dd', { locale: ptBR })}</p>
                                <p className="text-sm">{format(booking.date, 'HH:mm', { locale: ptBR })}</p>
                            </div>

                        </CardContent>
                    </Card>

                </SheetTrigger>
                <SheetContent className="w-[85%] overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle className="text-left">
                            Informações da reserva
                        </SheetTitle>
                    </SheetHeader>

                    <div className="relative h-[180px] w-full flex items-end mt-6">
                        <Image alt={`Mapara da barbearia ${booking.user.name}`} src="/map.png" fill className="object-cover rounded-xl" />
                        <Card className="z-50 w-full mb-3 mx-5 rounded-xl">
                            <CardContent className="px-5 py-3 flex items-center gap-3">
                                <Avatar>
                                    {booking.user.image && <AvatarImage alt={booking.user.image} src={booking.user.image} />}

                                </Avatar>
                                <div>
                                    <h3 className="text-xs font-bold">{booking.user.name}</h3>
                                    <p className="text-xs">{booking.user.email}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="mt-6">
                        <Badge className="w-fit" variant={isConfirmed ? 'default' : 'secondary'}>{isConfirmed ? 'Confirmado' : 'Finalizado'}</Badge>

                        <Card className="mt-3 mb-6">
                            <CardContent className="space-y-3 p-3">
                                <div className="flex items-center justify-between">
                                    <h2 className="font-bold">{booking.service.name}</h2>
                                    <p className="text-sm font-bold">
                                        {Intl.NumberFormat("pt-BR", {
                                            style: "currency",
                                            currency: "BRL",
                                        }).format(Number(booking.service.price))}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between">
                                    <h2 className="text-sm text-gray-400">Data</h2>
                                    <p className="text-sm">
                                        {format(booking.date, "d 'de' MMMM", {
                                            locale: ptBR,
                                        })}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between">
                                    <h2 className="text-sm text-gray-400">Horário</h2>
                                    <p className="text-sm">{format(booking.date, 'HH:mm', { locale: ptBR })}</p>
                                </div>

                                <div className="flex items-center justify-between">
                                    <h2 className="text-sm text-gray-400">Barbearia</h2>
                                    <p className="text-sm">{booking.service.name}</p>
                                </div>

                            </CardContent>
                        </Card>

                        {/* <div className="space-y-3">
                        CONTATO
                            {booking.phones.map((phone, index) => (
                                <PhoneItem key={index} phone={phone} />
                            ))}
                        </div> */}

                    </div>
                    <SheetFooter className="mt-6">
                        <div className="flex items-center gap-3">
                            <SheetClose asChild>
                                <Button variant='outline' className="w-full">
                                    Voltar
                                </Button>
                            </SheetClose>
                            {isConfirmed && (
                                <Dialog>
                                    <DialogTrigger className="w-full">
                                        <Button variant='destructive' className="w-full">
                                            Cancelar Reserva
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="w-[90%]">
                                        <DialogHeader>
                                            <DialogTitle>Você deseja cancelar sua reserva?</DialogTitle>
                                            <DialogDescription>
                                                Ao cancelar, você perderá sua reserva e não poderá recuperá-la. Essa açã é irreversível
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter className="flex-row flex gap-3">
                                            <DialogClose asChild>
                                                <Button variant="secondary" className="w-full">
                                                    Voltar
                                                </Button>
                                            </DialogClose>
                                            <DialogClose className="w-full">
                                                <Button variant="destructive" className="w-full" onClick={handleCancelBookingClick}>
                                                    Confirmar
                                                </Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>


                            )}
                        </div>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </>
    );

}

export default Teste;