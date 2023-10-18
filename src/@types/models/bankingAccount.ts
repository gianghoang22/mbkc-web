import { Status } from 'common/enum';

export interface BankingAccount {
  bankingAccountId: number;
  numberAccount: string;
  name: string;
  logoUrl: string;
  status: Status;
}

export interface BankingAccountToCreate {
  BankName: string;
  NumberAccount: string;
  BankLogo?: string;
}

export interface BankingAccountToUpdate {
  BankName?: string;
  BankLogo?: string;
  Status: 'ACTIVE' | 'INACTIVE';
}
