import { FolderOpen } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { FileCardSkeleton } from "@/components/file-card/skeleton";
import { FileType } from "@/features/files/filesType";
import FileCard from "../../file-card";

type Props = {
  data: FileType[];
  isLoading: boolean;
  selectedFiles: FileType[];
  onToggleSelect: (file: FileType) => void;
};

const GridView = (props: Props) => {
  const { selectedFiles, onToggleSelect, data, isLoading } = props;

  const handleFileSelection = (file: FileType) => {
    onToggleSelect(file);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {isLoading ? (
        Array.from({ length: 10 }).map((_, i) => <FileCardSkeleton key={i} />)
      ) : data.length > 0 ? (
        data.map((file) => {
          const isSelected = selectedFiles.some(
            (selectedFile) => selectedFile._id === file._id
          );
          return (
            <FileCard
              key={file._id}
              file={file}
              isSelected={isSelected}
              toggleFileSelection={handleFileSelection}
            />
          );
        })
      ) : (
        <div className="col-span-5">
          <EmptyState
            title="No Files found"
            description="You haven’t any files. Upload to get started."
            icon={FolderOpen}
          />
        </div>
      )}
    </div>
  );
};

export default GridView;
