"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import {ColumnDef} from "@tanstack/react-table";
import { ArrowUpDown, CheckCircle2Icon, CircleMinusIcon, LoaderIcon, MoreHorizontal, TrashIcon } from "lucide-react";

export type Website = {
    url: string,
    region: string,
    response_time: number,
    status: "processing" | "UP" | "DOWN"
}

// components/Loader.jsx

export default function Loader({ width = 24, height = 24 }) {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-live="polite"
        role="status"
        fill = "white"
      >
        <title>Loading...</title>
        <style>{`
          .spinner_S1WN {
            animation: spinner_MGfb .8s linear infinite;
            animation-delay: -.8s;
          }
          .spinner_Km9P {
            animation-delay: -.65s;
          }
          .spinner_JApP {
            animation-delay: -.5s;
          }
          @keyframes spinner_MGfb {
            93.75%, 100% {
              opacity: .2;
            }
          }
        `}</style>
        <circle className="spinner_S1WN" cx="4" cy="12" r="3" />
        <circle className="spinner_S1WN spinner_Km9P" cx="12" cy="12" r="3" />
        <circle className="spinner_S1WN spinner_JApP" cx="20" cy="12" r="3" />
      </svg>
    );
}

interface UserWebsiteColumnsProps {
    onDelete: (Website: Website) => void;
}


export const getUserWebsiteColumns = ({onDelete} : UserWebsiteColumnsProps) : ColumnDef<Website>[] => [
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
                        <Loader />
                    )    
                )}
                {row.original.status}
            </Badge>
        )
    }, 
    {
        id: "actions",
        cell: ({row}) => {
            const website = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant = "ghost" className = "h-8 w-8 p-0">
                            <span className = "sr-only">Open menu</span>
                            <MoreHorizontal className = "h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align = "end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick = {() => onDelete(row.original)}
                        >
                            <TrashIcon /> Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]
    





