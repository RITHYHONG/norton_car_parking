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
  // In a real application, you would fetch this data from your API
  // For now, we'll generate the slots dynamically based on the totalSlots parameter
  const floorSlots = parkingSlots.filter(slot => slot.floorId === floorId)
  
  if (floorSlots.length !== totalSlots) {
    // If the number of slots has changed, regenerate the slots for this floor
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
  // In a real application, you would update the database here
  console.log(`Updating slot ${slotId} on floor ${floorId} to ${isOccupied ? 'occupied' : 'free'}`)
  
  // Find the slot and update its status
  const slot = parkingSlots.find(s => s.id === slotId && s.floorId === floorId)
  if (slot) {
    slot.isOccupied = isOccupied
  }

  // Simulate a delay to represent a database operation
  await new Promise(resolve => setTimeout(resolve, 500))

  // Return a success message
  return { success: true, message: `Slot ${slotId} on floor ${floorId} updated successfully` }
}

