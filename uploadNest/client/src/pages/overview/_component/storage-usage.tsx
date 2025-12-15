import { Progress } from "@/components/ui/progress";

interface StorageUsageProps {
  usage: number; // in bytes
  quota: number;
  formattedUsage: string;
  formattedQuota: string;
}

const StorageUsage = ({
  usage,
  quota,
  formattedUsage,
  formattedQuota,
}: StorageUsageProps) => {
  const percentage = quota > 0 ? (usage / quota) * 100 : 0;

  return (
    <div className="pt-3">
      <div className="flex items-center p-6 pt-0 flex-col gap-2">
        <Progress
          value={percentage}
          max={100}
          className="relative h-4 w-full overflow-hidden rounded-full"
        />
        <span className="font-semibold text-muted-foreground text-[13px]">
          {formattedUsage} / {formattedQuota} used
        </span>
      </div>
    </div>
  );
};

export default StorageUsage;
