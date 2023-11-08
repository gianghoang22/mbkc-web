import { faker } from '@faker-js/faker';
import { Status } from 'enums';
import { sample } from 'lodash'; // random in array

// ----------------------------------------------------------------------

const bankingAccounts = [...Array(24)].map((_, index) => ({
  bankingAccountId: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
  numberAccount: faker.company.name(),
  name: faker.company.name(),
  logoUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  status: sample([Status.ACTIVE, Status.INACTIVE]),
}));

const store = {
  storeId: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
  name: faker.company.name(),
  logoUrl: `/assets/images/kitchen/store.png`,
  kitchenCenter: faker.company.name(),
  brand: faker.company.name(),
  partner: Math.floor(Math.random() * (5 - 1 + 1)) + 1,
  status: sample(['active', 'inactive']),
};

export { bankingAccounts, store };
