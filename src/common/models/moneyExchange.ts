export interface MoneyExchange {
  exchangeId: number;
  amount: number;
  exchangeType: string;
  content: string;
  status: string;
  senderId: number;
  senderName: string;
  receiveId: number;
  receiveName: string;
  exchangeImage: string;
}
