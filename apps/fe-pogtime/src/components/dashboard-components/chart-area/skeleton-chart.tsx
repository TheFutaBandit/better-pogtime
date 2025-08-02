'use client'

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ChartSkeleton() {
    
  return (
    <Card className="py-0">
      {/* Skeleton for the Card Header */}
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="flex">
          <div className="bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 px-6 py-4 border-t text-left sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      </CardHeader>

      {/* Skeleton for the Card Content and Chart */}
      <CardContent className="px-2 sm:p-6">
        <div className="aspect-auto h-[250px] w-full">
            <div className="flex h-full w-full items-end gap-2 sm:gap-4">
                {/* Create an array of skeletons to represent the bars */}
                {Array.from({ length: 20 }).map((_, i) => (
                    <Skeleton 
                        key={i} 
                        className="h-full w-full" 
                        style={{ height: `50%`}}
                    />
                ))}
            </div>
        </div>
      </CardContent>
    </Card>
  )
}
