import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function TableSkeleton() {
  // Create an array to easily render multiple skeleton rows
  const skeletonRows = Array(5).fill(0);

  return (
    // Replicate the exact same parent structure as your DataTable component
    <div className="flex w-full flex-col justify-start gap-6">
      <div className="flex items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-2">
          {/* You can add skeletons for filters here if you have them */}
        </div>
      </div>

      <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
        {/* The table itself */}
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-muted">
              <TableRow>
                <TableHead><Skeleton className="h-5 w-full" /></TableHead>
                <TableHead><Skeleton className="h-5 w-full" /></TableHead>
                <TableHead><Skeleton className="h-5 w-full" /></TableHead>
                <TableHead><Skeleton className="h-5 w-full" /></TableHead>
                <TableHead><Skeleton className="h-5 w-full" /></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {skeletonRows.map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Skeleton for the pagination footer */}
        <div className="flex items-center justify-between px-4">
          <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
            <Skeleton className="h-5 w-32" />
          </div>
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              <Skeleton className="h-5 w-24" />
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Skeleton className="hidden h-8 w-8 p-0 lg:flex" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="hidden h-8 w-8 p-0 lg:flex" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
