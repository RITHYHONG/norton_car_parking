'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Download } from 'lucide-react'
import { DatePickerWithRange } from '@/components/ui/DateRangePicker'
import { usePDF } from 'react-to-pdf'
import { DateRange } from 'react-day-picker'
import { addDays } from 'date-fns'
import CarLogsTable from '../components/CarLogsTable'
import { HeaderNav } from './HeaderNav'

export function CarLogsContent() {
  const { toPDF, targetRef } = usePDF({filename: 'car-logs.pdf'});
  const [dateRange, setDateRange] = useState<DateRange | undefined>({ 
    from: new Date(), 
    to: addDays(new Date(), 7) 
  });

  return (
    <>
      <HeaderNav title="Car Logs" />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">Car Logs</h1>
        <Card className="mb-6">
          <CardContent className="p-1 md:p-1 md border-0">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Input placeholder="Search logs..." className="w-full md:w-64" />
                <Button variant="outline" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <DatePickerWithRange date={dateRange} setDate={setDateRange} />
                <Button variant="outline" onClick={() => toPDF()}>
                  <Download className="mr-2 h-4 w-4" /> Export PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-0" ref={targetRef}>
            <CarLogsTable />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
