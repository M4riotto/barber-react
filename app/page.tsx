import { SearchIcon } from "lucide-react"
import { Button } from "./_components/ui/button"
import Header from "./_components/ui/header"
import { Input } from "./_components/ui/input"
import Image from "next/image"
import { Card, CardContent } from "./_components/ui/card"
import { Badge } from "./_components/ui/badge"
import { Avatar, AvatarImage } from "./_components/ui/avatar"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/ui/barbershop-items"

const Home = async () => {

  // chamar bdd
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
        <Button className="gap-2" variant="secondary">
          <Image alt="Cabelo" src="./cabelo.svg" width={16} height={16}/>
          Cabelo
        </Button>

        <Button className="gap-2" variant="secondary">
          <Image alt="Barba" src="./Barba.svg" width={16} height={16}/>
          Barba
        </Button>

        <Button className="gap-2" variant="secondary">
          <Image alt="Acabamento" src="./acabamento.svg" width={16} height={16}/>
          Acabamento
        </Button>

        <Button className="gap-2" variant="secondary">
          <Image alt="sobrancelha" src="./sobrancelha.svg" width={16} height={16}/>
          Sobrancelha
        </Button>

        <Button className="gap-2" variant="secondary">
          <Image alt="massagem" src="./massagem.svg" width={16} height={16}/>
          Massagem
        </Button>

        <Button className="gap-2" variant="secondary">
          <Image alt="hidratacao" src="./hidratacao.svg" width={16} height={16}/>
          Hidratação
        </Button>
        </div>

        {/* BANNER  */}
        <div className="relative w-full h-[150px] mt-6 ">
          <Image alt="" src="/banner-01.png" fill className="object-cover rounded-xl" />
        </div>

        {/* AGENDAMENTo  */}

        <h2 className="uppercase text-gray-400 font-bold text-xs mt-6 mb-6">Agendamentos</h2>

        <Card >
          <CardContent className="flex justify-between p-0">

            {/* esquerda  */}
            <div className="flex flex-col gap-2 py-5 pl-5 ">
              <Badge className="w-fit">Confirmado</Badge>
              <h3 className="font-semibold">Corte de cabelo</h3>
              <div className="flex gap-2 item-center">
                <Avatar className="h-6 w-6">
                  <AvatarImage alt="" src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
                </Avatar>

                <p className="text-sm">Barbearia FSW</p>

              </div>
            </div>

            {/* DIREITA  */}

            <div className="flex flex-col flex-center items-center justify-center px-5 border-l-2 border-solid">
              <p className="text-sm">Fevereiro</p>
              <p className="text-2xl">06</p>
              <p className="text-sm">09:45</p>
            </div>

          </CardContent>
        </Card>

        <h2 className="uppercase text-gray-400 font-bold text-xs mt-6 mb-6">Recomendados</h2>

        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map(barbershop => <BarbershopItem key={barbershop.id} barbershop={barbershop} />)}
        </div>




        <h2 className="uppercase text-gray-400 font-bold text-xs mt-6 mb-6">Populares</h2>

        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularbarbershops.map(barbershop => <BarbershopItem key={barbershop.id} barbershop={barbershop} />)}
        </div>

      </div>


      <footer>
        <Card className="px-5 pt-6">
          <CardContent>
            <p className="text-sm text-gray-400">
              2023 Copyright <span className="font-bold">VGM Barber</span>
            </p>
          </CardContent>
        </Card>
      </footer>
    </div>


  )
}

export default Home
