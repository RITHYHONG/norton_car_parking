'use server'

interface User {
  id: string
  name: string
  email: string
  role: string
  status: 'Active' | 'Inactive'
  lastLogin: string
}

export async function getUsers(): Promise<User[]> {
  
  return [
    {
      id: '1',
      name: 'Panha',
      email: 'Panha@gamil.com',
      role: 'Admin',
      status: 'Active',
      lastLogin: '2024-06-15 10:30 AM'
    },
    {
      id: '2',
      name: 'Dara',
      email: 'Dara@gamil.com',
      role: 'User',
      status: 'Active',
      lastLogin: '2024-06-14 03:45 PM'
    },
    {
      id: '3',
      name: 'Bopha',
      email: 'Bopha@gamil.com',
      role: 'Guest',
      status: 'Inactive',
      lastLogin: '2024-06-10 09:15 AM'
    },
  ]
}

