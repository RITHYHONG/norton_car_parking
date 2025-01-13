"use client"

import * as React from "react"
import { CalendarIcon } from 'lucide-react'
import { format } from "date-fns"
import { DateRangePicker as ReactDateRangePicker } from 'react-date-range'
import { Dispatch, SetStateAction } from 'react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export interface DateRange {
  from: Date
  to: Date
}

interface DatePickerWithRangeProps extends React.HTMLAttributes<HTMLDivElement> {
  date: DateRange
  setDate: Dispatch<SetStateAction<DateRange>>
}

export function DatePickerWithRange({
  className,
  date,
  setDate,
}: DatePickerWithRangeProps) {
  const [state, setState] = React.useState([
    {
      startDate: date.from,
      endDate: date.to,
      key: 'selection'
    }
  ])

  const handleSelect = (ranges: any) => {
    const { selection } = ranges
    setState([selection])
    setDate({
      from: selection.startDate,
      to: selection.endDate
    })
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[260px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <ReactDateRangePicker
            ranges={state}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            months={2}
            direction="horizontal"
            showDateDisplay={false}
            rangeColors={['#3b82f6']}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

