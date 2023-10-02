export enum Status {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  DEACTIVE = 'Deactive',
  BE_CONFIRMING = 'Be_confirming',
  REJECTED = 'Rejected',
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
