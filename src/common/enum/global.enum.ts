export enum Status {
  ALL = '',
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  DEACTIVE = 'Deactive',
  BE_CONFIRMING = 'Be Confirming',
  REJECTED = 'Rejected',
}

export enum SystemStatus {
  IN_STORE = 'In Store',
  READY_DELIVERY = 'Ready Delivery',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

export enum PartnerOrderStatus {
  PREPARING = 'Preparing',
  READY = 'Ready',
  UPCOMING = 'Upcoming',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export const GENDER_OPTIONS = [
  {
    value: Gender.MALE,
    label: 'Male',
    id: 'Ma',
  },
  {
    value: Gender.FEMALE,
    label: 'Female',
    id: 'Fe',
  },
];

export enum Language {
  ENGLISH = 'en',
  VIETNAMESE = 'vi',
}

export enum Error {
  SERVER_ERROR = 'ERR_NETWORK',
}
