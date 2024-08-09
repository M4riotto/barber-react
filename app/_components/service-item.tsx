"use client"

import { Barbershop, BarbershopService, Booking } from "@prisma/client";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "./ui/sheet";
import { Calendar } from "./ui/calendar";
import { ptBR } from "date-fns/locale";
import { useEffect, useState } from "react";
import { format, set } from "date-fns";
import createBoking from "../_actions/create-booking";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { getBookings } from "../_actions/get-bookings";
import { Dialog, DialogContent } from "./ui/dialog";
import SignInDialog from "./sign-in-dialog";

interface ServiceItemProps {
    service: BarbershopService
    barbershop: Pick<Barbershop, 'name'>
}

const TIME_LIST = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
]

const getTimeList = (bookings: Booking[]) => {
    return TIME_LIST.filter(time => {
        const hour = Number(time.split(":")[0])
        const minutes = Number(time.split(":")[1])

        const hasBookingOnCurrentTime = bookings.some(booking => booking.date.getHours() === hour && booking.date.getMinutes() === minutes)

        if (hasBookingOnCurrentTime) {
            return false
        }
        return true
    })
}


const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
    const [signInDialogIsOpne, setSigInDialogIsOpen] = useState(false)

    const { data } = useSession()

    const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
    const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)

    const [dayBookings, setDayBooking] = useState<Booking[]>([])
    const [bookingSheetIsOpne, setBookingSheetsIsOpen] = useState(false)

    useEffect(() => {
        if (!selectedDay) return;
        const fetch = async () => {
            const bookings = await getBookings({ date: selectedDay, serviceId: service.id })
            setDayBooking(bookings)
        }
        fetch
    }, [selectedDay])

    const handleBookingClick = () => {
        if (data?.user) {
            return setBookingSheetsIsOpen(true)
        }
        return setSigInDialogIsOpen(true)
    }

    const handleBookingsSheetsOpenChange = () => {
        setSelectedDay(undefined)
        setSelectedTime(undefined)
        setDayBooking([])
        setBookingSheetsIsOpen(false)
    }

    const handleDateSelect = (date: Date | undefined) => {
        setSelectedDay(date)
    }

    const handleTimeSelected = (time: string) => {
        setSelectedTime(time)
    }

    const handleCreateBooking = async () => {
        try {
            if (!selectedDay || !selectedTime) return

            const hour = Number(selectedTime.split(":")[0])
            const minute = Number(selectedTime.split(":")[1])
            const newDate = set(selectedDay, {
                minutes: minute,
                hours: hour
            })
            await createBoking({
                serviceId: service.id,
                userId: (data?.user as any).id,
                date: newDate
            })
            handleBookingsSheetsOpenChange()

            toast.success("Reserva criada com sucesso")
        } catch (error) {
            toast.error("Você não está logado!")
        }
    }


    return (
        <>
            <Card>
                <CardContent className="flex items-center gap-3 p-3">
                    {/* IMAGE  */}
                    <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
                        <Image alt={service.name} src={service.imageUrl} fill className="object-cover rounded-lg" />
                    </div>

                    {/* DIREITA  */}
                    <div className="space-y-2">
                        <h3 className="font-semibold text-sm">{service.name}</h3>
                        <p className="text-gray-400 text-sm">{service.description}</p>

                        {/* PRECO E BTN  */}
                        <div className="flex items-center justify-between">
                            <p className="font-bold text-sm text-primary">{Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(Number(service.price))}
                            </p>

                            <Sheet open={bookingSheetIsOpne} onOpenChange={handleBookingsSheetsOpenChange}>
                                <Button variant="secondary" size="sm" onClick={handleBookingClick}>
                                    Reservar
                                </Button>
                                <SheetContent className="px-0 flex flex-col items-center">
                                    <SheetHeader>
                                        <SheetTitle>Fazer reserva</SheetTitle>
                                    </SheetHeader>
                                    <div className="border-b border-solid py-5 flex flex-col justify-center">
                                        <Calendar
                                            mode="single"
                                            locale={ptBR}
                                            selected={selectedDay}
                                            onSelect={handleDateSelect}
                                            fromDate={new Date()}
                                            styles={{
                                                head_cell: {
                                                    width: "100%",
                                                    textTransform: "capitalize",
                                                },
                                                cell: {
                                                    width: "100%",
                                                },
                                                button: {
                                                    width: "100%",
                                                },
                                                nav_button_previous: {
                                                    width: "32px",
                                                    height: "32px",
                                                },
                                                nav_button_next: {
                                                    width: "32px",
                                                    height: "32px",
                                                },
                                                caption: {
                                                    textTransform: "capitalize",
                                                },
                                            }}
                                        />

                                    </div>

                                    {selectedDay && (
                                        <div className="p-5 gap-3 flex overflow-x-auto border-b border-solid  [&::-webkit-scrollbar]:hidden">
                                            {getTimeList(dayBookings).map(
                                                time =>
                                                    <Button onClick={() => handleTimeSelected(time)} key={time} variant={selectedTime === time ? "default" : "outline"} className="rounded-full">{time}</Button>
                                            )}
                                        </div>
                                    )}

                                    {selectedTime && selectedDay && (
                                        <div className="p-5">
                                            <Card>
                                                <CardContent className="p-3 space-y-3">
                                                    <div className="flex justify-between items-center">
                                                        <h2 className="font-bold">{service.name}</h2>
                                                        <p className="text-sm font-bold">
                                                            {Intl.NumberFormat('pt-BR', {
                                                                style: 'currency',
                                                                currency: 'BRL'
                                                            }).format(Number(service.price))}
                                                        </p>
                                                    </div>

                                                    <div className="flex justify-between items-center">
                                                        <h2 className="text-sm text-gray-400">Data</h2>
                                                        <p className="text-sm">
                                                            {format(selectedDay, "d 'de' MMMM", { locale: ptBR })}
                                                        </p>
                                                    </div>

                                                    <div className="flex justify-between items-center">
                                                        <h2 className="text-sm text-gray-400">Horário</h2>
                                                        <p className="text-sm">
                                                            {selectedTime}
                                                        </p>
                                                    </div>

                                                    <div className="flex justify-between items-center">
                                                        <h2 className="text-sm text-gray-400">Barbearia</h2>
                                                        <p className="text-sm">
                                                            {barbershop.name}
                                                        </p>
                                                    </div>

                                                </CardContent>
                                            </Card>
                                        </div>
                                    )}

                                    <SheetFooter className="px-5 mt-5">
                                        <Button onClick={handleCreateBooking} disabled={!selectedDay || !selectedTime}>Confirmar</Button>
                                    </SheetFooter>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </CardContent>
            </Card>




            <Dialog open={signInDialogIsOpne} onOpenChange={(open) => setSigInDialogIsOpen(open)}>
                <DialogContent className="w-[90%]">
                    <SignInDialog />
                </DialogContent>
            </Dialog>
        </>
    );
}

export default ServiceItem;