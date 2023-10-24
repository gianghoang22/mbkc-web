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
}

export interface PartnerProductToUpdate {
  productCode: string;
}
