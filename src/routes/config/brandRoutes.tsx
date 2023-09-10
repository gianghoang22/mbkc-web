import { RoutesPageKey } from 'common/enum';
import {
  BrandDashboard,
  CreateNewProductPage,
  EditKitchenPage,
  KitchenDetailPage,
  ListKitchenPage,
  ListProductPage,
  ListProductCategoryPage,
} from 'pages/brand';

export const brandRoutes = [
  {
    key: RoutesPageKey.BRAND_DASHBOARD,
    path: RoutesPageKey.BRAND_DASHBOARD,
    component: <BrandDashboard />,
    index: true,
  },
  {
    key: RoutesPageKey.LIST_KITCHENS,
    path: RoutesPageKey.LIST_KITCHENS,
    component: <ListKitchenPage />,
    index: false,
  },
  {
    key: RoutesPageKey.KITCHEN_DETAIL,
    path: RoutesPageKey.KITCHEN_DETAIL,
    component: <KitchenDetailPage />,
    index: false,
  },
  {
    key: RoutesPageKey.UPDATE_KITCHEN,
    path: RoutesPageKey.UPDATE_KITCHEN,
    component: <EditKitchenPage />,
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
