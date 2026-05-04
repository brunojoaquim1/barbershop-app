import Image from "next/image"
import { Button } from "./ui/button"
import Link from "next/link"

interface QuickSearchItemProps {
  imageSrc: string
  title: string
}

const BuscaRapida = (props: QuickSearchItemProps) => {
  return (
    <div className="px-1">
      <Button variant="secondary" className="px-5 py-4" asChild>
        <Link href={`/barbershops?service=${props.title}`}>
          <Image
            src={props.imageSrc}
            alt={props.title}
            width={20}
            height={20}
            className="object-cover"
          />
          <p>{props.title}</p>
        </Link>
      </Button>
    </div>
  )
}

export default BuscaRapida
