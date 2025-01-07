'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import ParkingFloor from '@/components/ParkingFloor'
import { Plus, MoreVertical } from 'lucide-react'

export default function ParkingPage() {
  const [title, setTitle] = useState("Car Parking Management")
  const [floors, setFloors] = useState([
    { id: "1", name: "First Floor", slots: 20 },
   
  ])


  return (
    <div >
      <Tabs defaultValue="1" className="w-full">
    
        {floors.map((floor) => (
          <TabsContent key={floor.id} value={floor.id}>
            <ParkingFloor floorId={floor.id} floorName={floor.name} totalSlots={floor.slots} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

