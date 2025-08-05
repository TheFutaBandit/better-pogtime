'use client'

import { useSuspenseQuery } from "@tanstack/react-query"
import { getTickWebsiteColumns, getUserWebsiteColumns, Website } from "./columns"
import { DataTable } from "./data-table"
import { deleteUserWebsite, websiteOptions, websiteTickOptions } from "@/tanstackQuery/query-options"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useMutationData } from "@/hooks/useMutationData"

type PropType = {
    token: string
}

type website_interface = {
    url: string;
    website_ticker: {
        response_time_ms: number;
        status: 'UP' | 'DOWN' | 'UNKNOWN';
        region: {
            name: string;
        };
    }[];
}

export type WebsiteTick = {
    region: string,
    response_time: number,
    createdAt: Date,
    status: "UNKNOWN" | "UP" | "DOWN",
}

type website_tick_data = {
    url: string;
    website_ticker: {
        response_time_ms: number;
        status: 'UP' | 'DOWN' | 'UNKNOWN'
        createdAt: Date;
        region: {
            name: string;
        };
    }[];
}

type website_tick =  {
    response_time_ms: number;
    status: 'UP' | 'DOWN' | 'UNKNOWN';
    createdAt: Date;
    region: {
        name: string;
    };
};



export const AuthenticatedTickTable = ({token}: PropType) => {

    const [selectedWebsite, setSelectedWebsite] = useState('www.summertimesaga.com');

    const {data: website_tick_data, refetch} = useSuspenseQuery(websiteTickOptions(token));

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         refetch()
    //     }, 20 * 1000)

    //     return () => clearInterval(interval)
    // }, [])

    if(!website_tick_data.data) return <div>ERROR</div>


    const table_data_website : website_tick_data[] = website_tick_data.data.filter((item: website_interface, index: number) => {
        return item.url === "www.summertimesaga.com";
    })

    if(table_data_website.length === 0) {
        return <div>ERROR, couldn't get website table</div>
    }


    let table_data : WebsiteTick[] = table_data_website[0].website_ticker.map((item: website_tick) : WebsiteTick => {
        return {
            createdAt: item.createdAt ?? "-" ,  
            region: item.region?.name ?? "-",
            response_time: item.response_time_ms ?? -1,
            status: item.status
        }
    })

    table_data = table_data.slice(0, 200);

   


    const columns = useMemo(() => getTickWebsiteColumns(),[]);

    return (
        <DataTable columns={columns} data = {table_data} enableOptions = {false}/>
    )
}