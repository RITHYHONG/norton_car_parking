"use client"

import * as React from "react"
import { gauge, Car, Command, GalleryVerticalEnd, Receipt, Users } from 'lucide-react'

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Rithyhong",
    email: "rithyhong@gmail.com",
    avatar: "../../public/New Project (1).png",
  },
  teams: [
    {
      name: "Car Parking System",
      logo: GalleryVerticalEnd,
      plan: "Norton",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Command,
    },
    {
      title: "Car Slots",
      url: "/car-slots",
      icon: Car,
    },
    {
      title: "Car Logs",
      url: "/car-logs",
      icon: Car,
    },
    {
      title: "Bills",
      url: "/bills",
      icon: Receipt,
    },
    {
      title: "Users",
      url: "/users",
      icon: Users,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" className="h-screen dark:bg-gray-900" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent className="dark:bg-gray-800">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

