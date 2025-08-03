import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// A helper component for a single skeleton card. Not exported.
function SingleCardSkeleton() {
    return (
        <Card className="@container/card">
            <CardHeader className="relative">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="@[250px]/card:h-9 h-7 w-36" />
                <div className="absolute right-4 top-4">
                    <Skeleton className="h-7 w-16 rounded-lg" />
                </div>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-48" />
            </CardFooter>
        </Card>
    )
}

// This component provides the full skeleton layout for the section.
export function SkeletonCard() {
    return (
        <div
            className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-2 grid grid-cols-2 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6"
        >
            <SingleCardSkeleton />
            <SingleCardSkeleton />
        </div>
    )
}


export default SkeletonCard;

