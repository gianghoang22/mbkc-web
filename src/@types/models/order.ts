export interface Order {
  orderId: number;
  orderPartnerId: number;
  shipperName: string;
  shipperPhone: string;
  customerName: string;
  customerPhone: string;
  note: string;
  paymentMethod: string;
  deliveryFee: number;
  subTotalPrice: number;
  totalDiscount: number;
  finalTotalPrice: number;
  commission: number;
  tax: number;
  status: string;
  partnerId: number;
  partnerName: string;
  storeId: number;
  storeName: string;
  orderCode: string;
}

export interface OrderToCreate {
  OrderPartnerId: string;
  ShipperName: string;
  ShipperPhone: string;
  CustomerName: string;
  CustomerPhone: string;
  Note: string;
  PaymentMethod: string;
  DeliveryFee: number;
  SubTotalPrice: number;
  TotalDiscount: number;
  FinalTotalPrice: number;
  Commission: number;
  Tax: number;
  Status: string;
  PartnerId: number;
  StoreId: number;
  OrderCode: string;
}

export enum OrderTypeEnum {
  ALL = 'ALL_ORDER',
  READY = 'READY',
  BEING_PREPARED = 'BEING_PREPARED',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

export enum OrderStatusActions {
  COMPLETED = 'COMPLETED',
  CANCEL = 'CANCEL',
}

export const ORDER_TYPE_TABS = [
  {
    value: OrderTypeEnum.ALL,
    label: 'All Orders',
    id: 'All',
  },
  {
    value: OrderTypeEnum.BEING_PREPARED,
    label: 'Being Prepared',
    id: 'Pre',
  },
  {
    value: OrderTypeEnum.READY,
    label: 'Ready',
    id: 'Rea',
  },
  {
    value: OrderTypeEnum.COMPLETED,
    label: 'Completed',
    id: 'Don',
  },
  {
    value: OrderTypeEnum.CANCELED,
    label: 'Canceled',
    id: 'Can',
  },
];
