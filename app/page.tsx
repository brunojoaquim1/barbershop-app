import Header from "./_components/header"
import Image from "next/image"

import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"
import BuscaRapida from "./_components/buscaRapida"
import { quickSearchOptions } from "@/app/_constants/search"
import Search from "./_components/search"
import BookingItem from "./_components/booking-item"

import { getConfirmedBookings } from "./_data/get-confirmed-bookings"

const Home = async () => {
  const barbershops = await db.barberShop.findMany({})
  const popularBarbershops = await db.barberShop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  const confirmedBookings = await getConfirmedBookings()

  return (
    <div>
      <Header></Header>
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Joaquim</h2>
        <p>Quinta-Feira, 12 de março</p>

        <div className="mt-6">
          <Search></Search>
        </div>

        <div className="align-center flex overflow-auto py-4 [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((item) => (
            <BuscaRapida
              imageSrc={item.imageUrl}
              title={item.title}
              key={item.title}
            />
          ))}
          <BuscaRapida imageSrc="/tesoura.svg" title="Cabelo" />
          <BuscaRapida imageSrc="/navalha.svg" title="Barba" />
          <BuscaRapida imageSrc="/mustache.svg" title="Acabamento" />
          <BuscaRapida imageSrc="/footprints.svg" title="Pezinho" />
          <BuscaRapida imageSrc="/eye.svg" title="Sobrancelha" />
        </div>

        <div className="relative mt-3 h-[150px] w-full overflow-hidden rounded-xl">
          <Image
            src="/banner-01.svg"
            alt="FSW Barber"
            fill
            className="object-cover"
          />
        </div>

        {confirmedBookings.length > 0 && (
          <div className="gap-2">
            <h2 className="mb-3 mt-3 text-xs font-bold uppercase text-gray-400">
              Agendamentos
            </h2>
            {/* AGENDAMENTO */}
            <div className="flex gap-3 overflow-auto [&::-webkit-scrollbar]:hidden">
              {confirmedBookings.map((booking) => (
                <BookingItem
                  key={booking.id}
                  booking={JSON.parse(JSON.stringify(booking))}
                />
              ))}
            </div>
          </div>
        )}

        <h2 className="mb-3 mt-3 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        <h2 className="mb-3 mt-3 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}
export default Home
