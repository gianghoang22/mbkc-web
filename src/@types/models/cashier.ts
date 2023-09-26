import { Gender, Status } from 'common/enum';

export interface Cashier {
  accountId: number;
  email: string;
  fullName: string;
  gender: Gender;
  dateOfBirth: string;
  avatar: string;
  citizenNumber: number;
  status: Status;
}
