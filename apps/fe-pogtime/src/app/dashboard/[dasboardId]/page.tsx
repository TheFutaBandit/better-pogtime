import AppSidebar from "@/components/dashboard-components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

type Props = {
    
}

export default function page() {
    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset></SidebarInset>
        </SidebarProvider>
    )
}

