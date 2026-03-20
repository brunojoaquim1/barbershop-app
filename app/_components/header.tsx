import { HomeIcon, MenuIcon, CalendarIcon, LogOutIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "./ui/sheet"
import { QuickSearchOptions, QuickSearchItem } from "../types/search"
import { Avatar, AvatarImage } from "./ui/avatar"
import Link from "next/link"

const Header = () => {
  return (
    <Card className="border-none">
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Image src="/logo.svg" alt="FSW Barber" width={150} height={120} />

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className=" gap-0 p-0">
            <SheetHeader className="border-b border-solid p-5">
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>

            <div className="flex items-center border-b border-solid px-2 py-5">
              <Avatar>
                <AvatarImage src="/avatar.png" alt="Avatar" />
              </Avatar>
              <div className="ml-3">
                <p className="font-semibold">John Doe</p>
                <p className="text-sm text-muted-foreground">
                  john.doe@example.com
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 border-b border-solid px-2 py-5">
              <SheetClose asChild>
                <Button className="justify-start gap-2" variant="ghost" asChild>
                  <Link href="/">
                    <HomeIcon /> Inicio
                  </Link>
                </Button>
              </SheetClose>
              <Button className="justify-start gap-2" variant="ghost">
                <CalendarIcon></CalendarIcon>
                Agendamentos
              </Button>
            </div>
            <div className="flex flex-col gap-2 border-b border-solid px-2 py-5">
              {QuickSearchItem.map((item: QuickSearchOptions) => (
                <Button
                  key={item.title}
                  className="justify-start gap-2"
                  variant="ghost"
                >
                  <Image
                    src={item.imageSrc}
                    alt={item.title}
                    width={20}
                    height={20}
                    className="object-cover"
                  />
                  {item.title}
                </Button>
              ))}
            </div>
            <div className="flex flex-col border-b border-solid px-2 py-5">
              <Button variant="ghost" className="justify-start gap-2">
                <LogOutIcon></LogOutIcon> Sair da Conta
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header
