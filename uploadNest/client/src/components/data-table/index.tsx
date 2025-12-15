/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  flexRender,
  SortingState,
  VisibilityState,
  ColumnFiltersState,
  RowSelectionState,
  OnChangeFn,
} from "@tanstack/react-table";
import { PlusCircleIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import TableSkeleton from "./table-skeleton-loader";
import { DataTablePagination } from "./table-pagination";
import { EmptyState } from "../empty-state";
import { Card } from "../ui/card";

interface FilterOption {
  key: string;
  label: string;
  options: { value: string; label: string }[];
}

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  searchPlaceholder?: string;
  showSearch?: boolean;
  filters?: FilterOption[];
  className?: string;
  selection?: boolean;
  isLoading?: boolean;
  isShowPagination?: boolean;
  emptyTitle?: string;
  pagination?: {
    totalItems?: number;
    totalPages?: number;
    pageNumber?: number;
    pageSize?: number;
  };
  rowSelection?: Record<string, boolean>; // external rowSelection
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  onSearch?: (term: string) => void;
  onFilterChange?: (filters: Record<string, string>) => void;
  onPageChange?: (pageNumber: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

export function DataTable<TData>({
  data,
  columns,
  searchPlaceholder = "Search...",
  showSearch = true,
  filters = [],
  className,
  onSearch,
  onFilterChange,
  selection = true,
  isLoading = false,
  isShowPagination = true,
  emptyTitle,
  pagination,
  rowSelection,
  onRowSelectionChange,
  onPageChange,
  onPageSizeChange,
}: DataTableProps<TData>) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterValues, setFilterValues] = React.useState<
    Record<string, string>
  >({});
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [internalRowSelection, setInternalRowSelection] = React.useState({});

  const isControlled =
    typeof rowSelection !== "undefined" &&
    typeof onRowSelectionChange === "function";

  const resolvedRowSelection = isControlled
    ? rowSelection!
    : internalRowSelection;

  const handleRowSelectionChange: OnChangeFn<RowSelectionState> = (updater) => {
    const newSelection =
      typeof updater === "function" ? updater(resolvedRowSelection) : updater;

    if (isControlled) {
      onRowSelectionChange?.(newSelection);
    } else {
      setInternalRowSelection(newSelection);
    }
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection: selection ? resolvedRowSelection : {},
    },
    getRowId: (row: any) => row._id,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: selection ? handleRowSelectionChange : undefined,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    onSearch?.(value);
  };

  const handleFilterChange = (key: string, value: string) => {
    const updated = { ...filterValues, [key]: value };
    setFilterValues(updated);
    onFilterChange?.(updated);
  };

  return (
    <div className="w-full">
      {/* Top Bar: Search & Filters */}
      {showSearch || filters.length !== 0 ? (
        <div className="flex flex-wrap justify-between items-center gap-2 pb-4">
          <div className="flex items-center gap-2 flex-wrap flex-1">
            {showSearch && (
              <Input
                placeholder={searchPlaceholder}
                value={searchTerm}
                disabled={isLoading}
                onChange={(e) => handleSearch(e.target.value)}
                className="max-w-sm"
              />
            )}
            {filters.map(({ key, label, options }) => (
              <Select
                key={key}
                value={filterValues[key] ?? ""}
                disabled={isLoading}
                onValueChange={(value) => handleFilterChange(key, value)}
              >
                <SelectTrigger className="min-w-[160px]">
                  <div className="flex items-center gap-2">
                    <PlusCircleIcon className="h-4 w-4 opacity-50" />
                    <SelectValue placeholder={label} />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}
          </div>
        </div>
      ) : null}

      {/* Table */}
      <Card
        className={cn("rounded-md border overflow-x-auto !pt-0", className)}
      >
        {isLoading ? (
          <TableSkeleton columns={6} rows={10} />
        ) : (
          <Table
            className={cn(
              table.getRowModel().rows.length === 0 ? "h-[200px]" : ""
            )}
          >
            <TableHeader className="sticky top-0 bg-muted z-10 ">
              {table.getHeaderGroups().map((group) => (
                <TableRow key={group.id}>
                  {group.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="!font-medium !text-[13px]"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => row.toggleSelected()}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="!text-[13.3px]">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-center h-24"
                  >
                    <EmptyState
                      title={emptyTitle || "No records found"}
                      description=""
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </Card>

      {/* Pagination */}
      {isShowPagination && (
        <div className="mt-4">
          <DataTablePagination
            pageNumber={pagination?.pageNumber || 1}
            pageSize={pagination?.pageSize || 10}
            totalCount={pagination?.totalItems || 0}
            totalPages={pagination?.totalPages || 0}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
        </div>
      )}
    </div>
  );
}
