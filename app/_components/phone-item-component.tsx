"use client"
import { Button } from "./ui/button"
import { Smartphone } from "lucide-react"
import { toast } from "sonner"

interface PhoneItemComponentProps {
  phone: string
}

const handleCopyClick = (phone: string) => {
  navigator.clipboard.writeText(phone)
  toast.success("Número copiado para a área de transferência!")
}

const PhoneItemComponent = ({ phone }: PhoneItemComponentProps) => {
  return (
    <div key={phone} className="mb-2 flex items-center gap-2 px-5">
      <Smartphone size={18} />
      <p className="flex-1 text-sm text-gray-400">{phone}</p>
      <Button
        onClick={() => handleCopyClick(phone)}
        variant="secondary"
        className="rounded-lg px-3 py-1 text-xs"
      >
        Copiar
      </Button>
    </div>
  )
}

export default PhoneItemComponent
