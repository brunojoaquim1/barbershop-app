import { SearchIcon } from "lucide-react"
import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import Image from "next/image"

export default function Home() {
  return (
    <div>
      <Header></Header>
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Joaquim</h2>
        <p>Quinta-Feira, 12 de março</p>
        <div className="mt-6 flex items-center gap-1">
          <Input className="my-4" placeholder="Faça sua busca" />
          <Button size="icon" className="bg-primary hover:bg-primary/90">
            <SearchIcon />
          </Button>
        </div>
        <div className="relative mt-6 h-[150px] w-full overflow-hidden rounded-xl">
          <Image
            src="/banner-01.svg"
            alt="FSW Barber"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  )
}
