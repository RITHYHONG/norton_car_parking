import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ThemeProvider } from "next-themes"
import { BillsContent } from "@/components/BillsContent"

export default function BillPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <BillsContent />
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  )
}

