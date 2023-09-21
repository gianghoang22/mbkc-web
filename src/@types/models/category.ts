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
