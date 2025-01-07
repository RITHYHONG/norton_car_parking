'use server'

export async function updateSlotStatus(slotNumber: number, isOccupied: boolean) {
  // In a real application, you would update the database here
  console.log(`Updating slot ${slotNumber} to ${isOccupied ? 'occupied' : 'free'}`)
  
  // Simulate a delay to represent a database operation
  await new Promise(resolve => setTimeout(resolve, 500))

  // Return a success message
  return { success: true, message: `Slot ${slotNumber} updated successfully` }
}

