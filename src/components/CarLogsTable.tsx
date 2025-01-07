'use client'

import { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { getCarLogs } from '@/app/actions/carLog'
import Image from 'next/image'
import { ArrowUpDown } from 'lucide-react'

interface CarLog {
  id: string
  plateNumber: string
  slotNumber: string
  entryTime: string
  exitTime: string | null
  duration: string | null
  status: 'Parked' | 'Exited'
  licensePlateImage: string
}

interface CarLogsTableProps {
  searchQuery: string
  searchType: 'plate' | 'slot'
  dateRange: { from: Date; to: Date }
  sortColumn: string | null
  sortDirection: 'asc' | 'desc'
  onSort: (column: string) => void
}

export function CarLogsTable({ 
  searchQuery, 
  searchType, 
  dateRange, 
  sortColumn, 
  sortDirection, 
  onSort 
}: CarLogsTableProps) {
  const [logs, setLogs] = useState<CarLog[]>([])
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    const fetchLogs = async () => {
      const fetchedLogs = await getCarLogs()
      setLogs(fetchedLogs)
    }
    fetchLogs()
  }, [])

  const filteredLogs = logs.filter(log => {
    const matchesSearch = searchType === 'plate' 
      ? log.plateNumber.toLowerCase().includes(searchQuery.toLowerCase())
      : log.slotNumber.toLowerCase().includes(searchQuery.toLowerCase())
    const logDate = new Date(log.entryTime)
    const isInDateRange = logDate >= dateRange.from && logDate <= dateRange.to
    return matchesSearch && isInDateRange
  })

  const sortedLogs = [...filteredLogs].sort((a, b) => {
    if (!sortColumn) return 0
    const aValue = a[sortColumn as keyof CarLog]
    const bValue = b[sortColumn as keyof CarLog]
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  const renderSortIcon = (column: string) => {
    if (sortColumn !== column) return null
    return <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === 'asc' ? 'transform rotate-180' : ''}`} />
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => onSort('plateNumber')} className="cursor-pointer">
              Plate Number {renderSortIcon('plateNumber')}
            </TableHead>
            <TableHead onClick={() => onSort('slotNumber')} className="cursor-pointer">
              Slot {renderSortIcon('slotNumber')}
            </TableHead>
            <TableHead onClick={() => onSort('entryTime')} className="cursor-pointer">
              Entry Time {renderSortIcon('entryTime')}
            </TableHead>
            <TableHead onClick={() => onSort('exitTime')} className="cursor-pointer">
              Exit Time {renderSortIcon('exitTime')}
            </TableHead>
            <TableHead onClick={() => onSort('duration')} className="cursor-pointer">
              Duration {renderSortIcon('duration')}
            </TableHead>
            <TableHead onClick={() => onSort('status')} className="cursor-pointer">
              Status {renderSortIcon('status')}
            </TableHead>
            <TableHead>License Plate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedLogs.map((log) => (
            <TableRow key={log.id}>
              <TableCell className="font-medium">{log.plateNumber}</TableCell>
              <TableCell>{log.slotNumber}</TableCell>
              <TableCell>{log.entryTime}</TableCell>
              <TableCell>{log.exitTime || '-'}</TableCell>
              <TableCell>{log.duration || '-'}</TableCell>
              <TableCell>
                <Badge variant={log.status === 'Parked' ? 'default' : 'secondary'}>
                  {log.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => setSelectedImage(log.licensePlateImage)}>
                      View
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>License Plate Image</DialogTitle>
                    </DialogHeader>
                    {selectedImage && (
                      <div className="mt-4">
                        <Image 
                          src={selectedImage} 
                          alt="License Plate" 
                          width={400} 
                          height={200} 
                          className="rounded-md"
                        />
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

