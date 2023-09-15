import { faker } from '@faker-js/faker';
import { sample } from 'lodash'; // random in array

// ----------------------------------------------------------------------

const stores = [...Array(24)].map((_, index) => ({
  accountId: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
  name: faker.company.name(),
  logo: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  kitchenCenter: faker.company.name(),
  partner: Math.floor(Math.random() * (5 - 1 + 1)) + 1,
  status: sample(['active', 'inactive']),
}));

const store = {
  accountId: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
  name: faker.company.name(),
  logo: `/assets/images/kitchen/store.png`,
  kitchenCenter: faker.company.name(),
  partner: Math.floor(Math.random() * (5 - 1 + 1)) + 1,
  status: sample(['active', 'inactive']),
};

export { stores, store };