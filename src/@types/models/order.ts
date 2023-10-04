export interface Order {
  orderId: number;
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
  status: string;
  partnerId: number;
  storeId: number;
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
