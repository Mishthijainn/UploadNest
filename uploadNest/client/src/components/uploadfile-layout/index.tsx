import { useState } from "react";
import GridView from "./grid-view/grid-view";
import ListView from "./list-view/list-view";
import ToolBar from "./toolbar";
import useDebouncedSearch from "@/hooks/use-debounce-search";
import { LAYOUT_VIEW, LayoutViewType } from "@/constant";
import { toast } from "sonner";
import { FileType } from "@/features/files/filesType";
import {
  useDeleteFilesMutation,
  useDownloadFilesMutation,
  useGetAllFilesQuery,
} from "@/features/files/filesAPI";

type Props = {
  layoutView: LayoutViewType;
  isShowPagination: boolean;
  showToolBar: boolean;
  pageSize?: number;
};

const UploadFileLayout = (props: Props) => {
  const {
    layoutView = LAYOUT_VIEW.GRID,
    isShowPagination,
    showToolBar = true,
  } = props;

  const [filter, setFilter] = useState({
    pageNumber: 1,
    pageSize: props.pageSize || 10,
  });

  const [_layoutView, setLayoutView] = useState<LayoutViewType>(layoutView);
  const [selectedFiles, setSelectedFiles] = useState<FileType[]>([]);

  const { debouncedTerm, searchTerm, setSearchTerm } = useDebouncedSearch("", {
    delay: 500,
  });

  const [downloadFiles, { isLoading: isDownloading }] =
    useDownloadFilesMutation();
  const [deleteFiles, { isLoading: isDeleting }] = useDeleteFilesMutation();

  const { data, isLoading, isFetching } = useGetAllFilesQuery({
    keyword: debouncedTerm,
    pageNumber: filter.pageNumber,
    pageSize: filter.pageSize,
  });

  const fileData = data?.files || [];

  const pagination = {
    totalCount: data?.pagination.totalCount || 0,
    totalPages: data?.pagination.totalPages || 0,
    pageNumber: filter.pageNumber,
    pageSize: filter.pageSize,
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleLayoutView = (view: LayoutViewType) => {
    setLayoutView(view);
  };

  const handleToggleSelected = (file: FileType) => {
    const isSelected = selectedFiles.find((f) => f._id === file._id);
    if (isSelected) {
      setSelectedFiles((prev) => prev.filter((f) => f._id !== file._id));
    } else {
      setSelectedFiles((prev) => [...prev, file]);
    }
  };

  const handleClear = () => {
    setSelectedFiles([]);
  };

  const handleCopy = () => {
    const urls = selectedFiles
      .map((file) => {
        return `${import.meta.env.VITE_BASE_API_URL}/files/${file._id}/view`;
      })
      .join("\n");
    navigator.clipboard
      .writeText(urls)
      .then(() => {
        setSelectedFiles([]);
        toast.success(`Copied ${selectedFiles.length} file url `);
      })
      .catch(() => {
        toast.error("Failed to copy links");
      });
  };

  const handleDelete = () => {
    if (isDeleting) return;
    const fileIds = selectedFiles?.map((file) => file._id);
    if (!fileIds.length) {
      toast.error("No file selected");
      return;
    }

    const toastId = toast.loading(
      `Deleting ${fileIds.length} selected file(s)...`
    );
    deleteFiles(fileIds)
      .unwrap()
      .then((res) => {
        toast.dismiss(toastId);
        if (res.failedCount > 0) {
          toast.warning(
            `Deleted ${res.deletedCount} file(s). ${res.failedCount} failed.`,
            { description: "Some files could not be deleted." }
          );
        } else {
          toast.success(`Successfully deleted ${res.deletedCount} file(s).`);
        }
        setSelectedFiles([]);
      })
      .catch(() => {
        toast.dismiss(toastId);
        toast.error("Failed to delete files. Please try again.");
      });
  };

  const handleDowload = () => {
    if (isDownloading) return;
    const fileIds = selectedFiles?.map((file) => file._id);
    if (!fileIds.length) {
      toast.error("No file selected");
      return;
    }

    const toastId = toast.loading("Preparing your download...", {
      duration: Infinity,
    });

    downloadFiles(fileIds)
      .unwrap()
      .then((res) => {
        toast.dismiss(toastId);
        if (res.downloadUrl) {
          const link = document.createElement("a");
          link.href = res.downloadUrl;
          link.download = "";
          document.body.appendChild(link);
          link.click();
          link.remove();

          const message = res.isZip
            ? "Zip file is downloading..."
            : "Your file is downloading...";

          toast.success(
            <>
              {message}
              <br />
              If it doesn't start,{" "}
              <a
                href={res.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline !text-black"
              >
                click here
              </a>
            </>
          );
        } else {
          toast.error("Download URL missing");
        }
      })
      .catch(() => {
        toast.dismiss(toastId);
        toast.error("Download failed Try again");
      })
      .finally(() => {
        setSelectedFiles([]);
      });
  };

  return (
    <div>
      {showToolBar && (
        <ToolBar
          layoutView={_layoutView}
          searchTerm={searchTerm}
          isLoading={false}
          isSelected={selectedFiles?.length > 0 || false}
          noOfFileselected={selectedFiles?.length}
          handleSearch={handleSearch}
          handleLayoutView={handleLayoutView}
          onClear={handleClear}
          onDelete={handleDelete}
          onCopy={handleCopy}
          onDownload={handleDowload}
        />
      )}
      <div className="mt-1">
        {_layoutView === LAYOUT_VIEW.LIST ? (
          <ListView
            data={fileData}
            isLoading={isLoading}
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
            isShowPagination={isShowPagination}
            pagination={pagination}
            setPagination={setFilter}
          />
        ) : (
          <GridView
            data={fileData}
            isLoading={isFetching}
            selectedFiles={selectedFiles}
            onToggleSelect={handleToggleSelected}
          />
        )}
      </div>
    </div>
  );
};

export default UploadFileLayout;
