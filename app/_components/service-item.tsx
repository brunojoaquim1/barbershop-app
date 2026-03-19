import { barberShopServices } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"

interface ServiceItemProps {
  service: barberShopServices
}

const ServiceItem = ({ service }: ServiceItemProps) => {
  return (
    <div className="">
      <Card className=" px-3">
        <CardContent className="flex flex-row items-start gap-3 px-0 !pb-3 pt-3">
          {/* Imagem do serviço */}
          <div className="h-[120px] w-[120px] flex-shrink-0">
            <Image
              src={service.imageUrl}
              alt={service.name}
              width={120}
              height={120}
              className="block h-[120px] w-[120px] rounded-xl object-cover"
            />
          </div>

          {/* Detalhes do serviço */}
          <div className="w-full space-y-2 px-1">
            <h3 className="text-sm font-semibold">{service.name}</h3>
            <p className="text-sm text-gray-400">{service.description}</p>
            <div className="r align-center flex w-full flex-row items-center">
              <p className="text-sm font-bold text-primary">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </p>
              <div className="ml-auto">
                <Button variant="secondary" className="rounded-lg">
                  Reservar
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ServiceItem
