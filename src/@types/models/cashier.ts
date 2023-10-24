import { Gender, Status } from 'common/enum';
import { KitchenCenter } from './kitchenCenter';

export interface Cashier {
  accountId: number;
  email: string;
  fullName: string;
  gender: Gender;
  dateOfBirth: string;
  avatar: string;
  citizenNumber: string;
  status: Status;
  kitchenCenter: KitchenCenter;
}

export interface CashierToCreate {
  email: string;
  fullName: string;
  gender: string;
  dateOfBirth: string;
  avatar?: string;
  citizenNumber: string;
}
