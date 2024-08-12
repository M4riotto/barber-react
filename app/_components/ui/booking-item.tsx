"use client"

import { Prisma } from "@prisma/client";
import { Avatar, AvatarImage } from "./avatar";
import { Badge } from "./badge";
import { Card, CardContent } from "./card";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import { SheetTrigger, Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from "./sheet";
import Image from "next/image";
import PhoneItem from "../phone-item";
import { Button } from "./button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";
import { deleteBooking } from "@/app/_actions/delete-booking";
import { toast } from "sonner";
import { useState } from "react";

interface BookingItemProps {
    booking: Prisma.BookingGetPayload<{
        include: {
            service: {
                include: {
                    barbershop: true
                },
            },
        },
    }>
}

// TODO: RECEBER AGENDA,ENTO COMO PROP

const BookingItem = ({ booking }: BookingItemProps) => {

    const [isSheetsOpen, setIsSheetsOpen] = useState(false)

    const { service: { barbershop } } = booking

    const isConfirmed = isFuture(booking.date)
    const handleCancelBookingClick = async () => {
        try {
            await deleteBooking(booking.id)
            setIsSheetsOpen(false)
            toast.success("Reserva cancelada com sucesso")
        } catch (error) {
            console.error(error)
            toast.error("Erro ao cancelar reserva. Tente novamente")
        }
    }

    const handleSheetOpenChange = (isOpen: boolean) => {
        setIsSheetsOpen(isOpen)
    }
    return (
        <>
            <Sheet open={isSheetsOpen} onOpenChange={handleSheetOpenChange}>
                <SheetTrigger className="w-full">
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
                        <Image alt={`Mapara da barbearia ${booking.service.barbershop.name}`} src="/map.png" fill className="object-cover rounded-xl" />
                        <Card className="z-50 w-full mb-3 mx-5 rounded-xl">
                            <CardContent className="px-5 py-3 flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src={barbershop.imageUrl} />
                                </Avatar>
                                <div>
                                    <h3 className="text-xs font-bold">{barbershop.name}</h3>
                                    <p className="text-xs">{barbershop.address}</p>
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
                                    <p className="text-sm">{barbershop.name}</p>
                                </div>

                            </CardContent>
                        </Card>
                        <div className="space-y-3">
                            {/* CONTATO  */}
                            {barbershop.phones.map((phone, index) => (
                                <PhoneItem key={index} phone={phone} />
                            ))}
                        </div>
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

export default BookingItem;