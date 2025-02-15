import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ThemeProvider } from "next-themes"
import { CarSlotsContent } from "@/components/CarSlotsContent"

export default function ParkingPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <CarSlotsContent />
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  )
}

