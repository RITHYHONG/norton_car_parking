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
import { HeaderNav } from './HeaderNav'

export function CarSlotsContent() {
  const [title, setTitle] = useState("Car Parking Management")
  const [floors, setFloors] = useState([
    { id: "1", name: "First Floor", slots: 20 },
    { id: "2", name: "Second Floor", slots: 20 },
    { id: "3", name: "Third Floor", slots: 20 },
  ])
  const [newFloorName, setNewFloorName] = useState("")
  const [newFloorSlots, setNewFloorSlots] = useState(20)
  const [editingFloorId, setEditingFloorId] = useState<string | null>(null)

  const addNewFloor = () => {
    if (newFloorName) {
      const newFloorId = (floors.length + 1).toString()
      setFloors([...floors, { id: newFloorId, name: newFloorName, slots: newFloorSlots }])
      setNewFloorName("")
      setNewFloorSlots(20)
    }
  }

  const updateFloorName = (id: string, newName: string) => {
    setFloors(floors.map(floor =>
      floor.id === id ? { ...floor, name: newName } : floor
    ))
    setEditingFloorId(null)
  }

  const deleteFloor = (id: string) => {
    setFloors(floors.filter(floor => floor.id !== id))
  }

  return (
    <>
      <HeaderNav title="Car Slots" />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between mb-4">
          <Input
            className="text-2xl font-bold w-1/2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" /> Add New Floor
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Floor</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newFloorName}
                    onChange={(e) => setNewFloorName(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="slots" className="text-right">
                    Slots
                  </Label>
                  <Input
                    id="slots"
                    type="number"
                    value={newFloorSlots}
                    onChange={(e) => setNewFloorSlots(parseInt(e.target.value))}
                    className="col-span-3"
                  />
                </div>
              </div>
              <Button onClick={addNewFloor}>Add Floor</Button>
            </DialogContent>
          </Dialog>
        </div>
        <Tabs defaultValue="1" className="w-full">
          <TabsList>
            {floors.map((floor) => (
              <TabsTrigger key={floor.id} value={floor.id} className="flex items-center">
                {editingFloorId === floor.id ? (
                  <Input
                    value={floor.name}
                    onChange={(e) => updateFloorName(floor.id, e.target.value)}
                    onBlur={() => setEditingFloorId(null)}
                    autoFocus
                    className="w-32"
                  />
                ) : (
                  <>
                    {floor.name}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()} className="ml-2">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onSelect={() => setEditingFloorId(floor.id)}>
                          Edit Name
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => deleteFloor(floor.id)}>
                          Delete Floor
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {floors.map((floor) => (
            <TabsContent key={floor.id} value={floor.id}>
              <ParkingFloor floorId={floor.id} floorName={floor.name} totalSlots={floor.slots} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  )
}
