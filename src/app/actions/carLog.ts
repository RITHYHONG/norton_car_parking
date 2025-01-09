'use server'

export interface CarLog {
  id: string;
  plateNumber: string;
  entryTime: string;
  exitTime: string | null;
  slotNumber: string;
  licensePlateImage: string;
}

export const sampleCarLogs: CarLog[] = [
  {
    id: '1',
    plateNumber: 'ABC123',
    entryTime: '2023-05-10T09:00:00',
    exitTime: '2023-05-10T17:30:00',
    slotNumber: 'A1',
    licensePlateImage: '/placeholder.svg?height=100&width=200',
  },
  {
    id: '2',
    plateNumber: 'XYZ789',
    entryTime: '2023-05-10T10:15:00',
    exitTime: null,
    slotNumber: 'B3',
    licensePlateImage: '/placeholder.svg?height=100&width=200',
  },
  {
    id: '3',
    plateNumber: 'DEF456',
    entryTime: '2023-05-10T11:30:00',
    exitTime: '2023-05-10T14:45:00',
    slotNumber: 'C2',
    licensePlateImage: '/placeholder.svg?height=100&width=200',
  },
];

