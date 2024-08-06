import { SearchIcon } from "lucide-react"
import { Button } from "./_components/ui/button"
import Header from "./_components/ui/header"
import { Input } from "./_components/ui/input"
import Image from "next/image"
import { Card, CardContent } from "./_components/ui/card"
import { Badge } from "./_components/ui/badge"
import { Avatar, AvatarImage } from "./_components/ui/avatar"

const Home = () => {
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

        {/* BANNER  */}
        <div className="relative w-full h-[150px] mt-6 ">
          <Image alt="" src="/banner-01.png" fill className="object-cover rounded-xl" />
        </div>

        {/* AGENDAMENT  */}
        <Card className="mt-6">
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


      </div>
    </div>
  )
}

export default Home
