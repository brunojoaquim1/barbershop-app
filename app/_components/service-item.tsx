"use client"
import { BarberShop, barberShopServices } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { Calendar } from "./ui/calendar"
import { format, set } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { createBooking } from "../_actions/create-booking"
interface ServiceItemProps {
  service: barberShopServices
  barbershop: Pick<BarberShop, "name">
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
  "18:30",
  "19:00",
  "19:30",
]

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const { data } = useSession()

  const [selectedDay, setSelectedDate] = useState<Date | undefined>(undefined)

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
  }

  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleCreateBooking = async () => {
    if (!selectedDay || !selectedTime || !data?.user?.id) {
      return
    }

    const hour = Number(selectedTime.split(":")[0])
    const minute = Number(selectedTime.split(":")[1])
    const newDate = set(selectedDay, { hours: hour, minutes: minute })

    try {
      await createBooking({
        serviceId: service.id,
        userId: data.user.id,
        date: newDate,
      })
      toast.success("Reserva criada com sucesso!")
    } catch (error) {
      console.error(error)
      toast.error("Ocorreu um erro ao criar a reserva.")
    }
  }

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
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="secondary" className="rounded-lg">
                      Reservar
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="space-y-1">
                    <SheetHeader>
                      <SheetTitle>Fazer Reserva</SheetTitle>
                    </SheetHeader>
                    <div className="justify-centerpy-5 flex w-full border-b border-solid">
                      <Calendar
                        mode="single"
                        locale={ptBR}
                        className="w-full"
                        selected={selectedDay}
                        onSelect={handleDateSelect}
                      />
                    </div>
                    {selectedDay && (
                      <div className="flex gap-3 overflow-x-auto border-b border-solid p-5 [&::-webkit-scrollbar]:hidden">
                        {TIME_LIST.map((time) => (
                          <Button
                            key={time}
                            variant={
                              time === selectedTime ? "default" : "outline"
                            }
                            className="mb-2 mr-2 "
                            onClick={() => handleTimeSelect(time)}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    )}
                    {selectedTime && selectedDay && (
                      <div className="p-5">
                        <Card>
                          <CardContent className="space-y-3 p-3">
                            <div className="flex items-center justify-between">
                              <h2 className="font-bold">{service.name}</h2>
                              <p className="text-sm font-bold">
                                {Intl.NumberFormat("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                }).format(Number(service.price))}
                              </p>
                            </div>

                            <div className="flex items-center justify-between">
                              <h2 className="text-sm text-gray-400">Data</h2>
                              <p className="text-sm ">
                                {format(selectedDay, "d 'de' MMMM", {
                                  locale: ptBR,
                                })}
                              </p>
                            </div>

                            <div className="flex items-center justify-between">
                              <h2 className="text-sm text-gray-400">Horário</h2>
                              <p className="text-sm ">{selectedTime}</p>
                            </div>

                            <div className="flex items-center justify-between">
                              <h2 className="text-sm text-gray-400">
                                Barbearia
                              </h2>
                              <p className="text-sm ">{barbershop.name}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                    <SheetFooter>
                      <SheetClose asChild>
                        <Button
                          type="submit"
                          onClick={handleCreateBooking}
                          disabled={!selectedDay || !selectedTime}
                        >
                          Confirmar
                        </Button>
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ServiceItem
