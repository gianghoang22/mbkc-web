import { faker } from '@faker-js/faker';
import { MoneyExchange } from '@types';
import { sample } from 'lodash'; // random in array

// ----------------------------------------------------------------------

const moneyExchange: MoneyExchange[] = [...Array(24)].map((_, index) => ({
  moneyExchangeId: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
  sender: faker.company.name(),
  receiver: faker.company.name(),
  amount: faker.number.int({ min: 10, max: 20 }),
  exchangeType: sample(['online', 'offline']),
  content: faker.company.name(),
  status: sample(['active', 'inactive']),
}));

export default moneyExchange;
