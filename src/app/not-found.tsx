import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { CarFront } from 'lucide-react'
import { ThemeProvider } from 'next-themes'

export default function NotFound() {
  return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>

    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
      <CarFront className="w-16 h-16 text-primary mb-4" />
      <h1 className="text-4xl font-bold text-center mb-2">404 - Page Not Found</h1>
      <p className="text-xl text-center text-muted-foreground mb-8">
        Oops! It looks like you've taken a wrong turn.
      </p>
      <Button asChild>
        <Link href="/">
          Return to Dashboard
        </Link>
      </Button>
    </div>
    </ThemeProvider>
  )
}

