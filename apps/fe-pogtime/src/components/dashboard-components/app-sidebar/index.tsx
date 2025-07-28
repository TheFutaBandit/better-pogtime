"use client"

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Drill, Globe, LayoutDashboardIcon, ShieldHalf, ShieldHalfIcon } from "lucide-react";
import Link from "next/link";
import NavMain from "../nav-main";
import NavUser from "../nav-user";

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
    ],
    user : {
        name: "FutaBandit",
        email: "futobandit@gmail.com",
        Avatar: "Drill"
    }
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
                <NavUser user = {data.user} />
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar;