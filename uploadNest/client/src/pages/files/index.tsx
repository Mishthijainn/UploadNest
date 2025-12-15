import PageLayout from "@/components/page-layout";
import { Button } from "@/components/ui/button";
import UploadFileLayout from "@/components/uploadfile-layout";
import { UploadCloud } from "lucide-react";
import { FileUploaderDialog } from "./_component/fileuploader-dialog";

const Files = () => {
  return (
    <PageLayout
      title="Files"
      subtitle="These are all of the files that have been uploaded via your uploader."
      rightAction={
        <FileUploaderDialog>
          <Button className="!pr-7">
            <UploadCloud />
            Upload
          </Button>
        </FileUploaderDialog>
      }
    >
      <div className="w-full">
        <UploadFileLayout
          showToolBar
          isShowPagination={true}
          pageSize={20}
          layoutView="GRID"
        />
      </div>
    </PageLayout>
  );
};

export default Files;
