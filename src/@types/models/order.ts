import { PartnerOrderStatus, SystemStatus } from 'common/enum';
import { Partner } from './partner';
import { Product } from './product';
import { _ShipperPayment } from './shipperPayment';
import { Store } from './store';

export interface OrderDetails {
  orderDetailId: number;
  sellingPrice: number;
  quantity: number;
  note: string;
  orderId: number;
  masterOrderDetail: string;
  product: Product;
  extraOrderDetails: string[];
}

export interface OrderHistory {
  orderHistoryId: number;
  image: string;
  createdDate: string;
  systemStatus: string;
  partnerOrderStatus: string;
}

export interface Order {
  id: number;
  orderPartnerId: string;
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
  systemStatus: string;
  displayId: string;
  address: string;
  cutlery: number;
  partnerOrderStatus: string;
  store: Store;
  partner: Partner;
  shipperPayments: _ShipperPayment[];
  orderDetails: OrderDetails[];
  orderHistories: OrderHistory[];
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

export const SYSTEM_STATUS_OPTIONS = [
  {
    value: PartnerOrderStatus.ALL,
    label: 'All',
    id: 'All',
  },
  {
    value: PartnerOrderStatus.IN_STORE,
    label: 'In store',
    id: 'In',
  },
  {
    value: PartnerOrderStatus.READY_DELIVERY,
    label: 'Ready delivery',
    id: 'Rea',
  },
  {
    value: PartnerOrderStatus.COMPLETED,
    label: 'Completed',
    id: 'Com',
  },
  {
    value: PartnerOrderStatus.CANCELLED,
    label: 'Cancelled',
    id: 'Can',
  },
];

export const PARTNER_ORDER_STATUS = [
  {
    value: SystemStatus.ALL,
    label: 'All',
    id: 'All',
  },
  {
    value: SystemStatus.UPCOMING,
    label: 'Upcoming',
    id: 'Up',
  },
  {
    value: SystemStatus.READY,
    label: 'Ready',
    id: 'Rea',
  },
  {
    value: SystemStatus.PREPARING,
    label: 'Preparing',
    id: 'Pre',
  },
  {
    value: SystemStatus.COMPLETED,
    label: 'Completed',
    id: 'Com',
  },
  {
    value: SystemStatus.CANCELLED,
    label: 'Cancelled',
    id: 'Can',
  },
];
