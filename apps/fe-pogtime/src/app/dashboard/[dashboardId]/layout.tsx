"use client"

import { ReactNode } from "react"
import AppSidebar from "@/components/dashboard-components/app-sidebar";
import { columns, Website } from "@/components/dashboard-components/data-table/columns";
import { DataTable } from "@/components/dashboard-components/data-table/data-table";
import { SectionCards } from "@/components/dashboard-components/SectionCards";
import { SiteHeader } from "@/components/dashboard-components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useAuthToken } from "@/stores/authStore";
import axios from "axios";
import { dehydrate, HydrationBoundary, QueryClient, useQuery } from "@tanstack/react-query";
import MainTable from "@/components/dashboard-components/data-table/main-table";
import { websiteOptions } from "@/tanstackQuery/query-options";
import MainChart from "@/components/dashboard-components/chart-area/main-chart";
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