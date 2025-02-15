'use client'

import { useState } from 'react'
import { UserTable } from '@/components/UserTable'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search } from 'lucide-react'
import { ThemeToggle } from "./theme-toggle"
import { HeaderNav } from './HeaderNav'

export function UsersContent() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <>
      <HeaderNav title="User Management" />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">User Management</h1>
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Input
                  placeholder="Search users..."
                  className="w-full md:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant="outline" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-0">
            <UserTable searchQuery={searchQuery} />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
