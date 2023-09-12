import { faker } from '@faker-js/faker';
import { sample } from 'lodash'; // random in array

// ----------------------------------------------------------------------

const products = [...Array(24)].map((_, index) => ({
  productId: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
  imageUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.company.name(),
  code: faker.company.name(),
  price: faker.datatype.number({ min: 10000, max: 1000000 }),
  category: sample(['father product', 'child product', 'single product', 'extra product']),
  status: sample(['active', 'inactive']),
}));

export default products;
