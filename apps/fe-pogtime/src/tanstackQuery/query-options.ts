import { useAuthToken } from "@/stores/authStore";
import { queryOptions } from "@tanstack/react-query";
import axios from "axios";

import {useAuthStore} from '@/stores/authStore'
import axiosNew from "@/utils/axios";
import { Website } from "@/components/dashboard-components/data-table/columns";

const placeHolderWebsiteData = {
    url: "www.placeholder.com",
    website_ticker : [
        {
            response_time_ms: 432,
            status: 'UP',
            region: {
                name: "USA",
            }
        }
    ]
}

export const getUserWebsites = async (token: string) => {
    try {
        const website_data_array = await axios.get("http://localhost:3001/api/v1/website", {
            headers : {
                Authorization : `${token}`
            }
        });

        return await website_data_array.data;

    } catch(err) {
        console.log(err);
        return placeHolderWebsiteData;
    }
}

export const websiteOptions = (token: string) => queryOptions({
    queryKey: ['website-data', token],
    queryFn: () => getUserWebsites(token)
})

export const postUserWebsites = async (token: string, url: string) => {
    try {
        const website_response = await axios.post("http://localhost:3001/api/v1/website", {
                url
            }, {
                headers : {
                    Authorization: token
                }
            })

        return await website_response.data;
    } catch (err) {
        console.log(err);
    }
}

export const getUserWebsiteTicks = async (token: string) => {
    try {
        const website_tick_data_array = await axios.get("http://localhost:3001/api/v1/website/tick-history", {
            headers : {
                Authorization : `${token}`
            }
        });

        return await website_tick_data_array.data;

    } catch(err) {
        console.log(err);
        return placeHolderWebsiteData;
    }
}

export const websiteTickOptions = (token: string) => queryOptions({
    queryKey: ['website-tick-data', token],
    queryFn: () => getUserWebsiteTicks(token)
})

export const deleteUserWebsite = async (website: Website, token: string) => {
    console.log(website);
    try {
        const user_website = await axios.delete(`http://localhost:3001/api/v1/website/`, {
            headers: {
                Authorization: `${token}`
            }, 
            data: website
        })
    } catch (err) {
        console.log(err);
    }
}
