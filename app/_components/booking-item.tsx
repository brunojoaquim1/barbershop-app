"use client"

import { Card, CardContent } from "../_components/ui/card"
import { Badge } from "../_components/ui/badge"
import { Avatar, AvatarImage } from "../_components/ui/avatar"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { Prisma } from "../generated/prisma/client"
import { ptBR } from "date-fns/locale"
import { format, isFuture } from "date-fns"
import Image from "next/image"
import { Phone } from "lucide-react"
import PhoneItemComponent from "./phone-item-component"

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barberShop: true
        }
      }
    }
  }>
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const isConfirmed = isFuture(booking.date)

  return (
    <Sheet>
      <SheetTrigger className="w-full">
        <Card className="min-w-[90%] border border-solid">
          {" "}
          <CardContent className="flex items-stretch justify-between p-0">
            {/* Div da Esquerda */}

            <div className="flex flex-col p-4 px-5">
              <Badge className="w-fit rounded-xl">
                {isConfirmed ? "Confirmado" : "Finalizado"}
              </Badge>
              <h3 className="py-2 font-semibold">{booking.service.name}</h3>{" "}
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={booking.service.barberShop.imageUrl} />
                </Avatar>
                <p className="text-sm">{booking.service.barberShop.name}</p>
              </div>
            </div>

            {/*Div da Direita*/}
            <div className="flex flex-col items-center justify-center border-l  px-4">
              <p className="text-sm">
                {format(booking.date, "MMMM", { locale: ptBR })}
              </p>
              <p className="text-2xl">
                {format(booking.date, "dd", { locale: ptBR })}
              </p>
              <p className="text-sm">
                {format(booking.date, "HH:mm", { locale: ptBR })}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="w-[50%]">
        <SheetHeader>
          <SheetTitle className="text-left">Informações da Reserva</SheetTitle>
        </SheetHeader>
        <div className="relative mx-auto flex h-[180px] w-[90%] items-end overflow-hidden rounded-xl">
          <Image
            src="/map.png"
            fill
            className="object-cover "
            alt={`Mapa de ${booking.service.barberShop.name}`}
          />
          <Card className="z-50 mx-5 mb-3 w-full border-none bg-secondary ring-0">
            <CardContent className="flex items-center gap-4 px-5 py-2">
              <Avatar>
                <AvatarImage src={booking.service.barberShop.imageUrl} />
              </Avatar>
              <div>
                <h3 className="bold">{booking.service.barberShop.name}</h3>
                <p className="text-xs">{booking.service.barberShop.adress}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-6 px-5">
          {" "}
          <Badge className=" w-fit rounded-xl">
            {isConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>
          <Card className="mt-3 ">
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
                <p className="text-sm ">
                  {format(booking.date, "d 'de' MMMM", {
                    locale: ptBR,
                  })}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Horário</h2>
                <p className="text-sm ">
                  {format(booking.date, "HH:mm", { locale: ptBR })}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Barbearia</h2>
                <p className="text-sm ">{booking.service.barberShop.name}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="">
          {booking.service.barberShop.phones.map((phone) => (
            <PhoneItemComponent key={phone} phone={phone} />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default BookingItem
