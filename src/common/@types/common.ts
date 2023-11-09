import { NavigateFunction } from 'react-router-dom';

export interface OptionParams {
  keySearchName?: string | null;
  searchValue?: string | null;
  searchName?: string | null;
  itemsPerPage?: number | null | string;
  currentPage?: number | null | string;
  isGetAll?: boolean | null | string;
  status?: boolean | null | string;
  type?: boolean | null | string;
  idBrand?: null | number | string;
  idKitchenCenter?: null | number | string;
  idCategory?: null | number | string;
  idStore?: null | number | string;
  sortBy?: string | null;
  keySortName?: string | null;
  keySortCode?: string | null;
  keySortStatus?: string | null;
  keySortCommission?: string | null;
  systemStatus?: string | null;
  partnerOrderStatus?: string | null;
  isUpdateStatus?: boolean;
  searchDateFrom?: Date | string | null;
  searchDateTo?: Date | string | null;
  exchangeType?: string | null;
}

export interface IdParams {
  kitchenCenterId?: number;
  brandId?: number;
  storeId?: number;
  categoryId?: number;
  productId?: number;
  partnerId?: number;
  accountId?: number;
  cashierId?: number;
  bankingAccountId?: number;
  orderId?: number;
}

export interface ListParams {
  optionParams: OptionParams;
  navigate: NavigateFunction;
}

export interface OneModelParams {
  idParams: IdParams;
  navigate: NavigateFunction;
}

export interface Params<T> {
  data?: T;
  pathname?: string;
  idParams?: IdParams;
  optionParams?: OptionParams;
  navigate: NavigateFunction;
}

export interface LoginResponse {
  accountId: number;
  email: string;
  roleName: string;
  isConfirmed: boolean;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface MessageResponse {
  message: string;
}

export interface ListResponse<T> {
  totalPages: number;
  numberItems: number;
  data: T[];
}

export interface ListResponseAddress<T> {
  results: T[];
}

export interface WordLimited {
  wordString: string;
  lengthLimit: number;
  end?: string;
}

export interface OptionSelect {
  value: string;
  label: string;
  id: string;
}

export interface ErrorResponse {
  errorMessage: string;
  statusCode: number;
}
