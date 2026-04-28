"use client"

import { Button } from "./ui/button"
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { quickSearchOptions } from "../_constants/search"
import Link from "next/link"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
} from "./ui/dialog"
import { signOut, useSession } from "next-auth/react"
import { Avatar, AvatarImage } from "./ui/avatar"
import SignInDialog from "./sign-in-dialog"
import { useEffect, useState } from "react"

const SidebarSheet = () => {
  const { data } = useSession()
  const handleLogoutClick = () => signOut()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <SheetContent className="overflow-y-auto p-0">
      {/* Header */}
      <SheetHeader className="px-5 pb-0 pt-6">
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      {/* User info */}
      <div className="flex items-center justify-between gap-3 border-b border-solid px-5 py-4">
        {data?.user ? (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={data?.user?.image ?? ""} />
            </Avatar>
            <div>
              <p className="font-bold">{data.user.name}</p>
              <p className="text-xs">{data.user.email}</p>
            </div>
          </div>
        ) : (
          <>
            <h2 className="font-bold">Olá, faça seu login!</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon">
                  <LogInIcon />
                </Button>
              </DialogTrigger>
              <DialogPortal container={mounted ? document.body : undefined}>
                <DialogOverlay />
                <DialogContent className="w-[90%]">
                  <SignInDialog />
                </DialogContent>
              </DialogPortal>
            </Dialog>
          </>
        )}
      </div>

      {/* Nav links */}
      <div className="flex flex-col border-b border-solid px-2 py-3">
        <SheetClose asChild>
          <Button className="justify-start gap-2" variant="ghost" asChild>
            <Link href="/">
              <HomeIcon size={18} />
              Início
            </Link>
          </Button>
        </SheetClose>
        <Button className="justify-start gap-2" variant="ghost" asChild>
          <Link href="/bookings">
            <CalendarIcon size={18} />
            Agendamentos
          </Link>
        </Button>
      </div>

      {/* Quick search */}
      <div className="flex flex-col border-b border-solid px-2 py-3">
        {quickSearchOptions.map((option) => (
          <SheetClose key={option.title} asChild>
            <Button className="justify-start gap-2" variant="ghost" asChild>
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  alt={option.title}
                  src={option.imageUrl}
                  height={18}
                  width={18}
                />
                {option.title}
              </Link>
            </Button>
          </SheetClose>
        ))}
      </div>

      {/* Logout */}
      {data?.user && (
        <div className="px-2 py-3">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            onClick={handleLogoutClick}
          >
            <LogOutIcon size={18} />
            Sair da conta
          </Button>
        </div>
      )}
    </SheetContent>
  )
}

export default SidebarSheet
