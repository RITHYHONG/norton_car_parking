'use client'
import { useEffect, useState } from 'react'
import ParkingSlot from './ParkingSlot'
import { getParkingSlots } from '@/app/actions/api'
interface ParkingFloorProps {
  floorId: string
  floorName: string
  totalSlots: number
}

export default function ParkingFloor({ floorId, floorName, totalSlots }: ParkingFloorProps) {
  const [slots, setSlots] = useState([])

  useEffect(() => {
    const fetchSlots = async () => {
      const fetchedSlots = await getParkingSlots(floorId, totalSlots)
      setSlots(fetchedSlots)
    }
    fetchSlots()
  }, [floorId, totalSlots])

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {slots.map((slot) => (
          <ParkingSlot key={slot.id} slot={slot} />
        ))}
      </div>
    </div>
  )
}

