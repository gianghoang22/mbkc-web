export interface PaginationParams {
  totalPage: number;
  numberItems: number;
  searchValue: string;
}

export interface Params<T> {
  data: T;
  navigate: any;
}

export interface ListParams {
  pagination: PaginationParams;
  navigate: any;
}
export interface LoginResponse {
  accountId: number;
  email: string;
  roleName: string;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface MessageResponse {
  message: string;
}

export interface ListResponse<T> {
  totalPage: number;
  numberItems: number;
  data: T[];
}
