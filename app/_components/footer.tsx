import { Card } from "./ui/card"

const Footer = () => {
  return (
    <Card className="flex-col gap-0 rounded-none p-0 py-2">
      <p className="mt-0 p-0 text-center text-sm text-gray-500">
        &copy; 2026 FSW Barber
      </p>
      <p className="mt-0 p-0 text-center text-sm text-gray-500">
        Todos os direitos reservados
      </p>
    </Card>
  )
}

export default Footer
