export interface StorePartnerDetail {
  storeId: number;
  partnerId: number;
  partnerLogo: string;
  partnerName: string;
  userName: string;
  password: string;
  status: string;
}

export interface StorePartner {
  storeId: number;
  storeName: string;
  kitchenCenterName: string;
  storePartners: PartnerInStore[];
}

export interface PartnerInStore {
  partnerId: number;
  partnerName: string;
  partnerLogo: string;
  userName: string;
  password: string;
  status: string;
}

export interface StorePartnerToCreate {
  storeId: number;
  partnerAccountRequests: PartnerAccount[];
}

interface PartnerAccount {
  partnerId: number;
  userName: string;
  password: string;
}

export interface StorePartnerToUpdate {
  userName: string;
  password: string;
}

export interface StorePartnerToUpdateApi {
  userName: string;
  password: string;
  status: string;
}
