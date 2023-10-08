export interface StorePartner {
  storeId: number;
  partnerId: number;
  partnerName: string;
  userName: string;
  password: string;
  status: string;
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
