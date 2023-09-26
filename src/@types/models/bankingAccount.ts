import { Status } from 'common/enum';

export interface BankingAccount {
  bankingAccountId: number;
  numberAccount: string;
  name: string;
  logoUrl: string;
  status: Status;
}
