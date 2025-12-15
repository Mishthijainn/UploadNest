import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UploadFileLayout from "@/components/uploadfile-layout";
import { LAYOUT_VIEW } from "@/constant";
import { PROTECTED_ROUTES } from "@/routes/common/routePath";
import { Link } from "react-router-dom";

const RecentUploads = () => {
  return (
    <Card className="!gap-4">
      <CardHeader className="!pb-0 w-full flex items-center justify-center">
        <CardTitle className="flex-1">Recent Uploads</CardTitle>
        <Link
          to={PROTECTED_ROUTES.FILES}
          className="underline text-sm text-muted-foreground"
        >
          View all
        </Link>
      </CardHeader>
      <CardContent>
        <UploadFileLayout
          showToolBar={false}
          isShowPagination={false}
          layoutView={LAYOUT_VIEW.LIST}
        />
      </CardContent>
    </Card>
  );
};

export default RecentUploads;
