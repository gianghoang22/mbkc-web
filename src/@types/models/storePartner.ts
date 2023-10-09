export interface StorePartner {
  storeId: number;
  partnerId: number;
  partnerName: string;
  userName: string;
  password: string;
  status: string;
}

export interface PartnerTransform {
  partnerId: number;
  partnerName: string;
  partnerLogo: string;
  userName: string;
  password: string;
  status: string;
}

export interface StorePartnerTransform {
  storeId: number;
  partnerId: number;
  storeName: string;
  kitchenCenterName: string;
  listPartner: PartnerTransform[];
}

export interface StorePartnerToCreate {
  storeId: number;
  partnerId: number;
  userName: string;
  password: string;
}

export interface StorePartnerToUpdate {
  userName: string;
  password: string;
  status: string;
}
