import { faker } from '@faker-js/faker';
import { sample } from 'lodash'; // random in array

// ----------------------------------------------------------------------

const kitchens = [...Array(24)].map((_, index) => ({
  kitchenId: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
  kitchenName: faker.company.name(),
  brandName: faker.company.name(),
  kitchenImgUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  brandImgUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  status: sample(['active', 'inactive']),
}));

export default kitchens;
