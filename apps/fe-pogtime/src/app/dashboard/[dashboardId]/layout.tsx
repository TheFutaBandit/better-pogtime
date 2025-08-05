"use client"

import { ReactNode } from "react"
import AppSidebar from "@/components/dashboard-components/app-sidebar";
import { SiteHeader } from "@/components/dashboard-components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useParams } from "next/navigation";

type PropType = {
    children: ReactNode;
}

const layout = ({children} : PropType) => {

    const params = useParams();

    const dashboardId = params.dashboardId as string;

    
    return (
        <SidebarProvider>
            <AppSidebar variant="inset" params = {dashboardId}/>
            <SidebarInset>
                <SiteHeader />
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}

export default layout;