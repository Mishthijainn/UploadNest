/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { Loader, MoreHorizontal, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useDeleteApiKeyMutation } from "@/features/apikeys/apikeysAPI";
import { toast } from "sonner";

export const apiKeysColumns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span>{row.original?.name}</span>,
  },
  {
    accessorKey: "displayKey",
    header: "Display Key",
    cell: ({ row }) => {
      const displayKey = row.original?.displayKey;
      const maskedKey = displayKey.endsWith("...")
        ? displayKey.replace(/\.\.\.$/, "")
        : displayKey;
      return (
        <div
          className="relative px-2 h-8 border rounded-sm bg-muted overflow-hidden whitespace-nowrap
          max-w-[185px] flex items-center
        "
        >
          <span className="relative z-20">{maskedKey}</span>
          <span
            className="whitespace-nowrap block mt-4 -ml-[0.5px]"
            aria-hidden="true"
          >
            ********************
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => format(row.getValue("createdAt"), "MMM dd, yyyy"),
  },
  {
    accessorKey: "lastUsedAt",
    header: "Last Used",
    cell: ({ row }) => {
      const lastUsedAt = row.original?.lastUsedAt;
      return (
        <span>{lastUsedAt ? format(lastUsedAt, "MMM dd, yyyy") : "Never"}</span>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <ActionsCell row={row} />,
  },
];

// eslint-disable-next-line react-refresh/only-export-components
const ActionsCell = ({ row }: { row: any }) => {
  const apiKeyId = row.original._id;
  const [deleteApiKey, { isLoading: isDeleting }] = useDeleteApiKeyMutation();

  const handleDelete = () => {
    if (!apiKeyId) return;
    deleteApiKey(apiKeyId)
      .unwrap()
      .then(() => {
        toast.success("Apikey deleted successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to deleted apikey");
      });
  };
  return (
    <DropdownMenu modal>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-44"
        align="end"
        onCloseAutoFocus={(e: { preventDefault: () => void }) => {
          e.preventDefault();
        }}
      >
        <DropdownMenuItem
          className="relative !text-red-500 !font-medium"
          disabled={isDeleting}
          onSelect={(e: Event) => {
            e.preventDefault();
            handleDelete();
          }}
        >
          <Trash2 className="mr-1 h-4 w-4 !text-red-500" />
          Delete
          {isDeleting && (
            <Loader className="ml-1 h-4 w-4 absolute right-2 animate-spin" />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
