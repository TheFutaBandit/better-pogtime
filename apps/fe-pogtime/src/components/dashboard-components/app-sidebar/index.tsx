"use client"

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Globe, LayoutDashboardIcon, ShieldHalf, ShieldHalfIcon } from "lucide-react";
import Link from "next/link";
import NavMain from "../nav-main";

const data = {
    navMain : [   
        {
            title: "Dashboard",
            url: "/",
            icon: LayoutDashboardIcon
        },
        // {
        //     title: "Website",
        //     url: "/",
        //     icon: Globe
        // }
    ]
}

function AppSidebar({...props} : React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className = "data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <Link href = "/">
                                <ShieldHalfIcon className = "w-5 h-5" />
                                <span className = "text-base font-semibold">Futo Inc.</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items = {data.navMain} />
            </SidebarContent>
            <SidebarFooter>

            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar;