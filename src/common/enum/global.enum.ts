export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
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

export enum Error {
  SERVER_ERROR = 'ERR_NETWORK',
}
