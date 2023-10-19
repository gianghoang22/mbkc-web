export interface ShipperPayment {
  paymentId: number;
  status: string;
  content: string;
  orderId: string;
  order: string;
  amount: number;
  createdDate: string;
  paymentMethod: string;
  KCBankingAccountId: number;
  KCBankingAccount: string;
  createdBy: string;
}
