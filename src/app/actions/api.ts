'use server'

interface ParkingSlot {
  id: number
  number: number
  isOccupied: boolean
  floorId: string
}

// Simulated data
let parkingSlots: ParkingSlot[] = []

export async function getParkingSlots(floorId: string, totalSlots: number): Promise<ParkingSlot[]> {
  const floorSlots = parkingSlots.filter(slot => slot.floorId === floorId)
  
  if (floorSlots.length !== totalSlots) {
    parkingSlots = parkingSlots.filter(slot => slot.floorId !== floorId)
    const newSlots = Array.from({ length: totalSlots }, (_, i) => ({
      id: parseInt(floorId) * 1000 + i + 1,
      number: i + 1,
      isOccupied: Math.random() < 0.5,
      floorId: floorId
    }))
    parkingSlots.push(...newSlots)
  }

  return parkingSlots.filter(slot => slot.floorId === floorId)
}

export async function updateSlotStatus(slotId: number, floorId: string, isOccupied: boolean): Promise<{ success: boolean, message: string }> {
  console.log(`Updating slot ${slotId} on floor ${floorId} to ${isOccupied ? 'occupied' : 'free'}`)
  
  const slot = parkingSlots.find(s => s.id === slotId && s.floorId === floorId)
  if (slot) {
    slot.isOccupied = isOccupied
  }

  await new Promise(resolve => setTimeout(resolve, 500))

  return { success: true, message: `Slot ${slotId} on floor ${floorId} updated successfully` }
}

