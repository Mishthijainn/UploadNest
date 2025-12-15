export interface FilterParams {
  preset?: string;
  from?: string;
  to?: string;
}

export interface ChartDataType {
  date: string;
  usages: number; // Usage in bytes
  formatedUsages?: string;
  uploadedFiles?: number;
}

export interface UserAnalyticsAndChartResponse {
  message: string;
  chart: ChartDataType[];
  totaluploadFilesForPeriod: number; // Total files uploaded in period
  totalUsageForPeriod: string; // Total usage (formatted: "1.2 MB")
  storageUsageSummary: {
    totalUsage: number;
    quota: number; // Storage limit allowed in bytes
    formattedTotalUsage: string; // Formatted current usage
    formattedQuota: string; // Formatted storage limit
  };
}
