"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable, SortingState, getSortedRowModel, ColumnFiltersState, getFilteredRowModel } from "@tanstack/react-table"
import { useState } from "react"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[],
    data: TData[]
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

                    <div className = "flex items-center gap-2">

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
                    </div>
                </TabsContent>
            </Tabs>  
    )
}