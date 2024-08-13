// import { SearchIcon } from "lucide-react"
import { Button } from "./_components/ui/button"
import Header from "./_components/ui/header"
// import { Input } from "./_components/ui/input"
import Image from "next/image"
// import { Card, CardContent } from "./_components/ui/card"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/ui/barbershop-items"
import { quickSearchOptions } from "./_constants/search"
import BookingItem from "./_components/ui/booking-item"
import Search from "./_components/search"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "./_lib/auth"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"



const Home = async () => {

  const session = await getServerSession(authOptions)

  const barbershops = await db.barbershop.findMany({})
  const popularbarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    }
  })

  const confirmedBookings = session?.user ? await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        gte: new Date()
      }
    },
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    },
    orderBy: {
      date: "asc"
    }
  }) : []

  return (
    <div>
      {/* HEADER */}
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold"> {session?.user?.name ? `Olá, ${session.user.name}` : "Olá, Bem vindo"} </h2>

        <div className="flex">
          <p className="capitalize">{format(new Date(), "EEEE, dd 'de' MMMM", { locale: ptBR })}</p>
        </div>

        {/* BUSCA */}
        <div className="mt-6">
          <Search />
        </div>
        {/* busca rapida */}
        <div className="flex gap-3 mt-6 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map(option => (
            <Button className="gap-2" variant="secondary" key={option.title} asChild>
              <Link href={`/barbershops?service=${option.title}`}>
                <Image alt={option.title} src={option.imageUrl} height={18} width={18} />
                {option.title}
              </Link>
            </Button>
          ))}

        </div>

        {/* BANNER  */}
        <div className="relative w-full h-[150px] mt-6 ">
          <Image alt="" src="/banner-01.png" fill className="object-cover rounded-xl" />
        </div>

        {confirmedBookings.length > 0 && (
          <>
            <h2 className="uppercase text-gray-400 font-bold text-xs mt-6 mb-6">Agendamentos</h2>

            <div className="flex overflow-x-auto gap-3 [&::-webkit-scrollbar]:hidden" >
              {confirmedBookings.map(booking => <BookingItem key={booking.id} booking={booking} />)}
            </div>
          </>
        )}




        <h2 className="uppercase text-gray-400 font-bold text-xs mt-6 mb-6">Recomendados</h2>

        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map(barbershop => <BarbershopItem key={barbershop.id} barbershop={barbershop} />)}
        </div>




        <h2 className="uppercase text-gray-400 font-bold text-xs mt-6 mb-6">Populares</h2>

        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularbarbershops.map(barbershop => <BarbershopItem key={barbershop.id} barbershop={barbershop} />)}
        </div>

      </div>
    </div>


  )
}

export default Home
