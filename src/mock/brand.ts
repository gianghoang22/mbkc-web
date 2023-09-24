import { faker } from '@faker-js/faker';
import { sample } from 'lodash'; // random in array

// ----------------------------------------------------------------------

const brand = [...Array(24)].map((_, index) => ({
  brandId: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
  brandImgUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  brandName: faker.company.name(),
  address: '123 Le Dai Hanh',
  brandManager: faker.company.name(),
  brandManagerEmail: faker.company.name(),
  status: sample(['active', 'inactive']),
}));

export default brand;
