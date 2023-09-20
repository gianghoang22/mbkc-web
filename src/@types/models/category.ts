export interface Category {
  categoryId: number;
  code: string;
  name: string;
  description: string;
  imageUrl: string;
  status: string;
  brandId: number;
}

export interface CategoryToAdd {
  name: string;
  code: string;
  type: string;
  displayOrder: number;
  description: string;
  imageUrl: string;
}

export enum CategoryType {
  NORMAL = 'Normal',
  EXTRA = 'Extra',
}

export enum CategoryStatus {
  ACTIVE = 'Active',
  DEACTIVE = 'Deactive',
}

export const CREATE_CATEGORY_TYPE_OPTIONS = [
  {
    value: CategoryType.NORMAL,
    label: 'Normal',
    id: 'Nor',
  },
  {
    value: CategoryType.EXTRA,
    label: 'Extra',
    id: 'Ext',
  },
];
