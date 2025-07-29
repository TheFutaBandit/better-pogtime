import { useAuthToken } from "@/stores/authStore";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ReactNode } from "react"

type PropType = {
    children: ReactNode;
}

type website_data = {
    url: string;
    website_ticker: {
        response_time_ms: number;
        status: 'UP' | 'DOWN' | 'UNKNOWN';
        region: {
            name: string;
        };
    }[];
}[]

type website_tick_data =  {
    url: string;
    website_ticker: {
        response_time_ms: number;
        status: 'UP' | 'DOWN' | 'UNKNOWN';
        createdAt: Date;
        region: {
            name: string;
        };
    }[];
}[]



const placeHolderWebsiteTickData: website_tick_data = [
    {
        url: "www.placeholder.com",
        website_ticker: [
            {
                response_time_ms: 432,
                status: 'UP',
                createdAt: new Date(),
                region: {
                    name: "USA",
                }
            }
        ]
    }
];

const queryClient = new QueryClient();

//FOR FUCKS SAKE PLEASE REMEMBER TO REFACTOR THIS SHIT



const getUserWebsiteTickData = async () => {
    const token = useAuthToken();
    try {
        const website_data_array = await axios.get("http://localhost:3001/api/v1/website-tick-data", {
            headers : {
                Authorization : `${token}`
            }
        });

        return website_data_array;
    } catch(err) {
        console.log(err);
        return placeHolderWebsiteTickData;
    }
}

// const website_data = await queryClient.prefetchQuery({
//     queryKey: ["user-websites"],
//     queryFn: () => getUserWebsites()
// })

// const website_tick_data = await queryClient.prefetchQuery({
//     queryKey: ["user-tick-data"],
//     queryFn: () => getUserWebsiteTickData()
// })

const layout = ({children} : PropType) => {
    return (
        <>
                {children}
        </>
    )
}

export default layout;