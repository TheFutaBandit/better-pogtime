"use client"

import CreateWebsite from "@/components/create-website"
import { Button } from "@/components/ui/button"
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSubButton } from "@/components/ui/sidebar"
import { MailIcon, PlusCircleIcon, type LucideIcon } from "lucide-react"

type PropItems = {
    items:{
        title: string,
        url: string,
        icon?: LucideIcon
    }[]
}

function NavMain({items} : PropItems) {
    return (
        <SidebarGroup>
            <SidebarGroupContent className = "flex flex-col gap-2">
                <SidebarMenu>
                    <SidebarMenuItem className = "flex items-center gap-2">
                        <CreateWebsite />
                        <Button 
                            size = "icon"
                            className = "h-9 w-9 shrink-0 group-data-[collapsible=icon]:opacity-0"
                            variant = "outline"
                        >
                            <MailIcon />
                            <span className = "sr-only">Inbox</span>
                        </Button>
                    </SidebarMenuItem>
                </SidebarMenu>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key = {item.title}>
                            <SidebarMenuButton tooltip = {item.title} className = "cursor-pointer">
                                {item.icon && <item.icon />}
                                <span>{item.title}  </span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}

export default NavMain;