import { AppSidebar } from "../../components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ThemeProvider } from "next-themes"
import { ThemeToggle } from "../../components/theme-toggle"
import { CircleParking, Car, CircleDollarSign } from "lucide-react"
import NumberTicker from "@/components/magicui/number-ticker";
import ParkingSlot from '@/components/ParkingSlot'
import { getParkingSlots } from '@/app/actions/api'

const TOTAL_SLOTS = 20
export default async function Page() {


    const slots = await getParkingSlots()
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Overview</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="mr-4">
              <ThemeToggle />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center h-32 w-full">
                <div className="flex items-center w-[80%] justify-between rounded-md p-4 border-b-2 border-gray-500">
                  <div className="flex-1 space-y-1">
                    <p className="text-xl md:text-xl leading-none">
                      Car Today
                    </p>
                    <p className="text-2xl md:text-xl font-bold text-slate-100 text-muted-foreground">
                      <NumberTicker value={1233} />
                    </p>
                  </div>
                  <div className="flex items-center justify-center bg-blue-400 p-4 rounded-full">
                    <Car size={35} />
                  </div>
                </div>
              </div>
              <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center h-32 w-full">
                <div className="flex items-center w-[80%] justify-between rounded-md p-4  border-b-2 border-gray-500">
                  <div className="flex-1 space-y-1">
                    <p className="text-xl md:text-xl leading-none">
                      Parked Cars
                    </p>
                    <p className="text-2xl md:text-xl font-bold text-slate-100 text-muted-foreground">
                      <NumberTicker value={34} />
                    </p>
                  </div>
                  <div className="flex items-center justify-center bg-blue-400 p-4 rounded-full">
                    <CircleParking size={35} />
                  </div>
                </div>
              </div>
              <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center h-32 w-full">
                <div className="flex items-center w-[80%] justify-between rounded-md p-4 border-b-2 border-gray-500">
                  <div className="flex-1 space-y-1">
                    <p className="text-xl md:text-xl leading-none">
                      Revenue
                    </p>
                    <p className="text-2xl md:text-xl font-bold text-slate-100 text-muted-foreground">
                      <NumberTicker value={2333} /><span>$</span>
                    </p>
                  </div>
                  <div className="flex items-center justify-center bg-blue-400 p-4 rounded-full">
                    <CircleDollarSign size={35} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 rounded-xl bg-muted/50 md:min-h-min" >
            <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Car Parking Management</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {slots.map((slot) => (
          <ParkingSlot key={slot.id} slot={slot} />
        ))}
      </div>
    </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  )
}

