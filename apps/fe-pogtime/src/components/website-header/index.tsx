"use client"

import { getWebsiteUrl, useWebsiteAction } from "@/stores/websiteStore"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
import { useQuery, useSuspenseQuery } from "@tanstack/react-query"
import { websiteOptions } from "@/tanstackQuery/query-options"
import { useAuthToken } from "@/stores/authStore"
import { Suspense } from "react"
import { ArrowDown, ChevronDown, ChevronDownCircle, GlobeLockIcon, PlusCircleIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type PropType = {

}

type DropDownButtonPropType = {
    website_list: string[]
}

export function DropDownButton({website_list} : DropDownButtonPropType) {
    const {setWebsite} = useWebsiteAction();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className = "" variant = "outline">
                    <ChevronDown />
                    Choose Website
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Websites</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {website_list.map((item : string, index: number) => {
                    return <DropdownMenuItem onClick = {
                        () => {
                            setWebsite(item)
                        }
                    } key = {index}>{item}</DropdownMenuItem>;
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function WebsiteHeader({} : PropType){
    const token = useAuthToken();

    if(!token) {
        return (<div>...Loading</div>)
    }

    return (
        <AuthWebsiteHeader token = {token} />
    )
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

function AuthWebsiteHeader({token} : {token: string}) {
    const {setWebsite} = useWebsiteAction();
    const {data: website_data, refetch} = useSuspenseQuery(websiteOptions(token));

    // if(!website_data) {
    //     return <div>Error in loading Data</div>
    // }

    const websiteList = website_data.data.map((item: website_interface) => item.url);

    const website = getWebsiteUrl();

    //console.log(websiteList);

    return (
        <div className = "flex flex-col gap-5 lg:flex-row @container/card px-4 lg:px-6 items-center justify-between">
            <div className = {cn("header font-medium text-[24px]")} >  
                <div className = "flex items-center gap-3">
                    <GlobeLockIcon height = {60} width = {60} strokeWidth={2}/>
                    <div className = "flex flex-col items-start justify-center">
                        <p>{website.length === 0 ? "Please select your website" : website.replace("https://", "").replace("www.", "")}</p>
                        <div className = "border-1 rounded-lg text-xs text-muted-foreground lowercase flex items-center justify-center py-1 px-2"><p>monitoring</p></div>
                    </div>
                </div>
            </div>
            <DropDownButton  website_list={websiteList}/>
        </div>
    )
}

export default WebsiteHeader