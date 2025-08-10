"use client"

import CreateWebsite from "@/components/create-website"
import { Button } from "@/components/ui/button"
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSubButton } from "@/components/ui/sidebar"
import { MailIcon, PlusCircleIcon, type LucideIcon } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import {toast, ToastContainer} from 'react-toastify';

type PropItems = {
    items:{
        title: string,
        url: string,
        icon?: LucideIcon
    }[]
}

function NavMain({items} : PropItems) {
    const router = useRouter();
    const path_name = usePathname();

    const notify = () => toast('BITCH YO WEBSITE DOWN');
    useEffect(() => {
        const socket = new WebSocket("ws://localhost:3004");

        socket.onmessage = (event) => {
            // const message = JSON.parse(event.data);
            notify();
        }

        () => socket.close();
    })
    return (
        <>
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
                            <SidebarMenuButton 
                                tooltip = {item.title} 
                                className = "cursor-pointer"
                                onClick={() => {router.push(`${item.url}`)}}
                            >
                                {item.icon && <item.icon />}
                                <span>{item.title}  </span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
        <ToastContainer />
        </>
    )
}

export default NavMain;