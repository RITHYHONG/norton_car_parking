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
  // In a real application, you would fetch this data from your database
  // For now, we'll return some mock data
  return [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      status: 'Active',
      lastLogin: '2023-06-15 10:30 AM'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'User',
      status: 'Active',
      lastLogin: '2023-06-14 03:45 PM'
    },
    {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: 'Guest',
      status: 'Inactive',
      lastLogin: '2023-06-10 09:15 AM'
    },
    // Add more mock users as needed
  ]
}

