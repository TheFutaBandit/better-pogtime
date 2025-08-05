"use client"

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { websiteTickOptions } from "@/tanstackQuery/query-options";
import { useMemo } from "react";


type CardProps = {
    description?: string,
    title?: string,
    trending?: boolean,
    percentage?: string,
    trendingText?: string,
    footerTrendingText?: string
    trendIcon?: boolean
}

const CardData = [
    {
        description: "string",
        title: "string",
        trending: true,
        percentage: "string",
        trendingText: "string",
        footerTrendingText: "string"
    },
]

export function SectionCard(
    {
        description = "Total Revenue",
        title = "$1,250",
        trending = true,
        percentage = "+12.5%",
        trendingText = "-",
        footerTrendingText = "Visitors for the last 6 months",
        trendIcon = true
    }: CardProps
) {
    return (
        <Card className = "@container/card">
                <CardHeader className = "relative">
                    <CardDescription>{description}</CardDescription>
                    <CardTitle className = "@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">{title}</CardTitle>
                    {(trendIcon === true) && <div className = "absolute right-4 top-4">
                        <Badge variant = "outline" className = "flex gap-1 rounded-lg text-xs">
                            <TrendingUpIcon className = "size-3" />
                            {percentage}
                        </Badge>
                    </div>}
                </CardHeader>
                <CardFooter className = "flex-col items-start gap-1 text-sm">
                    <div className = "line-clamp-1 flex gap-2 font-medium">
                        {trendingText} {(trendIcon === true) && ((trendIcon === true) ? <TrendingUpIcon className = "size-4" /> : <TrendingDownIcon className = "size-4" />)}
                    </div>
                    <div className = "text-muted-foreground">
                        {footerTrendingText}
                    </div>
                </CardFooter>
        </Card>
    )
}

type website_tick_data = {
    url: String;
    website_ticker: {
        response_time_ms: Number;
        status: 'UP' | 'DOWN' | 'UNKNOWN'
        createdAt: Date;
        region: {
            name: String;
        };
    }[];
}

type chartDataType = {
    date: string,
    Alerts: number
}[]

function covertToChartData(website_data: { data: website_tick_data[] }): chartDataType {
    const alertMaps = new Map<string, number>();

    const twelveHourLimit = new Date();
    twelveHourLimit.setDate(twelveHourLimit.getDate() - 1);

    website_data.data.forEach((item: website_tick_data) => {
        item.website_ticker.forEach((tick) => {
            const tickDate = new Date(tick.createdAt);

            // if(tickDate < twelveHourLimit) return;

            const roundedMinutes = Math.floor(tickDate.getMinutes() / 3) * 3;

            const roundedDate = new Date(tickDate);

            roundedDate.setMinutes(roundedMinutes, 0, 0);

            const timeKey = roundedDate.toISOString();

            const alertIncrement = tick.status === 'DOWN' ? 1 : 0;

            alertMaps.set(timeKey, (alertMaps.get(timeKey) || 0) + alertIncrement);
        })
    })

    const chartData: chartDataType = Array.from(alertMaps.entries())
        .map(([date, alerts]) => ({
            date,
            Alerts: alerts
        }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    return chartData;
}

function lastMostUnstableTime(data: chartDataType) : string {
    let max_date: string = "";
    let max_time: number = 0;

    data.forEach((item) => {
        if(max_time < item.Alerts) {
            max_date = item.date;
            max_time = item.Alerts;
        }
    })

    return max_date;
}

export function SectionCards({token} : {token: string}) {

    const {data: website_data} = useSuspenseQuery(websiteTickOptions(token));
    
    if(!website_data) {
        return <div>Loading</div>
    }

    const chartData = useMemo(() => {
        return covertToChartData(website_data);
    }, [website_data]);

    const net_total = useMemo(() => ({
        Alerts: chartData.reduce((acc, curr) => acc += curr.Alerts, 0)
    }), [chartData])

    const unstable_time_string = (lastMostUnstableTime(chartData).split("T")[1]).split('.')[0];

    const card1_details = {
        description: "Net Alerts",
        title: `${net_total.Alerts}`,
        trending: true,
        percentage: "string",
        trendingText: (net_total.Alerts < 5 ? "" : "Trending Up this month"),
        footerTrendingText: "Net Alerts received in the past 6 months",
        trendIcon: true
    }

    const card2_details = {
        description: "Most Unstable Time",
        title: `${unstable_time_string}`,
        trending: true,
        percentage: "string",
        trendingText: "Be aware of this moment!",
        footerTrendingText: "Most unstable time in the past 6 months",
        trendIcon: false
    }

    const card_details = [
        card1_details,
        card2_details
    ]
    
    return (
        <div 
            className = "*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-2 grid grid-cols-2 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6"
        >
            {/* {CardData.map((item, index) => <SectionCard key = {item.description}/>)} */}
            {(card_details.length === 0) 
            ? <div>Loading</div> 
            : card_details.map((item, index) => 
            <SectionCard 
                key = {index}
                description={item.description}
                title = {item.title}
                trendingText={item.trendingText}
                footerTrendingText={item.footerTrendingText}
                trendIcon = {item.trendIcon}
            />
            )}
            
        </div>
    )
}