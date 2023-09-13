import { faker } from '@faker-js/faker';
import { sample } from 'lodash'; // random in array

// ----------------------------------------------------------------------

const stores = [...Array(24)].map((_, index) => ({
  storeId: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
  title: faker.company.name(),
  imageUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  kitchenCenter: faker.company.name(),
  startDay: faker.date.past(),
  endDay: faker.date.past(),
  status: sample(['active', 'inactive']),
}));

export default stores;
