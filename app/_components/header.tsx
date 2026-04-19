import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import { MenuIcon } from "lucide-react"
import { Sheet, SheetTrigger } from "./ui/sheet"
import SideBarSheet from "./siderBar-sheet"
const Header = () => {
  return (
    <Card className="border-none">
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Image src="/logo.svg" alt="FSW Barber" width={150} height={120} />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="secondary">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SideBarSheet />
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header
