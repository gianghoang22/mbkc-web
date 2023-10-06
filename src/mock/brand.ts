import { faker } from '@faker-js/faker';
import { Brand } from '@types';
import { sample } from 'lodash'; // random in array

// ----------------------------------------------------------------------

const brands = [...Array(24)].map((_, index) => ({
  brandId: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
  brandImgUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  brandName: faker.company.name(),
  address: '123 Le Dai Hanh',
  brandManager: faker.company.name(),
  brandManagerEmail: faker.company.name(),
  status: sample(['active', 'inactive']),
}));

export const brand: Brand = {
  brandId: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
  logo: `/assets/images/avatars/avatar_3.jpg`,
  name: faker.company.name(),
  address: faker.company.name(),
  brandManagerEmail: faker.company.name(),
  status: sample(['Active', 'Inactive']),
};

export default brand;
