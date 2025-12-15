import { ReactNode } from "react";

interface PageHeaderProps {
  title?: string;
  subtitle?: string;
  rightAction?: ReactNode;
}

const PageHeader = ({ title, subtitle, rightAction }: PageHeaderProps) => {
  return (
    <div className="w-full px-5 lg:px-0 dark:text-white">
      <div className="w-full mx-auto">
        <div className="w-full flex flex-col gap-3 items-start justify-start lg:items-center lg:flex-row lg:justify-between">
          {(title || subtitle) && (
            <div className="space-y-1">
              {title && (
                <h1 className="break-normal font-bold text-lg sm:text-2xl">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-muted-foreground text-xs sm:text-sm">
                  {subtitle}
                </p>
              )}
            </div>
          )}
          {rightAction && rightAction}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
