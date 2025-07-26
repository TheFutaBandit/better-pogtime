"use client"

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUpIcon } from "lucide-react";


type CardProps = {
    description?: string,
    title?: string,
    trending?: boolean,
    percentage?: string,
    trendingText?: string,
    footerTrendingText?: string
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
    {
        description: "string",
        title: "string",
        trending: true,
        percentage: "string",
        trendingText: "string",
        footerTrendingText: "string"
    },
    {
        description: "string",
        title: "string",
        trending: true,
        percentage: "string",
        trendingText: "string",
        footerTrendingText: "string"
    },
    {
        description: "string",
        title: "string",
        trending: true,
        percentage: "string",
        trendingText: "string",
        footerTrendingText: "string"
    }
]

export function SectionCard(
    {
        description = "Total Revenue",
        title = "$1,250",
        trending = true,
        percentage = "+12.5%",
        trendingText = "Trending Up this month",
        footerTrendingText = "Visitors for the last 6 months"
    }: CardProps
) {
    return (
        <Card className = "@container/card">
                <CardHeader className = "relative">
                    <CardDescription>{description}</CardDescription>
                    <CardTitle className = "@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">{title}</CardTitle>
                    <div className = "absolute right-4 top-4">
                        <Badge variant = "outline" className = "flex gap-1 rounded-lg text-xs">
                            <TrendingUpIcon className = "size-3" />
                            {percentage}
                        </Badge>
                    </div>
                </CardHeader>
                <CardFooter className = "flex-col items-start gap-1 text-sm">
                    <div className = "line-clamp-1 flex gap-2 font-medium">
                        {trendingText} <TrendingUpIcon className = "size-4" />
                    </div>
                    <div className = "text-muted-foreground">
                        {footerTrendingText}
                    </div>
                </CardFooter>
        </Card>
    )
}

export function SectionCards() {
    return (
        <div 
            className = "*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-2 grid grid-cols-2 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6"
        >
            {CardData.map((item, index) => <SectionCard key = {index}/>)}
        </div>
    )
}