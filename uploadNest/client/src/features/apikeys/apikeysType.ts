export interface Params {
  pageNumber?: number;
  pageSize?: number;
}

export interface CreateApiKeyResponse {
  message: string;
  key: string;
}

export interface ApiKeyType {
  _id: string;
  userId: string;
  name: string;
  displayKey: string;
  lastUsedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GetAllApiKeysResponse {
  message: string;
  apiKeys: ApiKeyType[];
  pagination: {
    pageSize: number;
    pageNumber: number;
    totalCount: number;
    totalPages: number;
    skip: number;
  };
}
