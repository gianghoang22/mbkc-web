import { Route } from '@types';
import {
  BrandDashboard,
  CategoryDetailPage,
  CreateCategoryPage,
  CreateProductPage,
  ListCategoryPage,
  ListExtraCategoryPage,
  ListProductPage,
  ProductDetailPage,
  UpdateProductPage,
} from 'pages/brand';
import { CreateStorePage, ListStorePage, StoreDetailPage } from 'pages/common';
import { InformationPage, ProfilePage } from 'pages/profile';
import { PATH_BRAND_APP } from 'routes/paths';

export const brandRoutes: Route[] = [
  {
    path: PATH_BRAND_APP.root,
    component: <BrandDashboard />,
    index: true,
  },
  {
    path: PATH_BRAND_APP.profile,
    component: <ProfilePage />,
    index: true,
  },
  {
    path: PATH_BRAND_APP.information,
    component: <InformationPage />,
    index: true,
  },
  {
    path: PATH_BRAND_APP.store.list,
    component: <ListStorePage />,
    index: false,
  },
  {
    path: PATH_BRAND_APP.store.detailById,
    component: <StoreDetailPage />,
    index: false,
  },
  {
    path: PATH_BRAND_APP.store.editById,
    component: <CreateStorePage />,
    index: true,
  },
  {
    path: PATH_BRAND_APP.store.newStore,
    component: <CreateStorePage />,
    index: true,
  },
  {
    path: PATH_BRAND_APP.product.list,
    component: <ListProductPage />,
    index: false,
  },
  {
    path: PATH_BRAND_APP.product.newProduct,
    component: <CreateProductPage />,
    index: false,
  },
  {
    path: PATH_BRAND_APP.product.detailById,
    component: <ProductDetailPage />,
    index: false,
  },
  {
    path: PATH_BRAND_APP.product.editById,
    component: <UpdateProductPage />,
    index: false,
  },
  {
    path: PATH_BRAND_APP.category.list,
    component: <ListCategoryPage />,
    index: false,
  },
  {
    path: PATH_BRAND_APP.category.detailById,
    component: <CategoryDetailPage />,
    index: false,
  },
  {
    path: PATH_BRAND_APP.category.extraList,
    component: <ListExtraCategoryPage />,
    index: false,
  },
  {
    path: PATH_BRAND_APP.category.newCategory,
    component: <CreateCategoryPage />,
    index: false,
  },
  {
    path: PATH_BRAND_APP.category.editById,
    component: <CreateCategoryPage />,
    index: false,
  },
];
