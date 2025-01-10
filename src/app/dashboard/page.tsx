'use client'
import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ParkingFloor from '@/components/ParkingFloor'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ParkingOverview } from "@/components/ParkingOverview"
import { RecentActivity } from "@/components/RecentActivities"
import { CarSlotStatus } from "@/components/CarSlotStatus"
import { CarFront, Car, DollarSign, Users } from 'lucide-react'
import { AppSidebar } from "../../components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ThemeProvider } from "next-themes"
import { ThemeToggle } from "../../components/theme-toggle"
import { CircleParking, CircleDollarSign, ChevronsRight } from "lucide-react"
import NumberTicker from "@/components/magicui/number-ticker"
import ParkingSlot from '@/components/ParkingSlot'
import { getParkingSlots } from '@/app/actions/api'
import Link from "next/link"

const TOTAL_SLOTS = 20

export default function DashboardPage() {
  const [floors, setFloors] = useState([
    { id: "1", name: "First Floor", slots: 20 }
  ])

  useEffect(() => {
    // Fetch data if needed
  }, [])

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
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="mr-4">
              <ThemeToggle />
            </div>
          </header>
          <div className="flex flex-col gap-8 container mx-auto p-4">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Parking Slots</CardTitle>
                  <CarFront className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">100</div>
                  <p className="text-xs text-muted-foreground">20 available</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Cars Parked Today</CardTitle>
                  <Car className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">250</div>
                  <p className="text-xs text-muted-foreground">+15% from yesterday</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenue Today</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$1,250</div>
                  <p className="text-xs text-muted-foreground">+5% from yesterday</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">120</div>
                  <p className="text-xs text-muted-foreground">+2 new users today</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Parking Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <ParkingOverview />
                </CardContent>
              </Card>
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <RecentActivity />
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Car Slot Status</CardTitle>
              </CardHeader>
              <CardContent>
                <CarSlotStatus />
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  )
}

