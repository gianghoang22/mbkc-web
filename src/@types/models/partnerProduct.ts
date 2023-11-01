export interface PartnerProduct {
  productId: number;
  partnerId: number;
  storeId: number;
  productName: string;
  partnerName: string;
  storeName: string;
  productCode: string;
  status: string;
  price: number;
  mappedDate: string;
  updatedDate: string;
}

export interface PartnerProductToCreate {
  productId: number;
  partnerId: number;
  storeId: number;
  productCode: string;
  status: string;
  price: number;
}

export interface PartnerProductToUpdate {
  productCode: string;
  status: string;
}

export enum PartnerProductStatusEnum {
  AVAILABLE = 'Available',
  IN_STOCK = 'In_stock',
  OUT_OF_STOCK_TODAY = 'Out of stock today',
  OUT_OF_STOCK_INDEFINITELY = 'Out of stock indefinitely',
}
export enum PartnerProductStatusUpdateEnum {
  AVAILABLE = 'Available',
  IN_STOCK = 'In_stock',
  OUT_OF_STOCK_TODAY = 'Out_of_stock_today',
  OUT_OF_STOCK_INDEFINITELY = 'Out_of_stock_indefinitely',
}

export const PARTNER_PRODUCT_STATUS_OPTIONS = [
  {
    value: PartnerProductStatusEnum.AVAILABLE,
    label: 'Available',
    id: 'In_Stock',
  },
  {
    value: PartnerProductStatusEnum.OUT_OF_STOCK_TODAY,
    label: 'Out of stock today',
    id: 'Out_today',
  },
  {
    value: PartnerProductStatusEnum.OUT_OF_STOCK_INDEFINITELY,
    label: 'Out of stock indefinitely',
    id: 'Out_indefinitely',
  },
];
