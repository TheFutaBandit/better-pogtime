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


type Props = {
    
}

type website_data = {
    url: string;
    website_ticker: {
        response_time_ms: number;
        status: 'UP' | 'DOWN' | 'UNKNOWN';
        region: {
            name: string;
        };
    }[];
}[]

type table_data = 
    {
        url: string,
        region: string,
        response_time: number,
        status: string
    }[]



export default function page() {
    // const queryClient = new QueryClient();

    // // void queryClient.prefetchQuery(websiteOptions);

    return (
        <>
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className = "flex flex-1 flex-col"> {/*this step doesn't seem necessary, but since we copying fuck it*/}
                    <div className = "@container/main flex flex-1 flex-col gap-2">
                        <div className = "flex flex-col gap-4 py-4 md:gap-6 md:py-4">
                            <SectionCards />
                            <div className="px-4 lg:px-6">
                                <MainChart />
                            </div>
                            <MainTable />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
        </>
    )
}

