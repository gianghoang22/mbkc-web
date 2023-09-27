import { Gender, Status } from 'common/enum';

export interface Cashier {
  accountId: number;
  email: string;
  fullName: string;
  gender: Gender;
  dateOfBirth: Date;
  avatar: string;
  citizenNumber: string;
  status: Status;
}

export interface CashierToCreate {
  email: string;
  fullName: string;
  gender: string;
  dateOfBirth: Date;
  avatar?: string;
  citizenNumber: string;
}
