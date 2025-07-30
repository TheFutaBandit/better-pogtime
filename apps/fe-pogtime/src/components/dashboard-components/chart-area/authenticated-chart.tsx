import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

type Props = {
    token: string;
}

const chartData = [
    { date: "2024-04-01", Alerts: 222 },
    { date: "2024-04-02", Alerts: 97 },
    { date: "2024-04-03", Alerts: 167 },
    { date: "2024-04-04", Alerts: 242 },
    { date: "2024-04-05", Alerts: 373 },
    { date: "2024-04-06", Alerts: 301 },
    { date: "2024-04-07", Alerts: 245 },
    { date: "2024-04-08", Alerts: 409 },
    { date: "2024-04-09", Alerts: 59 },
    { date: "2024-04-10", Alerts: 261 },
    { date: "2024-04-11", Alerts: 327 },
    { date: "2024-04-12", Alerts: 292 },
    { date: "2024-04-13", Alerts: 342 },
    { date: "2024-04-14", Alerts: 137 },
    { date: "2024-04-15", Alerts: 120 },
    { date: "2024-04-16", Alerts: 138 },
    { date: "2024-04-17", Alerts: 446 },
    { date: "2024-04-18", Alerts: 364 },
    { date: "2024-04-19", Alerts: 243 },
    { date: "2024-04-20", Alerts: 89 },
    { date: "2024-04-21", Alerts: 137 },
    { date: "2024-04-22", Alerts: 224 },
    { date: "2024-04-23", Alerts: 138 },
    { date: "2024-04-24", Alerts: 387 },
    { date: "2024-04-25", Alerts: 215 },
    { date: "2024-04-26", Alerts: 75 },
    { date: "2024-04-27", Alerts: 383 },
    { date: "2024-04-28", Alerts: 122 },
    { date: "2024-04-29", Alerts: 315 },
    { date: "2024-04-30", Alerts: 454 },
    { date: "2024-05-01", Alerts: 165 },
    { date: "2024-05-02", Alerts: 293 },
    { date: "2024-05-03", Alerts: 247 },
    { date: "2024-05-04", Alerts: 385 },
    { date: "2024-05-05", Alerts: 481 },
    { date: "2024-05-06", Alerts: 498 },
    { date: "2024-05-07", Alerts: 388 },
    { date: "2024-05-08", Alerts: 149 },
    { date: "2024-05-09", Alerts: 227 },
    { date: "2024-05-10", Alerts: 293 },
    { date: "2024-05-11", Alerts: 335 },
    { date: "2024-05-12", Alerts: 197 },
    { date: "2024-05-13", Alerts: 197 },
    { date: "2024-05-14", Alerts: 448 },
    { date: "2024-05-15", Alerts: 473 },
    { date: "2024-05-16", Alerts: 338 },
    { date: "2024-05-17", Alerts: 499 },
    { date: "2024-05-18", Alerts: 315 },
    { date: "2024-05-19", Alerts: 235 },
    { date: "2024-05-20", Alerts: 177 },
    { date: "2024-05-21", Alerts: 82 },
    { date: "2024-05-22", Alerts: 81 },
    { date: "2024-05-23", Alerts: 252 },
    { date: "2024-05-24", Alerts: 294 },
    { date: "2024-05-25", Alerts: 201 },
    { date: "2024-05-26", Alerts: 213 },
    { date: "2024-05-27", Alerts: 420 },
    { date: "2024-05-28", Alerts: 233 },
    { date: "2024-05-29", Alerts: 78 },
    { date: "2024-05-30", Alerts: 340 },
    { date: "2024-05-31", Alerts: 178 },
    { date: "2024-06-01", Alerts: 178 },
    { date: "2024-06-02", Alerts: 470 },
    { date: "2024-06-03", Alerts: 103 },
    { date: "2024-06-04", Alerts: 439 },
    { date: "2024-06-05", Alerts: 88 },
    { date: "2024-06-06", Alerts: 294 },
    { date: "2024-06-07", Alerts: 323 },
    { date: "2024-06-08", Alerts: 385 },
    { date: "2024-06-09", Alerts: 438 },
    { date: "2024-06-10", Alerts: 155 },
    { date: "2024-06-11", Alerts: 92 },
    { date: "2024-06-12", Alerts: 492 },
    { date: "2024-06-13", Alerts: 81 },
    { date: "2024-06-14", Alerts: 426 },
    { date: "2024-06-15", Alerts: 307 },
    { date: "2024-06-16", Alerts: 371 },
    { date: "2024-06-17", Alerts: 475 },
    { date: "2024-06-18", Alerts: 107 },
    { date: "2024-06-19", Alerts: 341 },
    { date: "2024-06-20", Alerts: 408 },
    { date: "2024-06-21", Alerts: 169 },
    { date: "2024-06-22", Alerts: 317 },
    { date: "2024-06-23", Alerts: 480 },
    { date: "2024-06-24", Alerts: 132 },
    { date: "2024-06-25", Alerts: 141 },
    { date: "2024-06-26", Alerts: 434 },
    { date: "2024-06-27", Alerts: 448 },
    { date: "2024-06-28", Alerts: 149 },
    { date: "2024-06-29", Alerts: 103 },
    { date: "2024-06-30", Alerts: 446 },
]

const chartConfig = {
    Websites: {
        label: "Websites",
    },
    Alerts: {
        label: "Alerts",
        color: "var(--primary)"
    }
} satisfies ChartConfig;

const AuthenticatedChart = ({token}: Props) => {

    const total = useMemo(
        () => ({
            Alerts: chartData.reduce((acc, curr) => acc += curr.Alerts, 0)
        }),
        []
    )

    return (
        <Card className = "py-0">
            <CardHeader className = "flex flex-col items-stretch border-b !p-0 sm:flex-row">
                <div className = "flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
                    <CardTitle>Website Alerts Chart</CardTitle>
                    <CardDescription>
                        Showing total Alerts for the last 3 months
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
                            right: 12
                        }} 
                    >
                        <CartesianGrid vertical = {false} />
                        <XAxis 
                            dataKey = "date"
                            tickLine = {false}
                            axisLine = {false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric"
                                })
                            }}
                        />
                        <ChartTooltip 
                            content = {
                                <ChartTooltipContent 
                                    className = "w-[150px]"
                                    nameKey="alerts"
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric"
                                        })
                                    }}
                                />
                            }
                        />
                        <Bar dataKey={"Alerts"} fill = {`var(--color-${'Alerts'})`} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}   

export default AuthenticatedChart;