export interface Category {
  categoryId: number;
  code: string;
  name: string;
  type: string;
  displayOrder: number;
  description: string;
  imageUrl: string;
  status: string;
  brandId: number;
}

export interface CategoryToCreate {
  name: string;
  code: string;
  type: string;
  displayOrder: number;
  description: string;
  imageUrl: string;
}

export enum CategoryStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum CategoryType {
  NORMAL = 'Normal',
  EXTRA = 'Extra',
}

export const CATEGORY_TYPE_OPTIONS = [
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
