import { faker } from '@faker-js/faker';
import { KitchenCenter } from '@types';
import { sample } from 'lodash'; // random in array

// ----------------------------------------------------------------------

const kitchenCenters = [...Array(24)].map((_, index) => ({
  kitchenCenterId: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
  title: faker.company.name(),
  imageUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  address: '123 Le Dai Hanh',
  status: sample(['active', 'inactive']),
}));

export const kitchenCenter: KitchenCenter = {
  kitchenCenterId: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
  name: faker.company.name(),
  logo: `/assets/images/avatars/avatar_4.jpg`,
  address: faker.company.name(),
  kitchenCenterManagerEmail: faker.company.name(),
  status: sample(['Active', 'Inactive']),
};

export default kitchenCenter;
