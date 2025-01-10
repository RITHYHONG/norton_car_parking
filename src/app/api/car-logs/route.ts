import { NextResponse } from 'next/server';

export async function GET() {
  const carLogs = [
    {
      id: '1',
      plateNumber: 'ABC123',
      slotNumber: 'A1',
      entryTime: '2023-06-15 10:30 AM',
      exitTime: '2023-06-15 02:30 PM',
      duration: '4 hours',
      status: 'Exited',
      licensePlateImage: '/placeholder.svg?height=200&width=400'
    },
    {
      id: '2',
      plateNumber: 'XYZ789',
      slotNumber: 'B3',
      entryTime: '2023-06-15 11:45 AM',
      exitTime: null,
      duration: null,
      status: 'Parked',
      licensePlateImage: '/placeholder.svg?height=200&width=400'
    },
    {
      id: '3',
      plateNumber: 'DEF456',
      slotNumber: 'C2',
      entryTime: '2023-06-14 09:15 AM',
      exitTime: '2023-06-14 05:30 PM',
      duration: '8 hours 15 minutes',
      status: 'Exited',
      licensePlateImage: '/placeholder.svg?height=200&width=400'
    },
  ];

  return NextResponse.json(carLogs);
}
