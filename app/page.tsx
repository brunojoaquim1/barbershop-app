import { SearchIcon } from "lucide-react"
import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import Image from "next/image"
import { Card, CardContent } from "./_components/ui/card"
import { Badge } from "./_components/ui/badge"
import { Avatar, AvatarImage } from "./_components/ui/avatar"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"

const Home = async () => {
  const barbershops = await db.barberShop.findMany({})

  return (
    <div>
      <Header></Header>
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Joaquim</h2>
        <p>Quinta-Feira, 12 de março</p>

        <div className="mt-3 flex items-center gap-1">
          <Input className="my-4" placeholder="Faça sua busca" />
          <Button size="icon" className="bg-primary hover:bg-primary/90">
            <SearchIcon />
          </Button>
        </div>

        <div className="relative mt-3 h-[150px] w-full overflow-hidden rounded-xl">
          <Image
            src="/banner-01.svg"
            alt="FSW Barber"
            fill
            className="object-cover"
          />
        </div>
        <h2 className="mb-3 mt-3 text-xs font-bold uppercase text-gray-400">
          Agendamentos
        </h2>
        <Card className="p-0">
          <CardContent className="flex items-stretch justify-between p-0">
            {/* Div da Esquerda */}

            <div className="flex flex-col p-4 px-5">
              <Badge className="w-fit rounded-xl">Confirmado</Badge>
              <h3 className="py-2 font-semibold">Corte de Cabelo</h3>{" "}
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"></AvatarImage>
                </Avatar>
                <p className="text-sm">Barbearia dos Guri</p>
              </div>
            </div>

            {/*Div da Direita*/}
            <div className="flex flex-col items-center justify-center border-l  px-4">
              <p className="text-sm">Março</p>
              <p className="text-2xl">13</p>
              <p className="text-sm">12:00</p>
            </div>
          </CardContent>
        </Card>

        <h2 className="mb-3 mt-3 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}
export default Home
