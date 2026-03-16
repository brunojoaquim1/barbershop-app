import Image from "next/image"
import { Button } from "./ui/button"

interface ServiceItemCardProps {
  imageSrc: string
  title: string
}

const BuscaRapida = (props: ServiceItemCardProps) => {
  return (
    <div className="px-1">
      <Button variant="secondary" className="px-5 py-4">
        <Image
          src={props.imageSrc}
          alt={props.title}
          width={20}
          height={20}
          className="object-cover"
        />
        <p>{props.title}</p>
      </Button>
    </div>
  )
}

export default BuscaRapida
