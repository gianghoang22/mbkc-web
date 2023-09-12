import { RoutesPageKey } from 'common/enum';
import {
  BrandDashboard,
  CreateNewProductPage,
  EditStorePage,
  ExtraCategoryDetailPage,
  ListExtraCategoryPage,
  ListProductCategoryPage,
  ListProductPage,
  ListStorePage,
  ProductCategoryDetailPage,
  StoreDetailPage,
} from 'pages/brand';

export const brandRoutes = [
  {
    key: RoutesPageKey.BRAND_DASHBOARD,
    path: RoutesPageKey.BRAND_DASHBOARD,
    component: <BrandDashboard />,
    index: true,
  },
  {
    key: RoutesPageKey.LIST_STORES,
    path: RoutesPageKey.LIST_STORES,
    component: <ListStorePage />,
    index: false,
  },
  {
    key: RoutesPageKey.STORE_DETAIL,
    path: RoutesPageKey.STORE_DETAIL,
    component: <StoreDetailPage />,
    index: false,
  },
  {
    key: RoutesPageKey.UPDATE_STORE,
    path: RoutesPageKey.UPDATE_STORE,
    component: <EditStorePage />,
    index: false,
  },
  {
    key: RoutesPageKey.LIST_PRODUCTS,
    path: RoutesPageKey.LIST_PRODUCTS,
    component: <ListProductPage />,
    index: false,
  },
  {
    key: RoutesPageKey.LIST_PRODUCT_CATEGORIES,
    path: RoutesPageKey.LIST_PRODUCT_CATEGORIES,
    component: <ListProductCategoryPage />,
    index: false,
  },
  {
    key: RoutesPageKey.PRODUCT_CATEGORY_DETAIL,
    path: RoutesPageKey.PRODUCT_CATEGORY_DETAIL,
    component: <ProductCategoryDetailPage />,
    index: false,
  },
  {
    key: RoutesPageKey.LIST_EXTRA_CATEGORIES,
    path: RoutesPageKey.LIST_EXTRA_CATEGORIES,
    component: <ListExtraCategoryPage />,
    index: false,
  },
  {
    key: RoutesPageKey.EXTRA_CATEGORY_DETAIL,
    path: RoutesPageKey.EXTRA_CATEGORY_DETAIL,
    component: <ExtraCategoryDetailPage />,
    index: false,
  },
  {
    key: RoutesPageKey.CREATE_NEW_PRODUCT,
    path: RoutesPageKey.CREATE_NEW_PRODUCT,
    component: <CreateNewProductPage />,
    index: false,
  },
  {
    key: RoutesPageKey.UPDATE_PRODUCT,
    path: RoutesPageKey.UPDATE_PRODUCT,
    component: <CreateNewProductPage />,
    index: false,
  },
];
