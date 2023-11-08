import { faker } from '@faker-js/faker';
import { Shift } from 'common/models';

// ----------------------------------------------------------------------

const shifts: Shift[] = [...Array(24)].map((_, index) => ({
  shiftId: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
  cashierName: faker.company.name(),
  cashierImage: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  date: '8/11/2023',
  kitchenCenterName: faker.company.name(),
  totalOrder: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
  totalMoneyInWallet: faker.number.int({ min: 100, max: 200 }),
  totalMoneyOfToday: faker.number.int({ min: 100, max: 200 }),
}));

export default shifts;
