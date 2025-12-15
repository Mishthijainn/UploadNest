/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileUploader, type FileUploaderRef } from "@/components/file-uploader";
import { useUploadFilesMutation } from "@/features/files/filesAPI";
import { toast } from "sonner";

export const FileUploaderDialog = (props: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // Use File[] directly
  const fileUploaderRef = useRef<FileUploaderRef>(null);

  const [uploadFiles] = useUploadFilesMutation();

  const handleUploadButtonClick = () => {
    if (selectedFiles.length === 0) {
      toast.info("Please select files to upload");
      return;
    }

    setIsOpen(false);

    const totalFiles = selectedFiles.length;
    const toastId = toast.loading(`Uploading ${totalFiles} file(s)...`, {
      description: "Please wait while we upload youtr files",
      duration: Infinity,
    });

    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("files", file));

    uploadFiles(formData)
      .unwrap()
      .then((res) => {
        const successCount = res.data.length;
        const failedCount = res.failedCount || 0;
        toast.success(
          `Uploaded ${successCount} file(s) successfully ` +
            (failedCount > 0 ? `${failedCount} failed` : ""),
          {
            id: toastId,
            description: `Your files are now avalable`,
          }
        );
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to upload files", {
          id: toastId,
          description: "Please try again later",
        });
      })
      .finally(() => {
        toast.dismiss(toastId);
        fileUploaderRef.current?.clearSelectedFiles();
        setSelectedFiles([]);
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className="w-full sm:max-w-[600px] p-6">
        <DialogHeader>
          <DialogTitle>Upload files</DialogTitle>
        </DialogHeader>
        <div className="py-4 w-full">
          <FileUploader
            ref={fileUploaderRef}
            onFilesSelected={setSelectedFiles} // Update dialog's state with selected files
            maxFileSize={100 * 1024 * 1024} // 100MB
            acceptedFileTypes={{
              "image/*": [".jpeg", ".png", ".gif", ".svg", ".jpg"],
              "application/pdf": [".pdf"],
              "application/msword": [".doc"],
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                [".docx"],
              "application/vnd.ms-excel": [".xls"],
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                [".xlsx"],
              "application/vnd.ms-powerpoint": [".ppt"],
              "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                [".pptx"],
              "application/zip": [".zip"],
              "application/x-rar-compressed": [".rar"],
              "application/x-tar": [".tar"],
              "text/plain": [".txt"],
            }}
          />
        </div>
        <div className="flex justify-end pt-4">
          <Button
            onClick={handleUploadButtonClick}
            className="hover:bg-primay/80 cursor-pointer text-white w-full disabled:opacity-80 disabled:cursor-not-allowed"
            disabled={selectedFiles.length === 0}
          >
            Upload
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
