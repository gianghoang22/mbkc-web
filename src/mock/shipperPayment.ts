import { faker } from '@faker-js/faker';
import { ShipperPayment } from '@types';
import { sample } from 'lodash'; // random in array

// ----------------------------------------------------------------------

const shipperPayment: ShipperPayment[] = [...Array(24)].map((_, index) => ({
  paymentId: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
  content: faker.company.name(),
  orderId: `${Math.floor(Math.random() * (1000 - 1 + 1)) + 1}`,
  order: '#MBKC1234',
  amount: faker.number.int({ min: 100, max: 200 }),
  createdDate: faker.company.name(),
  paymentMethod: faker.company.name(),
  KCBankingAccountId: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
  KCBankingAccount: faker.company.name(),
  createdBy: faker.company.name(),
  status: sample(['active', 'inactive']),
}));

export default shipperPayment;
