import { useAuthToken } from "@/stores/authStore";
import { queryOptions } from "@tanstack/react-query";
import axios from "axios";

import {useAuthStore} from '@/stores/authStore'
import axiosNew from "@/utils/axios";

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
        const ti = `THE KEY IS IN GET USER WEBSITE IS 🔑🔑🔑🔑🔑🔑🔑🔑🔑`;
        console.log(ti);
        console.log(token);
        const website_data_array = await axios.get("http://localhost:3001/api/v1/website");

        return await website_data_array.data;

    } catch(err) {
        console.log(err);
        return placeHolderWebsiteData;
    }
}

export const websiteOptions = (token: string) => queryOptions({
    queryKey: ['website-data'],
    queryFn: () => getUserWebsites(token)
})