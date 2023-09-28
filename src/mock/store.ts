import { faker } from '@faker-js/faker';
import { sample } from 'lodash'; // random in array

// ----------------------------------------------------------------------

const stores = [...Array(24)].map((_, index) => ({
  storeId: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
  name: faker.company.name(),
  logo: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  status: sample(['active', 'inactive']),
  storeManagerEmail: faker.company.name(),
  kitchenCenter: {
    kitchenCenterId: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
    name: faker.company.name(),
    address: faker.company.name(),
    status: sample(['active', 'inactive']),
    logo: `/assets/images/avatars/avatar_${index + 1}.jpg`,
    kitchenCenterManagerEmail: faker.company.name(),
  },
  brand: {
    brandId: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
    name: faker.company.name(),
    address: faker.company.name(),
    logo: faker.company.name(),
    status: sample(['active', 'inactive']),
    brandManagerEmail: faker.company.name(),
  },
}));

const store = {
  storeId: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
  name: faker.company.name(),
  logo: `/assets/images/kitchen/store.png`,
  status: sample(['active', 'inactive']),
  storeManagerEmail: faker.company.name(),
  kitchenCenter: {
    kitchenCenterId: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
    name: faker.company.name(),
    address: faker.company.name(),
    status: sample(['active', 'inactive']),
    logo: `/assets/images/kitchen/store.png`,
    kitchenCenterManagerEmail: faker.company.name(),
  },
  brand: {
    brandId: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
    name: faker.company.name(),
    address: faker.company.name(),
    logo: faker.company.name(),
    status: sample(['active', 'inactive']),
    brandManagerEmail: faker.company.name(),
  },
};

export { stores, store };
