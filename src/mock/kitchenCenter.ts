import { faker } from '@faker-js/faker';
import { sample } from 'lodash'; // random in array

// ----------------------------------------------------------------------

const kitchenCenter = [...Array(24)].map((_, index) => ({
  kitchenCenterId: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
  title: faker.company.name(),
  imageUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  address: '123 Le Dai Hanh',
  status: sample(['active', 'inactive']),
}));

export default kitchenCenter;
