'use client'

import { useAuthStore, useAuthToken } from "@/stores/authStore";
import AuthenticatedChart from "./authenticated-chart";
import { ChartSkeleton } from "./skeleton-chart";


const MainChart = () => {

    const token = useAuthToken();

    
    

    if(!token) {
        return <ChartSkeleton />
    }

    
   
    return (
        <>  
           <AuthenticatedChart token = {token} />
        </>
    )
}

export default MainChart;