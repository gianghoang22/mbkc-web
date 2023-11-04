export enum Status {
  ALL = '',
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  DEACTIVE = 'Deactive',
  BE_CONFIRMING = 'Be Confirming',
  REJECTED = 'Rejected',
}

export enum SystemStatus {
  ALL = '',
  PREPARING = 'Preparing',
  READY = 'Ready',
  UPCOMING = 'Upcoming',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

export enum PartnerOrderStatus {
  ALL = '',
  IN_STORE = 'IN_STORE',
  READY_DELIVERY = 'READY_DELIVERY',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
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
