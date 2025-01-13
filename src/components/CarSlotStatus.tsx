'use client'

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface Level {
  name: string
  totalSlots: number
  availableSlots: number
}

const levels: Level[] = [
  { name: "Level 1", totalSlots: 20, availableSlots: 8 },
  { name: "Level 2", totalSlots: 20, availableSlots: 3 },
  { name: "Level 3", totalSlots: 20, availableSlots: 15 },
]

export function CarSlotStatus() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {levels.map((level) => (
        <Card key={level.name}>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm font-medium">{level.name}</p>
              <p className="text-sm text-muted-foreground">
                {level.availableSlots} of {level.totalSlots} slots available
              </p>
            </div>
            <Badge variant={level.availableSlots > 5 ? "default" : "destructive"}>
              {level.availableSlots > 5 ? "Available" : "Almost Full"}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

