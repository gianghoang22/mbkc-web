import { faker } from '@faker-js/faker';
import { sample } from 'lodash'; // random in array

// ----------------------------------------------------------------------

const productCategories = [...Array(24)].map((_, index) => ({
  categoryId: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
  imageUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.company.name(),
  code: faker.company.name(),
  status: sample(['active', 'inactive']),
}));

export default productCategories;
