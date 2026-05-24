import { Card, CardContent } from "../_components/ui/card"
import { Badge } from "../_components/ui/badge"
import { Avatar, AvatarImage } from "../_components/ui/avatar"
import { Prisma } from "../generated/prisma/client"
import { ptBR } from "date-fns/locale"
import { format, isFuture } from "date-fns"

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
  )
}

export default BookingItem
