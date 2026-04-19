// app/_components/login-dialog.tsx
"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { LogInIcon } from "lucide-react"
import Image from "next/image"

const LoginDialog = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button size="icon" onClick={() => setOpen(true)}>
        <LogInIcon />
      </Button>

      {open && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80"
          onClick={() => setOpen(false)} // fecha clicando fora
        >
          <div
            className="relative w-[90%] max-w-sm rounded-lg bg-background p-6"
            onClick={(e) => e.stopPropagation()} // impede fechar ao clicar no card
          >
            <button
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
            <h2 className="text-center text-lg font-bold">
              Faça seu login na plataforma
            </h2>
            <p className="mb-4 text-center text-sm text-muted-foreground">
              Conecte-se usando sua conta do Google
            </p>
            <Button variant="outline" className="w-full gap-2">
              <Image src="/google.svg" width={18} height={18} alt="Google" />
              Google
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default LoginDialog
