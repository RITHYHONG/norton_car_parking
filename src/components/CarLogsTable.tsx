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
import { Badge } from "@/components/ui/badge"
import { CarLog } from '@/types/carLog'

const mockLogs: CarLog[] = [
  {
    id: '1',
    plateNumber: 'ABC123',
    entryTime: '2024-01-20T10:00:00',
    exitTime: '2024-01-20T12:00:00',
    duration: '2 hours',
    fee: 10,
    status: 'exited'
  },
  {
    id: '2',
    plateNumber: 'XYZ789',
    entryTime: '2024-01-20T11:00:00',
    status: 'parked'
  },
]

export default function CarLogsTable() {
  const [logs, setLogs] = useState<CarLog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchLogs = async () => {
      try {
        // Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        setLogs(mockLogs)
      } catch (error) {
        console.error('Error fetching logs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLogs()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  if (loading) {
    return <div className="flex justify-center p-4">Loading...</div>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Plate Number</TableHead>
          <TableHead>Entry Time</TableHead>
          <TableHead>Exit Time</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Fee</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logs.map((log) => (
          <TableRow key={log.id}>
            <TableCell>{log.plateNumber}</TableCell>
            <TableCell>{formatDate(log.entryTime)}</TableCell>
            <TableCell>{log.exitTime ? formatDate(log.exitTime) : '-'}</TableCell>
            <TableCell>{log.duration || '-'}</TableCell>
            <TableCell>{log.fee ? `$${log.fee}` : '-'}</TableCell>
            <TableCell>
              <Badge variant={log.status === 'parked' ? 'default' : 'secondary'}>
                {log.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

