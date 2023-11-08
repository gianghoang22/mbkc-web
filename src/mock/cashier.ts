import { faker } from '@faker-js/faker';
import { Gender, Status } from 'common/enums';
import { sample } from 'lodash'; // random in array

// ----------------------------------------------------------------------

const cashiers = [...Array(24)].map((_, index) => ({
  accountId: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
  email: faker.company.name(),
  fullName: faker.company.name(),
  gender: sample([Gender.MALE, Gender.FEMALE]),
  dateOfBirth: new Date(),
  avatar: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  citizenNumber: faker.company.name(),
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

export { cashiers, store };
