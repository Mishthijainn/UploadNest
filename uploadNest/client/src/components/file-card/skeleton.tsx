import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const FileCardSkeleton = () => {
  return (
    <Card className="relative !p-0 rounded-lg border border-border animate-pulse">
      {/* Checkbox Placeholder */}
      <div className="absolute top-3 left-3 z-10">
        <Skeleton className="size-6 rounded-sm bg-muted" />
      </div>

      {/* Image/File Preview Area */}
      <Skeleton className="aspect-auto relative h-72 rounded-lg overflow-hidden" />

      {/* File Info Overlay */}
      <div className="px-4 w-full pb-2 absolute inset-x-0 -bottom-0 z-[50] backdrop-blur-sm bg-gradient-to-t from-black/30 to-black/5 text-white rounded-b-lg">
        <div className="pt-2 space-y-2">
          <Skeleton className="h-4 w-3/4 rounded-sm bg-muted-foreground/30" />
          <Skeleton className="h-3 w-1/4 rounded-sm bg-muted-foreground/20" />
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-8 rounded bg-muted-foreground/20" />
            <Skeleton className="h-3 w-10 rounded bg-muted-foreground/20" />
          </div>
        </div>
      </div>
    </Card>
  );
};
