import { ExchangeStatus, ExchangeType } from 'common/enums';

export interface MoneyExchange {
  exchangeId: number;
  amount: number;
  exchangeType: ExchangeType;
  content: string;
  status: ExchangeStatus;
  senderId: number;
  senderName: string;
  receiveId: number;
  receiveName: string;
  createdDate: string;
  exchangeImage: string;
  transactionTime: string;
}
