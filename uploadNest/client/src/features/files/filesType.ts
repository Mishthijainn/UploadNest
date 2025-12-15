export interface Params {
  keyword?: string;
  pageNumber?: number;
  pageSize?: number;
}

export interface UploadResponse {
  message: string;
  data: {
    fileId: string;
    url: string;
    originalName: string;
    size: number;
    ext: string;
    mimeType: string;
  }[];
  failedCount: number;
}

export interface FileType {
  _id: string;
  userId: string;
  originalName: string;
  size: number;
  formattedSize: string;
  ext: string;
  mimeType: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  id?: string;
  uploadedVia: "WEB" | "API";
}
export interface GetAllFilesResponse {
  message: string;
  files: FileType[];
  pagination: {
    pageSize: number;
    pageNumber: number;
    totalCount: number;
    totalPages: number;
    skip: number;
  };
}
export interface DeleteFilesResponse {
  message: string;
  deletedCount: number;
  failedCount: number;
}

export interface DownloadFilesResponse {
  message: string;
  downloadUrl: string;
  isZip: boolean;
}
