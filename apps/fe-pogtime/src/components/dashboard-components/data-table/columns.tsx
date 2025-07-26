"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import {ColumnDef} from "@tanstack/react-table";
import { ArrowUpDown, CheckCircle2Icon, CircleMinusIcon, LoaderIcon } from "lucide-react";

export type Website = {
    url: string,
    region: string,
    response_time: number,
    status: "processing" | "UP" | "DOWN"
}

export const columns: ColumnDef<Website>[] = [
    {
        id: "select",
        header: ({table}) => {
            <div className="flex items-center justify-center">
                <Checkbox
                    checked = {
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="select all"
                />
            </div>
        },
        cell: ({row}) => (
            <div className = "flex items-center justify-center">
                <Checkbox 
                    checked = {row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false
    },
    {
        accessorKey: "url",
        header: ({column}) => {
            return (
                <Button
                variant="ghost"
                onClick = {() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Website
                    <ArrowUpDown className = "ml-2 h-4 w-4" />
                </Button>
            )
        }
    },
    {
        accessorKey: "region",
        header: "Region"
    },
    {
        accessorKey: "response_time",
        header: () => <div className = "">Response Time</div>,
        cell: ({row}) => {
            const time = row.getValue("response_time") as number
            return <div className = "font-medium">{time}ms</div>
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({row}) => (
            <Badge
                variant = "outline"
                className = "flex gap-1 px-1.5 text-muted-foreground [&_svg]:size-3"
            >
                {row.original.status === 'UP' ? (
                    <CheckCircle2Icon className = "text-green-500 dark:text-green-400" />
                ) : (row.original.status === 'DOWN' ? (
                    <CircleMinusIcon className = "text-red-500 dark:text-red-400" />
                    ) : (
                        <LoaderIcon />
                    )    
                )}
                {row.original.status}
            </Badge>
        )
    }
]

