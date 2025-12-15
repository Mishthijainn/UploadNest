/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react";
import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { getCleanAssetType } from "@/lib/format-utils";
import { Checkbox } from "@/components/ui/checkbox";

import {
  FileIcon as FilePdf,
  FileText,
  FileArchive,
  FileImage,
  FileQuestion,
} from "lucide-react";
import { IMAGE_EXTENSIONS } from "@/constant";

// Icons for different file types
const fileTypeIcons: { [key: string]: React.ElementType } = {
  PDF: FilePdf,
  DOCX: FileText,
  TXT: FileText,
  XLSX: FileText,
  PPTX: FileText,
  ZIP: FileArchive,
  RAR: FileArchive,
  TAR: FileArchive,
  JPG: FileImage,
  PNG: FileImage,
  GIF: FileImage,
  SVG: FileImage,
  DEFAULT: FileQuestion,
};

export const listColumns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="!border-black data-[state=checked]:!bg-gray-800 !text-white"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="!border-black data-[state=checked]:!bg-gray-800 !text-white"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "originalName",
    header: "Display Name",
    cell: ({ row }) => {
      const asset = row.original;
      const isImageType = IMAGE_EXTENSIONS.includes(asset.ext.toUpperCase());
      const IconComponent =
        fileTypeIcons[asset.ext.toUpperCase()] || fileTypeIcons.DEFAULT;

      return (
        <div className="flex items-center gap-2 max-w-[350px]">
          <div className="w-13 h-13 flex-shrink-0 flex items-center justify-center rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
            {isImageType ? (
              <img
                src={asset.url || "/placeholder.svg"}
                alt={asset.originalName}
                width={40}
                height={40}
                className="w-full h-full object-cover rounded-md"
              />
            ) : (
              <IconComponent className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            )}
          </div>
          <h5 className="block whitespace-nowrap truncate font-medium">
            {asset.originalName}
          </h5>
        </div>
      );
    },
  },
  {
    accessorKey: "mimeType",
    header: "MimeType",
    cell: ({ row }) => {
      const asset = row.original;
      const cleanAssetType = getCleanAssetType(asset.mimeType, asset.ext);
      return (
        <div className="px-2 py-1 border border-gray-200 bg-gray-100 dark:bg-secondary dark:border-gray-800 text-xs rounded-sm max-w-[180px]">
          {cleanAssetType}
        </div>
      );
    },
  },
  {
    accessorKey: "ext",
    header: "Extension",
    cell: ({ row }) => {
      const extension = row.original?.ext;
      return <span className="uppercase text-sm">{extension}</span>;
    },
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ row }) => {
      const formattedSize = row.original?.formattedSize;
      return <span className="text-sm">{formattedSize}</span>;
    },
  },
  {
    accessorKey: "uploadVia",
    header: "Route",
    cell: ({ row }) => {
      const uploadedVia = row.original?.uploadVia;
      return (
        <div>
          <span className="capitalize text-sm">{uploadedVia}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Uploaded At",
    cell: ({ row }) => format(row.getValue("createdAt"), "MMM dd, yyyy"),
  },
];
