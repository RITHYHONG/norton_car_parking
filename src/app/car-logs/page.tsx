import { useState, useEffect } from 'react'
import { CarLog } from '@/types/carLog'
import CarLogsTable from '../../components/CarLogsTable'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Download, Car, CalendarRange, ArrowUpDown } from 'lucide-react'
import { DatePickerWithRange } from '@/components/ui/DateRangePicker'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AppSidebar } from "@/components/app-sidebar"
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
import { exportToCSV, exportToPDF } from '@/utils/exportUtils'
import { usePDF } from 'react-to-pdf'
import { DateRange } from 'react-day-picker'
import { addDays } from 'date-fns'
import BillTable from '@/components/BillTable'
import { CarLogsContent } from "@/components/CarLogsContent"

export default function CarLogsPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <CarLogsContent />
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  )
}

