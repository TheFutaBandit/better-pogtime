import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useIsMobile } from "@/hooks/use-mobile";
import { websiteTickOptions } from "@/tanstackQuery/query-options";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

type Props = {
    token: string;
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

    const threeHoursLimit = new Date();
    threeHoursLimit.setHours(threeHoursLimit.getHours() - 3);

    website_data.data.forEach((item: website_tick_data) => {
        item.website_ticker.forEach((tick) => {
            const tickDate = new Date(tick.createdAt);

            if(tickDate < threeHoursLimit) return;

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

const chartConfig = {
    Alerts: {
        label: "Alerts",
        color: "var(--primary)"
    }
} satisfies ChartConfig;

const AuthenticatedChart = ({token}: Props) => {

    const {data: website_data, refetch} = useSuspenseQuery(websiteTickOptions(token)); 
    
    useEffect(() => {
        const interval = setInterval(() => {
            refetch()
        }, 20 * 1000)

        return () => clearInterval(interval)
    }, [])

    
    const chartData = useMemo(() => {
            return covertToChartData(website_data);
        }, [website_data]);

    const total = useMemo(() => ({
            Alerts: chartData.reduce((acc, curr) => acc += curr.Alerts, 0)
        }), [chartData])

    console.log(chartData);

    const formatTime = (value: string) => {
        const date = new Date(value);
        return (date.toLocaleTimeString("en-US", {
            hour: '2-digit',
            minute: '2-digit',
        }))
    }

    if (!chartData.length) {
        return (
            <Card className="py-0">
                <CardHeader className="text-center py-8">
                    <CardTitle>No Alert Data</CardTitle>
                    <CardDescription>No alerts found in the past 3 hours</CardDescription>
                </CardHeader>
            </Card>
        );
    }

    return (
        
         <Card className = "py-0">
            <CardHeader className = "flex flex-col items-stretch border-b !p-0 sm:flex-row">
                <div className = "flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-6">
                    <CardTitle
                        className = "font-medium text-xl"
                    >Website Chart - Alerts</CardTitle>
                    <CardDescription>
                        Showing total Alerts for the last 3 hours
                    </CardDescription>
                </div>
                <div className = "flex">
                    <button 
                        key = "alert"
                        className = "bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 px-6 py-4 border-t text-left sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                    >
                        <span className = "text-muted-foreground text-xs">
                            {chartConfig["Alerts" as keyof typeof chartConfig].label}
                        </span>
                        <span className = "text-lg leading-none font-bold sm:text-3xl">
                            {total["Alerts" as keyof typeof total].toLocaleString()}
                        </span>
                    </ button>
                </div>
            </CardHeader>
            <CardContent className = "px-2 sm:p-6">
                <ChartContainer
                    config = {chartConfig}
                    className = "aspect-auto h-[250px] w-full"
                >
                    <BarChart
                        accessibilityLayer
                        data = {chartData}
                        margin = {{
                            left: 12,
                            right: 12,
                            bottom: 12
                        }} 
                    >
                        <CartesianGrid vertical = {false} />
                        <XAxis 
                            dataKey = "date"
                            tickLine = {false}
                            axisLine = {false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={formatTime}
                        />
                        <ChartTooltip 
                            content = {
                                <ChartTooltipContent 
                                    className = "w-[150px]"
                                    nameKey="alerts"
                                    labelFormatter={formatTime}
                                />
                            }
                        />
                        <Bar dataKey={"Alerts"} fill = {`var(--color-${'Alerts'})`} radius={[2, 2, 0, 0]}/>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>

    )
}   

export default AuthenticatedChart;