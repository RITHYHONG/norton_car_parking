'use client'
import { useState, useEffect } from 'react'
import { CarLog } from '@/types/carLog'
import CarLogsTable from '../../components/CarLogsTable'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Download, Car, CalendarRange, ArrowUpDown } from 'lucide-react'
import { DatePickerWithRange } from "@/components/ui/DateRangePicker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { exportToCSV, exportToPDF } from '@/utils/exportUtils'

export default function BillPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchType, setSearchType] = useState('plate')
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({ from: new Date(), to: new Date() })
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [logs, setLogs] = useState<CarLog[]>([])

  useEffect(() => {
    const fetchLogs = async () => {
      const data = await fetchCarLogs()
      setLogs(data)
    }
    fetchLogs()
  }, [])

  const fetchCarLogs = async () => {
    const response = await fetch('/api/car-logs')
    if (!response.ok) {
      throw new Error('Failed to fetch car logs')
    }
    return response.json()
  }

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const handleExport = async (format: 'csv' | 'pdf') => {
    const data = await fetchCarLogs()
    if (format === 'csv') {
      exportToCSV(data, 'car_logs.csv')
    } else {
      exportToPDF(data, 'car_logs.pdf')
    }
  }

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
                    <BreadcrumbLink href="#">Car Logs</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="mr-4">
              <ThemeToggle />
            </div>
          </header>
          <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">Car Logs</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Entries Today</CardTitle>
                  <Car className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-xs text-muted-foreground">+23% from yesterday</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Parking Time</CardTitle>
                  <CalendarRange className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2h 34m</div>
                  <p className="text-xs text-muted-foreground">-5% from last week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Peak Hours</CardTitle>
                  <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">9AM - 11AM</div>
                  <p className="text-xs text-muted-foreground">Consistent with last week</p>
                </CardContent>
              </Card>
            </div>
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <Select value={searchType} onValueChange={setSearchType}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Search by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="plate">Plate Number</SelectItem>
                        <SelectItem value="slot">Slot Number</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input 
                      placeholder={`Search by ${searchType}...`}
                      className="w-full md:w-64"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button variant="outline" size="icon">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                  <DatePickerWithRange 
                    className="w-full md:w-auto" 
                    date={dateRange}
                    setDate={setDateRange}
                  />
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => handleExport('csv')}>
                      <Download className="mr-2 h-4 w-4" /> Export CSV
                    </Button>
                    <Button variant="outline" onClick={() => handleExport('pdf')}>
                      <Download className="mr-2 h-4 w-4" /> Export PDF
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-0">
                <CarLogsTable 
                  logs={logs}
                />
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  )
}

