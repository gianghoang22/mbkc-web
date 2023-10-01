export interface Product {
  productId: number;
  code: string;
  name: string;
  description: string;
  historicalPrice: number;
  sellingPrice: number;
  discountPrice: number;
  size: string;
  type: string;
  status: string;
  image: string;
  parentProductId: string;
  category: string;
  brandId: string;
}

export interface ProductToCreate {
  name?: string;
  code: string;
  description: string;
  historicalPrice?: number;
  sellingPrice?: number;
  discountPrice?: number;
  displayOrder: number;
  size: ProductSizeEnum;
  type: ProductTypeEnum;
  image?: string;
  parentProductId: string;
  categoryId: string;
  brandId: string;
}

export enum ProductStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum ProductSizeEnum {
  SMALL = 'S',
  MEDIUM = 'M',
  LARGE = 'L',
}

export enum ProductTypeEnum {
  FATHER = 'Father',
  CHILD = 'Child',
  SINGLE = 'Single',
  EXTRA = 'Extra',
}

export const PRODUCT_TYPE_OPTIONS = [
  {
    value: ProductTypeEnum.FATHER,
    label: 'Father Product',
    id: 'Fat',
  },
  {
    value: ProductTypeEnum.CHILD,
    label: 'Child Product',
    id: 'Chi',
  },
  {
    value: ProductTypeEnum.SINGLE,
    label: 'Single Product',
    id: 'Sin',
  },
  {
    value: ProductTypeEnum.EXTRA,
    label: 'Extra Product',
    id: 'Ext',
  },
];

export const PRODUCT_SIZE_OPTIONS = [
  {
    value: ProductSizeEnum.SMALL,
    label: 'Size S',
    id: 's',
  },
  {
    value: ProductSizeEnum.MEDIUM,
    label: 'Size M',
    id: 'm',
  },
  {
    value: ProductSizeEnum.LARGE,
    label: 'Size L',
    id: 'l',
  },
];
