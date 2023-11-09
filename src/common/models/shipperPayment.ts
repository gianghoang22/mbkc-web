import { BankingAccount } from './bankingAccount';
import { Transaction } from './transaction';

export interface ShipperPayment {
  paymentId: number;
  status: string;
  content: string;
  amount: number;
  createDate: string;
  cashierCreated: string;
  paymentMethod: string;
  orderId: number;
  kcBankingAccountId: number;
  kcBankingAccountName: string;
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
