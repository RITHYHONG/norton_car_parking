'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { getBills } from '@/app/actions/bills'

interface Bill {
  id: string
  plateNumber: string
  entryTime: string
  exitTime: string
  duration: string
  amount: number
  status: 'Paid' | 'Unpaid'
}

export default function BillTable() {
  const [bills, setBills] = useState<Bill[]>([])
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null)

  useState(() => {
    const fetchBills = async () => {
      const fetchedBills = await getBills()
      setBills(fetchedBills)
    }
    fetchBills()
  }, [])

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="h-10">
            <TableHead className="w-[100px] py-2">Bill ID</TableHead>
            <TableHead className="py-2">Plate Number</TableHead>
            <TableHead className="py-2 hidden md:table-cell">Entry Time</TableHead>
            <TableHead className="py-2 hidden md:table-cell">Exit Time</TableHead>
            <TableHead className="py-2 hidden md:table-cell">Duration</TableHead>
            <TableHead className="text-right py-2 hidden md:table-cell">Amount</TableHead>
            <TableHead className="py-2">Status</TableHead>
            <TableHead className="text-right py-2">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bills.map((bill) => (
            <TableRow key={bill.id} className="h-12">
              <TableCell className="font-medium py-2">{bill.id}</TableCell>
              <TableCell className="py-2">{bill.plateNumber}</TableCell>
              <TableCell className="py-2 hidden md:table-cell">{bill.entryTime}</TableCell>
              <TableCell className="py-2 hidden md:table-cell">{bill.exitTime}</TableCell>
              <TableCell className="py-2 hidden md:table-cell">{bill.duration}</TableCell>
              <TableCell className="text-right py-2 hidden md:table-cell">${bill.amount.toFixed(2)}</TableCell>
              <TableCell className="py-2">
                <Badge variant={bill.status === 'Paid' ? 'success' : 'destructive'}>
                  {bill.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right py-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedBill(bill)}>
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Bill Details</DialogTitle>
                            <DialogDescription>
                              Detailed information about the parking bill.
                            </DialogDescription>
                          </DialogHeader>
                          {selectedBill && (
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-2 items-center gap-4">
                                <span className="font-bold">Bill ID:</span>
                                <span>{selectedBill.id}</span>
                              </div>
                              <div className="grid grid-cols-2 items-center gap-4">
                                <span className="font-bold">Plate Number:</span>
                                <span>{selectedBill.plateNumber}</span>
                              </div>
                              <div className="grid grid-cols-2 items-center gap-4">
                                <span className="font-bold">Entry Time:</span>
                                <span>{selectedBill.entryTime}</span>
                              </div>
                              <div className="grid grid-cols-2 items-center gap-4">
                                <span className="font-bold">Exit Time:</span>
                                <span>{selectedBill.exitTime}</span>
                              </div>
                              <div className="grid grid-cols-2 items-center gap-4">
                                <span className="font-bold">Duration:</span>
                                <span>{selectedBill.duration}</span>
                              </div>
                              <div className="grid grid-cols-2 items-center gap-4">
                                <span className="font-bold">Amount:</span>
                                <span>${selectedBill.amount.toFixed(2)}</span>
                              </div>
                              <div className="grid grid-cols-2 items-center gap-4">
                                <span className="font-bold">Status:</span>
                                <Badge variant={selectedBill.status === 'Paid' ? 'success' : 'destructive'}>
                                  {selectedBill.status}
                                </Badge>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View bill details</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

