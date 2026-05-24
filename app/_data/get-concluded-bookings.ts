import { getServerSession } from "next-auth"
import { authOptions } from "@/app/_lib/auth"
import { db } from "@/app/_lib/prisma"

export const getConcludedBookings = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user) return []

  return db.booking.findMany({
    where: {
      userId: session.user.id,
      date: { lt: new Date() },
    },
    include: {
      service: {
        include: { barberShop: true },
      },
    },
    orderBy: { date: "desc" },
  })
}
