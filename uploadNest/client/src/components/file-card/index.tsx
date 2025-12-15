import {
  Folder,
  FileText,
  FileIcon as FilePdf,
  FileArchive,
  FileImage,
  FileQuestion,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import { FileType } from "@/features/files/filesType";
import { IMAGE_EXTENSIONS } from "@/constant";

interface FileCardProps {
  file: FileType;
  isSelected: boolean;
  toggleFileSelection: (file: FileType) => void;
}

// Map file types to Lucide React icons
const fileTypeIcons: { [key: string]: React.ElementType } = {
  PDF: FilePdf,
  DOCX: FileText,
  TXT: FileText,
  XLSX: FileText, // Using FileText for general documents, could be more specific
  PPTX: FileText,
  ZIP: FileArchive,
  RAR: FileArchive,
  TAR: FileArchive,
  JPG: FileImage,
  PNG: FileImage,
  GIF: FileImage,
  SVG: FileImage,
  // Add more as needed
  DEFAULT: FileQuestion, // Fallback for unknown types
};

const FileCard = ({ file, isSelected, toggleFileSelection }: FileCardProps) => {
  const isImageType = IMAGE_EXTENSIONS.includes(file.ext.toUpperCase());

  const IconComponent =
    fileTypeIcons[file.ext.toUpperCase()] || fileTypeIcons.DEFAULT;

  return (
    <Card
      className={`group relative !p-0 rounded-lg border border-border transition-all duration-200 hover:shadow-md ${
        isSelected
          ? "bg-primary/5 dark:bg-primary/20 ring-2 ring-primary/60 dark:ring-primary/60 border-primary/30"
          : "hover:border-border/60"
      }`}
      onClick={() => toggleFileSelection(file)}
    >
      <div className="absolute top-3 left-3 z-10">
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => toggleFileSelection(file)}
          className={cn(
            "backdrop-blur-sm cursor-pointer border dark:border-gray-300 shadow-sm size-6 bg-white",
            isSelected && "dark:border-inherit"
          )}
        />
      </div>

      {/* Image Container */}
      <div className="aspect-auto relative !overflow-hidden h-72 rounded-lg ">
        <div className="flex flex-col items-center h-full transition-transform duration-200 group-hover:scale-105 bg-muted/80">
          {isImageType && file.url ? (
            <img
              src={file.url || "/placeholder.svg"}
              alt={file.originalName}
              className="w-full h-full object-contain"
            />
          ) : isImageType && !file.url ? (
            <img
              src={"/placeholder.png"}
              alt={file.originalName}
              className="w-full h-full object-cover"
            />
          ) : (
            <IconComponent className="w-24 h-24 text-muted-foreground mt-16" />
          )}
        </div>

        {/* File Info Overlay */}
        <div className="px-4 w-full pb-2 absolute inset-x-0 -bottom-0 z-[50] backdrop-blur-sm bg-gradient-to-t from-black/50 dark:from-black/90 to-black/[1px] text-white rounded-b-lg">
          <div className="pt-2">
            <h3 className="font-medium text-sm mb-1 truncate">
              {file.originalName}
            </h3>
            <div className="flex items-center gap-1 text-gray-300 text-xs mb-1">
              <Folder className="w-3 h-3" />
              <span>/</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge
                variant="secondary"
                className="bg-secondary/80 text-secondary-foreground text-xs !py-[0.1px] font-medium"
              >
                {file.ext?.toUpperCase()}
              </Badge>
              <span className="text-gray-300 text-xs font-medium">
                {file.formattedSize}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FileCard;
