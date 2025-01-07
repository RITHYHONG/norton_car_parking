'use server'

interface Bill {
  id: string
  plateNumber: string
  entryTime: string
  exitTime: string
  duration: string
  amount: number
  status: 'Paid' | 'Unpaid'
}

export async function getBills(): Promise<Bill[]> {
  // In a real application, you would fetch this data from your database
  // For now, we'll return some mock data
  return [
    {
      id: '1',
      plateNumber: 'ABC123',
      entryTime: '2023-06-10 10:00 AM',
      exitTime: '2023-06-10 02:00 PM',
      duration: '4 hours',
      amount: 20.00,
      status: 'Paid'
    },
    {
      id: '2',
      plateNumber: 'XYZ789',
      entryTime: '2023-06-10 11:30 AM',
      exitTime: '2023-06-10 03:30 PM',
      duration: '4 hours',
      amount: 20.00,
      status: 'Unpaid'
    },
    {
      id: '3',
      plateNumber: 'DEF456',
      entryTime: '2023-06-10 09:00 AM',
      exitTime: '2023-06-10 05:00 PM',
      duration: '8 hours',
      amount: 40.00,
      status: 'Paid'
    },
    // Add more mock data as needed
  ]
}

