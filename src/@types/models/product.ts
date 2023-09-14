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
  status: number;
  image: string;
  categoryId: string;
}
