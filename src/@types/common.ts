export interface LoginResponse {
  accountId: number;
  email: string;
  roleName: string;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface PaginationParams {
  _limit: number;
  _page: number;
  _total: number;
}

export interface ListResponse<T> {
  data: T[];
  pagination: PaginationParams;
}

export interface ListParams {
  _limit: number;
  _page: number;
  _sort: number;
  _order: 'asc' | 'desc';

  [key: string]: any;
}
