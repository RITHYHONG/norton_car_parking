import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const recentActivities = [
  {
    id: 1,
    user: "Panha",
    action: "Parked",
    time: "2 minutes ago",
    avatarSrc: "https://i.pravatar.cc/?img=1",
    avatarFallback: "PH",
  },
  {
    id: 2,
    user: "Dara",
    action: "Left",
    time: "10 minutes ago",
    avatarSrc: "https://i.pravatar.cc/?img=2",
    avatarFallback: "DA",
  },
  {
    id: 3,
    user: "Kimheng",
    action: "Parked",
    time: "15 minutes ago",
    avatarSrc: "https://i.pravatar.cc/?img=3",
    avatarFallback: "KH",
  },
  {
    id: 4,
    user: "Bopha",
    action: "Parked",
    time: "20 minutes ago",
    avatarSrc: "https://i.pravatar.cc/?img=4",
    avatarFallback: "BP",
  },
  {
    id: 5,
    user: "Thyda",
    action: "Left",
    time: "30 minutes ago",
    avatarSrc: "https://i.pravatar.cc/?img=5",
    avatarFallback: "TH",
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-8 max-h-[300px] overflow-y-auto pr-2">
      {recentActivities.map((activity) => (
        <div key={activity.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={activity.avatarSrc} alt={activity.user} />
            <AvatarFallback>{activity.avatarFallback}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.user}</p>
            <p className="text-sm text-muted-foreground">
              {activity.action} {activity.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

