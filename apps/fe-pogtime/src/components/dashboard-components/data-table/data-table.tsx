"use client"

import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable, SortingState, getSortedRowModel, ColumnFiltersState, getFilteredRowModel } from "@tanstack/react-table"
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon, CircleQuestionMarkIcon } from "lucide-react"
import { useState } from "react"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[],
    data: TData[]
}

// const placeholderData: Wesbite[] = [
//     {
//       url: "https://example.com",
//       region: "North America",
//       response_time: 120,
//       status: "UP",
//     },
//     {
//       url: "https://example.org",
//       region: "Europe",
//       response_time: 250,
//       status: "DOWN",
//     },
//     {
//       url: "https://example.net",
//       region: "Asia",
//       response_time: 300,
//       status: "processing",
//     },
//     {
//       url: "https://example.co",
//       region: "South America",
//       response_time: 180,
//       status: "UP",
//     },
//     {
//       url: "https://example.io",
//       region: "Africa",
//       response_time: 400,
//       status: "DOWN",
//     },
//   ];

export function HoverCardFn() {
    return (
        <HoverCard openDelay={10}>
            <HoverCardTrigger asChild>
                <CircleQuestionMarkIcon height = {24} width = {24} strokeWidth={2} className="text-muted-foreground p-0 cursor-pointer"/>
            </HoverCardTrigger>
            <HoverCardContent className = "w-50 mr-7 p-2 " sideOffset={5} alignOffset={-100} >
                <div className = "px-2 text-sm">Latest website ticks polling every 3 minutes.</div>
            </HoverCardContent>
        </HoverCard>
    )
}

export function DataTable<TData, TValue>({
    columns,
    data
} : DataTableProps<TData, TValue> ) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            rowSelection
        }
    })

    {/* <div className = "flex items-center py-4">
            <Input 
                placeholder = "Filter Website..."
                value={(table.getColumn("url")?.getFilterValue() as string) ?? ""}
                onChange = {(event) => 
                    table.getColumn("url")?.setFilterValue(event.target.value)
                }
                className = "max-w-sm"
            />
        </div> */}

    return ( 
            <Tabs 
                defaultValue="outline"
                className = "flex w-full flex-col justify-start gap-6"
            >
                <div className = "flex items-center justify-between px-4 lg:px-6">
                    <Label htmlFor = "view-selector" className="sr-only">
                        View
                    </Label>
                    <TabsList className = "hidden">
                        <TabsTrigger value = "outline">Outline</TabsTrigger>
                    </TabsList>

                    <div className = "flex items-center justify-between w-full">
                        <Input 
                            placeholder="Filter Websites"
                            value = {(table.getColumn("url")?.getFilterValue() as string) ?? ""}
                            onChange={(event) => 
                                table.getColumn("url")?.setFilterValue(event.target.value)
                            }
                            className = "w-[250px]"
                        />
                        <HoverCardFn />
                    </div>  
                </div>
                <TabsContent 
                    value = "outline"
                    className = "relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
                >
                    <div className = "overflow-hidden rounded-lg border">
                    <Table>
                        <TableHeader className = "sticky top-0 z-10 bg-muted">
                            {
                                table.getHeaderGroups().map((headerGroup) => {
                                    return (
                                        <TableRow key = {headerGroup.id}>
                                            {headerGroup.headers.map((header) => {
                                                return (
                                                    <TableHead key = {header.id}>
                                                        {header.isPlaceholder
                                                            ? null
                                                            : flexRender(
                                                                header.column.columnDef.header,
                                                                header.getContext()
                                                            )}
                                                    </TableHead>
                                                )
                                            })}
                                        </TableRow>
                                    )
                                })
                            }
                        </TableHeader>
                        <TableBody className = "**:data-[slot=table-cell]:first:w-8">
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key = {row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key = {cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan = {columns.length} className = "h-24 text-center">
                                        No Results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    </div>
                    <div className = "flex items-center justify-between px-4">
                        <div className = "hidden flex-1 text-sm text-muted-foreground lg:flex">
                            {table.getFilteredSelectedRowModel().rows.length} of{" "}
                            {table.getFilteredRowModel().rows.length} row(s) selected.
                        </div>
                        <div className = "flex w-full items-center gap-8 lg:w-fit">
                            <div className = "flex w-fit items-center justify-center text-sm font-medium">
                                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                            </div>
                            <div className = "ml-auto flex items-center gap-2 lg:ml-0">
                                <Button
                                    variant = "outline"
                                    className = "hidden h-8 w-8 p-0 lg:flex"
                                    onClick = {() => table.setPageIndex(0)}
                                    disabled = {!table.getCanPreviousPage()}
                                >
                                    <ChevronsLeftIcon />
                                </Button>
                                <Button
                                    variant = "outline"
                                    className = "size-8"
                                    size="icon"
                                    onClick = {() => table.previousPage()}
                                    disabled = {!table.getCanPreviousPage()}
                                >
                                    <ChevronLeftIcon />
                                </Button>
                                <Button
                                    variant = "outline"
                                    className = "size-8"
                                    size="icon"
                                    onClick = {() => table.nextPage()}
                                    disabled = {!table.getCanNextPage()}
                                >
                                    <ChevronRightIcon />
                                </Button>
                                <Button
                                    variant = "outline"
                                    className = "hidden size-8 lg:flex"
                                    size="icon"
                                    onClick = {() => table.setPageIndex(table.getPageCount() -1)}
                                    disabled = {!table.getCanNextPage()}
                                >
                                    <ChevronsRightIcon />
                                </Button>
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>  
    )
}