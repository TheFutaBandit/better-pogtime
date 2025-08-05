'use client'

import { useAuthToken } from "@/stores/authStore";
import { TableSkeleton } from "./skeleton-table";
import { AuthenticatedTickTable } from "./AuthenticatedTickTable";

const MainTickTable = () => {
    const token = useAuthToken();   

    if(!token) {
        return <TableSkeleton />
    }
       
    return (
        <>  
           <AuthenticatedTickTable token = {token} />
        </>
    )
}

export default MainTickTable;