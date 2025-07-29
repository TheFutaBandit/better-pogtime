'use client'

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useAuthStore, useAuthToken } from "@/stores/authStore";
import axios from "axios";
import { websiteOptions } from "@/tanstackQuery/query-options";
import { Suspense, useEffect, useState } from "react";
import { Website } from "./columns";
import { AuthenticatedTable } from "./AuthenticatedTable";
import { TableSkeleton } from "./skeleton-table";


const MainTable = () => {
    const [w_data, set_w_data] = useState<string>("");
    
   
    // useEffect(() => {
    //     useAuthStore.persist.rehydrate();
    // }, []);

    const token = useAuthToken();
    

    if(!token) {
        return <TableSkeleton />
    }
    

    // console.log(website_data.data);

    // const u_data = () => website_data.data[0].map((item) => {item.url})

    // const data: Website[] = [
    //     {
    //       url: "https://example.com",
    //       region: "North America",
    //       response_time: 120,
    //       status: "UP",
    //     },
    //     {
    //       url: "https://example.org",
    //       region: "Europe",
    //       response_time: 250,
    //       status: "DOWN",
    //     },
    //     {
    //       url: "https://example.net",
    //       region: "Asia",
    //       response_time: 300,
    //       status: "processing",
    //     },
    //     {
    //       url: "https://example.co",
    //       region: "South America",
    //       response_time: 180,
    //       status: "UP",
    //     },
    //     {
    //       url: "https://example.io",
    //       region: "Africa",
    //       response_time: 400,
    //       status: "DOWN",
    //     },
    // ];
    
    

    // if (loading) return <div>Loading data...</div>;
    // if (error) return <div>Error: {error.message}</div>;

   
    return (
        <>  
           <AuthenticatedTable token = {token} />
        </>
        // <DataTable columns={columns} data = {data} />
    )
}

export default MainTable;