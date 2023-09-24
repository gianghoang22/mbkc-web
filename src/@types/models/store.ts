export interface Store {
  storeId: number;
  name: string;
  logoUrl: string;
  kitchenCenter: string;
  brand: string;
  partner: number;
  status: string;
}

export interface StoreToAdd {
  name: string;
  logoUrl: string;
  kitchenCenter: string;
  brand: string;
}

export const CREATE_STORE_KITCHEN_CENTERS_OPTIONS = [
  {
    value: 'dong_khoi',
    label: 'Đồng Khởi',
    id: 'dk',
  },
  {
    value: 'mac_dinh_chi',
    label: 'Mạc Đỉnh Chi',
    id: 'mdc',
  },
];

export const CREATE_STORE_BRANDS_OPTIONS = [
  {
    value: 'starbucks',
    label: 'Starbucks',
    id: 'star',
  },
  {
    value: 'highlands',
    label: 'Highlands',
    id: 'high',
  },
];
