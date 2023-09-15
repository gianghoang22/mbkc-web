import { faker } from '@faker-js/faker';
import { sample } from 'lodash'; // random in array

// ----------------------------------------------------------------------

const products = [...Array(24)].map((_, index) => ({
  productId: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
  code: faker.company.name(),
  name: faker.company.name(),
  description:
    ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt fugiat possimus laborum quisquam facilis sapiente architecto facere perspiciatis vel vitae ex repellat suscipit officia beatae, debitis blanditiis esse laudantium quod!',
  historicalPrice: faker.number.int({ min: 10000, max: 1000000 }),
  sellingPrice: faker.number.int({ min: 10000, max: 1000000 }),
  discountPrice: faker.number.int({ min: 10000, max: 1000000 }),
  size: 'S, M, L',
  type: sample(['father product', 'child product', 'single product', 'extra product']),
  status: sample([0, 1]),
  image: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  categoryId: sample(['Chicken', 'Noodle', 'Water']),
}));

export default products;
