"use server"

import { getServerSession } from "next-auth"
import { db } from "../_lib/prisma"
import { authOptions } from "../_lib/auth"

interface CreateBookingParams {
  serviceId: string
  userId: string
  date: Date
}

export const createBooking = async (params: CreateBookingParams) => {
  const user = await getServerSession(authOptions).then(
    (session) => session?.user,
  )

  if (!user) {
    throw new Error("Usuário não autenticado")
  }

  if (user.id !== params.userId) {
    throw new Error("Usuário não autorizado")
  }

  await db.booking.create({
    data: params,
  })
}
