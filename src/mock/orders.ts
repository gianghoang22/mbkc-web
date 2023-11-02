import { faker } from '@faker-js/faker';
import { Order } from '@types';
import { sample } from 'lodash'; // random in array

// ----------------------------------------------------------------------

const orders: Order[] = [...Array(24)].map((_, index) => ({
  orderId: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
  orderPartnerId: faker.number.int({ min: 1000, max: 10000 }),
  shipperName: faker.company.name(),
  shipperPhone: faker.company.name(),
  customerName: faker.company.name(),
  customerPhone: faker.company.name(),
  note: faker.company.name(),
  paymentMethod: faker.company.name(),
  deliveryFee: faker.number.int({ min: 1000, max: 10000 }),
  subTotalPrice: faker.number.int({ min: 1000, max: 10000 }),
  totalDiscount: faker.number.int({ min: 1000, max: 10000 }),
  finalTotalPrice: faker.number.int({ min: 1000, max: 10000 }),
  commission: faker.number.int({ min: 1000, max: 10000 }),
  tax: faker.number.int({ min: 1000, max: 10000 }),
  partnerId: faker.number.int({ min: 1000, max: 10000 }),
  storeId: faker.number.int({ min: 1000, max: 10000 }),
  partnerName: faker.company.name(),
  storeName: faker.company.name(),
  orderCode: faker.company.name(),
  status: sample(['active', 'inactive']),
}));

export default orders;
