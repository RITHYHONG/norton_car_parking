'use client'

import { useState } from 'react'
import { Car } from 'lucide-react'
import { updateSlotStatus } from '@/app/actions/api'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ParkingSlotProps {
  slot: {
    id: number
    number: number
    isOccupied: boolean
    floorId: string
  }
}

export default function ParkingSlot({ slot }: ParkingSlotProps) {
  const [isOccupied, setIsOccupied] = useState(slot.isOccupied)

  const toggleStatus = async () => {
    const newStatus = !isOccupied
    setIsOccupied(newStatus)
    await updateSlotStatus(slot.id, slot.floorId, newStatus)
  }

  return (
    <div className={`p-4 rounded-lg shadow-md transition-colors ${
      isOccupied ? 'bg-red-300' : 'bg-green-300'
    }`}>
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-gray-800">Slot {slot.number}</span>
        <Car className={isOccupied ? 'text-red-700' : 'text-green-700'} />
      </div>
      <div className="flex justify-between items-center">
        <span className={isOccupied ? 'text-red-700' : 'text-green-700'}>
          {isOccupied ? 'Occupied' : 'Free'}
        </span>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">Details</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Slot {slot.number} Details</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p>Status: {isOccupied ? 'Occupied' : 'Free'}</p>
              <p>Floor: {slot.floorId}</p>
              <p>Last updated: {new Date().toLocaleString()}</p>
            </div>
            <Button onClick={toggleStatus}>
              {isOccupied ? 'Mark as Free' : 'Mark as Occupied'}
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

