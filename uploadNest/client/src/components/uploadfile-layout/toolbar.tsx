import {
  DownloadIcon,
  Grid2X2,
  LinkIcon,
  Table2Icon,
  Trash2Icon,
  XIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { LAYOUT_VIEW, LayoutViewType } from "@/constant";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

type Props = {
  searchTerm: string;
  isLoading: boolean;
  layoutView: LayoutViewType;
  isSelected?: boolean;
  noOfFileselected: number;
  handleLayoutView: (view: LayoutViewType) => void;
  handleSearch: (val: string) => void;
  onClear: () => void;
  onDelete: () => void;
  onCopy: () => void;
  onDownload: () => void;
};

const ToolBar = (props: Props) => {
  const {
    isSelected = false,
    noOfFileselected = 0,
    onClear,
    onDelete,
    onCopy,
    onDownload,
  } = props;
  return (
    <div className="w-full">
      {isSelected ? (
        <div className="pb-4 w-full">
          {/* {Selected tools} */}
          <div
            className="flex py-px flex-1 items-center justify-between  gap-5 flex-wrap 
         bg-secondary dark:bg-secondary border border-gray-200 dark:border-gray-800 rounded-full px-4"
          >
            <div className="flex items-center gap-2">
              <button className="cursor-pointer" onClick={onClear}>
                <XIcon className="w-5 h-5" />
              </button>
              <span className="text-sm font-medium">
                {noOfFileselected} file selected
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="iconsm"
                    variant="ghost"
                    className="!px-0 !cursor-pointer rounded-full hover:!shadow-sm hover:!bg-gray-200 dark:hover:!bg-secondary"
                    onClick={onDownload}
                  >
                    <DownloadIcon className="!w-5 !h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="iconsm"
                    variant="ghost"
                    className="rounded-full !cursor-pointer hover:!shadow-sm hover:!bg-gray-200 dark:hover:!bg-secondary"
                    onClick={onCopy}
                  >
                    <LinkIcon className="!w-5 !h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy link</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="iconsm"
                    variant="ghost"
                    className="rounded-full !cursor-pointer hover:!shadow-sm hover:!bg-gray-200 dark:hover:!bg-secondary"
                    onClick={onDelete}
                  >
                    <Trash2Icon className="!w-5 !h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      ) : (
        <div className="pb-4 flex gap-5 items-center justify-between">
          {/* {Default tools} */}
          <div className="flex items-center gap-2 flex-wrap flex-1">
            <Input
              placeholder="Search for file"
              value={props.searchTerm}
              disabled={props.isLoading}
              onChange={(e) => props.handleSearch(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="w-20 flex items-center gap-1.5 bg-transparent rounded-2xl border border-gray-300 dark:border-gray-700">
            <button
              className={cn(
                "cursor-pointer flex items-center justify-center flex-1 pl-1 !py-[3px] rounded-l-2xl",
                props.layoutView === LAYOUT_VIEW.GRID && "bg-primary text-white"
              )}
              onClick={() => props.handleLayoutView(LAYOUT_VIEW.GRID)}
            >
              <Grid2X2 className="w-5.5 h-5.5 my-px" />
            </button>
            <button
              className={cn(
                "cursor-pointer flex items-center justify-center flex-1 pr-1 !py-[3px] rounded-r-2xl",
                props.layoutView === LAYOUT_VIEW.LIST && "bg-primary text-white"
              )}
              onClick={() => props.handleLayoutView(LAYOUT_VIEW.LIST)}
            >
              <Table2Icon className="w-5.5 h-5.5 my-px" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolBar;
