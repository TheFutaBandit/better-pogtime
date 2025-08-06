'use client'

import { useAuthToken } from "@/stores/authStore";
import { TableSkeleton } from "./skeleton-table";
import { AuthenticatedTickTable } from "./AuthenticatedTickTable";
import { getWebsiteUrl } from "@/stores/websiteStore";

const MainTickTable = () => {
    const token = useAuthToken(); 
    const website = getWebsiteUrl();  

    if(!token || !website) {
        return <TableSkeleton />
    }
       
    return (
        <>  
           <AuthenticatedTickTable token = {token} selectedWebsite={website}/>
        </>
    )
}

export default MainTickTable;