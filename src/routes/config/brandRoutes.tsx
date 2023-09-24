import { Route } from '@types';
import {
  BrandDashboard,
  CategoryDetailPage,
  CreateNewCategoryPage,
  CreateNewProductPage,
  ExtraCategoryDetailPage,
  ListCategoryPage,
  ListExtraCategoryPage,
  ListProductPage,
} from 'pages/brand';
import { ListStorePage, StoreDetailPage } from 'pages/common';
import { ProfilePage } from 'pages/profile';
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
    path: PATH_BRAND_APP.product.list,
    component: <ListProductPage />,
    index: false,
  },
  {
    path: PATH_BRAND_APP.product.newProduct,
    component: <CreateNewProductPage />,
    index: false,
  },
  {
    path: PATH_BRAND_APP.product.editById,
    component: <CreateNewProductPage />,
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
    path: PATH_BRAND_APP.category.extraDetailById,
    component: <ExtraCategoryDetailPage />,
    index: false,
  },
  {
    path: PATH_BRAND_APP.category.newCategory,
    component: <CreateNewCategoryPage />,
    index: false,
  },
  {
    path: PATH_BRAND_APP.category.editById,
    component: <CreateNewCategoryPage />,
    index: false,
  },
];
