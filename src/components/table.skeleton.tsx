import { Skeleton } from "@/components/ui/skeleton"


export function TableSkeleton() {
  return (
    <div className="flex w-full flex-col gap-2 p-5 ">
      {Array.from({ length: 10 }).map((_, index) => (
        <div className="flex gap-4" key={index}>
          <Skeleton className="size-10 shrink-0 rounded-full bg-muted-foreground/18" />
          <Skeleton className="h-5vh w-3/10 bg-muted-foreground/18" />
          <Skeleton className="h-5vh w-5/10 bg-muted-foreground/18" />
          <Skeleton className="h-5vh w-2/10 bg-muted-foreground/18" />
        </div>
      ))}
    </div>
  )
}
