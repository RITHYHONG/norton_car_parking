import { Badge } from "@/components/ui/badge"

const parkingLevels = [
  { level: "A", totalSlots: 30, availableSlots: 10 },
  { level: "B", totalSlots: 40, availableSlots: 5 },
  { level: "C", totalSlots: 30, availableSlots: 15 },
]

export function CarSlotStatus() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {parkingLevels.map((level) => (
        <div key={level.level} className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h3 className="text-lg font-semibold">Level {level.level}</h3>
            <p className="text-sm text-muted-foreground">
              {level.availableSlots} / {level.totalSlots} available
            </p>
          </div>
          <Badge variant={level.availableSlots > 5 ? "success" : "destructive"}>
            {level.availableSlots > 5 ? "Available" : "Almost Full"}
          </Badge>
        </div>
      ))}
    </div>
  )
}

