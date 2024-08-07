import { SearchIcon } from "lucide-react"
import { Button } from "./_components/ui/button"
import Header from "./_components/ui/header"
import { Input } from "./_components/ui/input"
import Image from "next/image"
import { Card, CardContent } from "./_components/ui/card"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/ui/barbershop-items"
import {quickSearchOptions} from "./_constants/search"
import BookingItem from "./_components/ui/booking-item"



const Home = async () => {

  const barbershops = await db.barbershop.findMany({})
  const popularbarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    }
  })

  return (
    <div>
      {/* HEADER */}
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, VítoR!</h2>
        <p>Segunda-Feira, 05 de Agosto</p>

        {/* BUSCA */}
        <div className="flex items-center gap-2 mt-6">
          <Input placeholder="Faça sua busca..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        {/* busca rapida */}
        <div className="flex gap-3 mt-6 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map(option =>(
            <Button className="gap-2" variant="secondary" key={option.title}>
              <Image alt={option.title} src={option.imageUrl} width={16} height={16} />
              {option.title}
            </Button>
          ))}
        
        </div>

        {/* BANNER  */}
        <div className="relative w-full h-[150px] mt-6 ">
          <Image alt="" src="/banner-01.png" fill className="object-cover rounded-xl" />
        </div>

      <BookingItem  />

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
