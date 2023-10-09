import { faker } from '@faker-js/faker';
import { sample } from 'lodash'; // random in array

// ----------------------------------------------------------------------

const storePartners = [...Array(10)].map((_, index) => ({
  storeId: sample([1, 2, 3, 4, 5]),
  partnerId: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
  storeName: faker.company.name(),
  kitchenCenterName: faker.company.name(),
  listPartner: [...Array(3)].map((_, index) => ({
    partnerId: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
    partnerName: faker.company.name(),
    partnerLogo: `/assets/images/avatars/avatar_${index + 1}.jpg`,
    userName: faker.internet.userName(),
    password: faker.internet.password(),
    status: sample(['Active', 'Inactive']),
  })),
}));

export { storePartners };
