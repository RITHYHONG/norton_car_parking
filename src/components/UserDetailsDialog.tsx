import {
      Dialog,
      DialogContent,
      DialogDescription,
      DialogHeader,
      DialogTitle,
    } from "@/components/ui/dialog"
    import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
    import { Badge } from "@/components/ui/badge"
    
    interface User {
      id: string
      name: string
      email: string
      role: string
      status: 'Active' | 'Inactive'
      lastLogin: string
    }
    
    interface UserDetailsDialogProps {
      user: User
      open: boolean
      onOpenChange: (open: boolean) => void
    }
    
    export function UserDetailsDialog({ user, open, onOpenChange }: UserDetailsDialogProps) {
      return (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
              <DialogDescription>
                Detailed information about the user.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`} />
                  <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Role</p>
                  <p>{user.role}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge variant={user.status === 'Active' ? 'success' : 'secondary'}>
                    {user.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Last Login</p>
                  <p>{user.lastLogin}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">User ID</p>
                  <p>{user.id}</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )
    }