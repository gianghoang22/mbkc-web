export interface PartnerProduct {
  productId: number;
  partnerId: number;
  storeId: number;
  productName: string;
  partnerName: string;
  storeName: string;
  productCode: string;
  status: string;
}

export interface PartnerProductToCreate {
  productId: number;
  partnerId: number;
  storeId: number;
  productCode: string;
  status: string;
}

export interface PartnerProductToUpdate {
  productCode: string;
  status: string;
}

export enum PartnerProductStatusEnum {
  AVAILABLE = 'Available',
  IN_STOCK = 'In stock',
  OUT_OF_STOCK_TODAY = 'Out of stock today',
  OUT_OF_STOCK_INDEFINITELY = 'Out of stock indefinitely',
}

export const PARTNER_PRODUCT_STATUS_OPTIONS = [
  {
    value: PartnerProductStatusEnum.IN_STOCK,
    label: PartnerProductStatusEnum.IN_STOCK,
    id: 'In_Stock',
  },
  {
    value: PartnerProductStatusEnum.OUT_OF_STOCK_TODAY,
    label: PartnerProductStatusEnum.OUT_OF_STOCK_TODAY,
    id: 'Out_today',
  },
  {
    value: PartnerProductStatusEnum.OUT_OF_STOCK_INDEFINITELY,
    label: PartnerProductStatusEnum.OUT_OF_STOCK_INDEFINITELY,
    id: 'Out_indefinitely',
  },
];
