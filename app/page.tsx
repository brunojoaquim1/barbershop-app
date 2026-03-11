import { Button } from "./components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-600 p-24">
      <Button variant="outline" size="lg">
        Test Button
      </Button>
    </div>
  )
}
