'use client'

import { useSuspenseQuery } from "@tanstack/react-query"
import { columns, Website } from "./columns"
import { DataTable } from "./data-table"
import { websiteOptions } from "@/tanstackQuery/query-options"

type PropType = {
    token: string
}

type website_interface = {
    url: string;
    website_ticker: {
        response_time_ms: number;
        status: 'UP' | 'DOWN' | 'processing';
        region: {
            name: string;
        };
    }[];
}

export const AuthenticatedTable = ({token}: PropType) => {

    const {data: website_data} = useSuspenseQuery(websiteOptions(token));

    console.log(website_data.data);

    const table_data : Website[] = website_data.data.map((item: website_interface) : Website => {
        return {   
            url: item.url,
            region: item.website_ticker[0]?.region?.name ?? "-",
            response_time: item.website_ticker[0]?.response_time_ms ?? -1,
            status: item.website_ticker[0]?.status ?? 'processing'
        }
    })

    return (
        <DataTable columns={columns} data = {table_data} />
    )
}