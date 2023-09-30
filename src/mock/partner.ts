import { faker } from '@faker-js/faker';
import { sample } from 'lodash'; // random in array

const partners = [...Array(24)].map((_, index) => ({
  partnerId: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
  name: faker.company.name(),
  logo: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  status: sample(['active', 'inactive']),
}));

export { partners };
