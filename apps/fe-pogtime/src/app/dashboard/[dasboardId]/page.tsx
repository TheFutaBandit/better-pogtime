import AppSidebar from "@/components/dashboard-components/app-sidebar";
import { columns, Website } from "@/components/dashboard-components/data-table/columns";
import { DataTable } from "@/components/dashboard-components/data-table/data-table";
import { SectionCards } from "@/components/dashboard-components/SectionCards";
import { SiteHeader } from "@/components/dashboard-components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

type Props = {
    
}

async function getData(): Promise<Website[]> {
    // Fetch data from your API here.
    return [
        {
            url: "Google",
            region: "USA",
            response_time: 432,
            status: "UP"
        },
    ]
  }

export default async function page() {
    const data = await getData();
    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className = "flex flex-1 flex-col"> {/*this step doesn't seem necessary, but since we copying fuck it*/}
                    <div className = "@container/main flex flex-1 flex-col gap-2">
                        <div className = "flex flex-col gap-4 py-4 md:gap-6 md:py-4">
                            <SectionCards />
                            <DataTable columns={columns} data = {data} />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

