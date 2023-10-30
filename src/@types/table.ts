import { Brand } from './models/brand';
import { KitchenCenter } from './models/kitchenCenter';

export type OrderSort = 'asc' | 'desc';

export enum OrderSortBy {
  NAME = 'name',
  LOGO = 'logo',
  LOGO_URL = 'logoUrl',
  IMAGE = 'image',
  IMAGE_URL = 'imageUrl',
  AVATAR = 'avatar',
  DISPLAY_ORDER = 'displayOrder',
  SELLING_PRICE = 'sellingPrice',
  DISCOUNT_PRICE = 'discountPrice',
  HISTORICAL_PRICE = 'historicalPrice',
  ADDRESS = 'address',
  FULL_NAME = 'fullName',
  TYPE = 'type',
  CATEGORY = 'category',
  PRODUCT_NAME = 'productName',
  PRODUCT_CODE = 'productCode',
  CODE = 'code',
  PARTNER_NAME = 'partnerName',
  STORE_NAME = 'storeName',
  STORE_MANAGER_EMAIL = 'storeManagerEmail',
  KITCHEN_CENTER = 'kitchenCenter',
  BRAND = 'brand',
  STATUS = 'status',
  EMAIL = 'email',
  GENDER = 'gender',
}

export interface HeadCell<T> {
  id: keyof T;
  label: string;
  numeric: boolean;
  hideSortIcon: boolean;
  disablePadding: boolean;
}

export interface KitchenCenterTable {
  logo: string;
  name: string;
  address: string;
  status: string;
}

export interface OrderTable {
  customerName: string;
  customerPhone: string;
  finalTotalPrice: number;
  orderCode: string;
  status: string;
}

export interface BrandTable {
  brandId: number;
  name: string;
  address: string;
  logo: string;
  status: string;
  brandManagerEmail: string;
}
export interface StoreTable {
  name: string;
  status: string;
  logo: string;
  storeManagerEmail: string;
  kitchenCenter: KitchenCenter;
  brand: Brand;
}

export interface PartnerTable {
  logo: string;
  name: string;
  status: string;
}

export interface StorePartnerTable {
  storeName: string;
  kitchenCenterName: string;
}

export interface PartnerProductTable {
  productName: string;
  productCode: string;
  partnerName: string;
  storeName: string;
  status: string;
}

export interface StorePartnerDetailTable {
  partnerName: string;
  partnerLogo: string;
  userName: string;
  password: string;
  commission: string;
  status: string;
}
export interface CategoryTable {
  imageUrl: string;
  name: string;
  code: string;
  displayOrder: string;
  status: string;
}

export interface ProductTable {
  image: string;
  name: string;
  code: string;
  displayOrder: number;
  sellingPrice: number;
  discountPrice: number;
  historicalPrice: number;
  type: string;
  category: string;
  status: string;
}

export interface CashierTable {
  avatar: string;
  fullName: string;
  email: string;
  gender: string;
  status: string;
  dateOfBirth: string;
}

export interface BankingAccountTable {
  logoUrl: string;
  name: string;
  numberAccount: string;
  status: string;
}

export interface MoneyExchangeTable {
  amount: number;
  exchangeType: string;
  sender: string;
  receiver: string;
  status: string;
}

export interface ShipperPaymentTable {
  order: string;
  createdDate: string;
  createdBy: string;
  amount: number;
  paymentMethod: string;
  KCBankingAccount: string;
  status: string;
}
