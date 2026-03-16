import { BarberShop } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { StarIcon } from "lucide-react"
interface BarbershopItemProps {
  barbershop: BarberShop
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  return (
    <Card className="min-h-[159px] min-w-[167px] overflow-hidden rounded-2xl border border-[#26272B] p-0 ">
      <CardContent className="p-0">
        {/* Imagem */}
        <div className="relative mt-2 h-[167px] w-full  ">
          <Image
            fill
            className="rounded-2xl object-cover px-1"
            src={barbershop.imageUrl}
            alt={barbershop.name}
          />
          <Badge
            className="absolute left-2 top-2 z-50 rounded-xl"
            variant="secondary"
          >
            <StarIcon
              className=" mr-1 fill-primary text-primary "
              size={12}
            ></StarIcon>{" "}
            <p className="text-xs font-semibold">5.0</p>
          </Badge>
        </div>
        {/* TEXTO */}
        <div className="flex flex-col gap-2 p-3">
          <h3 className="truncate text-sm font-bold">{barbershop.name}</h3>
          <p className="truncate text-xs text-gray-400">{barbershop.adress}</p>
          <Button variant="secondary" className="mt-1 w-full">
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default BarbershopItem
