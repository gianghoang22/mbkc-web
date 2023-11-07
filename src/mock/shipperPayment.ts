import { faker } from '@faker-js/faker';
import { ShipperPayment } from '@types';
import { sample } from 'lodash'; // random in array

// ----------------------------------------------------------------------

const shipperPayment: ShipperPayment[] = [...Array(24)].map((_, index) => ({
  paymentId: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
  status: sample(['Successful', 'Failed']),
  content: faker.company.name(),
  amount: faker.number.int({ min: 100, max: 200 }),
  createDate: faker.company.name(),
  paymentMethod: faker.company.name(),
  orderId: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
  kcBankingAccountId: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
  kcBankingAccountName: faker.company.name(),
}));

export default shipperPayment;
