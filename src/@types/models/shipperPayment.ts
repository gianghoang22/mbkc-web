import { BankingAccount } from './bankingAccount';
import { Transaction } from './transaction';

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

export interface _ShipperPayment {
  paymentId: number;
  status: number;
  content: string;
  amount: number;
  createDate: string;
  createdBy: number;
  cashierCreated: string;
  bankingAccount: BankingAccount;
  transactions: Transaction[];
}
