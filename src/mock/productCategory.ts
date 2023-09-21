import { faker } from '@faker-js/faker';
import { CategoryType } from '@types';
import { sample } from 'lodash'; // random in array

// ----------------------------------------------------------------------

const productCategories = [...Array(24)].map((_, index) => ({
  categoryId: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
  code: faker.company.name(),
  name: faker.company.name(),
  type: sample([CategoryType.NORMAL, CategoryType.EXTRA]),
  displayOrder: Math.floor(Math.random() * (20 - 1 + 1)) + 1,
  description:
    ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt fugiat possimus laborum quisquam facilis sapiente architecto facere perspiciatis vel vitae ex repellat suscipit officia beatae, debitis blanditiis esse laudantium quod!',
  imageUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  status: sample(['active', 'inactive']),
  brandId: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
}));

export default productCategories;
