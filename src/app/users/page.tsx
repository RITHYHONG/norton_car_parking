import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ThemeProvider } from "next-themes"
import { UsersContent } from "@/components/UsersContent"

export default function UserPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <UsersContent />
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  )
}

