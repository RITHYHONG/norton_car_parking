'use server'

export async function updateSlotStatus(slotNumber: number, isOccupied: boolean) {
  console.log(`Updating slot ${slotNumber} to ${isOccupied ? 'occupied' : 'free'}`)
  
  await new Promise(resolve => setTimeout(resolve, 500))

  return { success: true, message: `Slot ${slotNumber} updated successfully` }
}

