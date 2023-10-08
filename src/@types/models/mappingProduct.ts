export interface MappingProduct {
  productId: number;
  partnerId: number;
  storeId: number;
  productName: string;
  partnerName: string;
  storeName: string;
  productCode: string;
}

export interface MappingProductToCreate {
  productId: number;
  partnerId: number;
  storeId: number;
  productCode: string;
}

export interface MappingProductToUpdate {
  productCode: string;
}
