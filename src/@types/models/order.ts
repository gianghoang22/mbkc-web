import { PartnerOrderStatus, PartnerOrderStatusToFilter, SystemStatus, SystemStatusToFilter } from 'common/enum';
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

export interface CompletedOrderParams {
  OrderPartnerId: number;
  BankingAccountId: string;
  Image: string;
}

export enum OrderTypeEnum {
  ALL = 'ALL_ORDER',
  READY = 'READY',
  BEING_PREPARED = 'BEING_PREPARED',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

export enum OrderStatusActions {
  READY = 'READY',
  READY_DELIVERY = 'READY_DELIVERY',
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
    value: SystemStatusToFilter.IN_STORE,
    label: 'In Store',
    id: 'In',
  },
  {
    value: SystemStatusToFilter.READY_DELIVERY,
    label: 'Ready Delivery',
    id: 'Rea',
  },
  {
    value: SystemStatusToFilter.COMPLETED,
    label: 'Completed',
    id: 'Com',
  },
  {
    value: SystemStatusToFilter.CANCELLED,
    label: 'Cancelled',
    id: 'Can',
  },
];

export const PARTNER_ORDER_STATUS = [
  {
    value: PartnerOrderStatus.UPCOMING,
    label: 'Upcoming',
    id: 'Up',
  },
  {
    value: PartnerOrderStatus.READY,
    label: 'Ready',
    id: 'Rea',
  },
  {
    value: PartnerOrderStatus.PREPARING,
    label: 'Preparing',
    id: 'Pre',
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
