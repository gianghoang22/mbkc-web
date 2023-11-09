import { faker } from '@faker-js/faker';
import { MoneyExchange } from 'common/models';
import { sample } from 'lodash'; // random in array

// ----------------------------------------------------------------------

const moneyExchange: MoneyExchange[] = [...Array(24)].map((_, index) => ({
  exchangeId: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
  amount: faker.number.int({ min: 10, max: 20 }),
  exchangeType: sample(['online', 'offline']),
  content: faker.company.name(),
  status: sample(['active', 'inactive']),
  senderId: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
  senderName: faker.company.name(),
  receiveId: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
  receiveName: faker.company.name(),
  exchangeImage: faker.company.name(),
}));

export default moneyExchange;
