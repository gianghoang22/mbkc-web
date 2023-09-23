import { Route } from '@types';
import {
  BrandDetailPage,
  CreateBrandPage,
  CreateKitchenCenterPage,
  KitchenCenterDetailPage,
  ListBrandPage,
  ListKitchenCenterPage,
  MBKCAdminDashboardPage,
  UpdateBrandPage,
  UpdateKitchenCenterPage,
} from 'pages/MBKCAdmin';
import { CreateNewStorePage, ListStorePage, StoreDetailPage } from 'pages/common';
import { PATH_ADMIN_APP } from 'routes/paths';

export const adminRoutes: Route[] = [
  {
    path: PATH_ADMIN_APP.root,
    component: <MBKCAdminDashboardPage />,
    index: true,
  },
  {
    path: PATH_ADMIN_APP.kitchenCenter.list,
    component: <ListKitchenCenterPage />,
    index: true,
  },
  {
    path: PATH_ADMIN_APP.kitchenCenter.detailById,
    component: <KitchenCenterDetailPage />,
    index: true,
  },
  {
    path: PATH_ADMIN_APP.kitchenCenter.newKitchenCenter,
    component: <CreateKitchenCenterPage />,
    index: true,
  },
  {
    path: PATH_ADMIN_APP.kitchenCenter.editById,
    component: <UpdateKitchenCenterPage />,
    index: true,
  },
  {
    path: PATH_ADMIN_APP.brand.list,
    component: <ListBrandPage />,
    index: true,
  },
  {
    path: PATH_ADMIN_APP.brand.detailById,
    component: <BrandDetailPage />,
    index: true,
  },
  {
    path: PATH_ADMIN_APP.brand.newBrand,
    component: <CreateBrandPage />,
    index: true,
  },
  {
    path: PATH_ADMIN_APP.brand.editById,
    component: <UpdateBrandPage />,
    index: true,
  },
  {
    path: PATH_ADMIN_APP.brandStore.newBrandStore,
    component: <CreateNewStorePage />,
    index: true,
  },
  {
    path: PATH_ADMIN_APP.brandStore.list,
    component: <ListStorePage />,
    index: true,
  },
  {
    path: PATH_ADMIN_APP.brandStore.detailById,
    component: <StoreDetailPage />,
    index: true,
  },
  {
    path: PATH_ADMIN_APP.brandStore.editById,
    component: <CreateNewStorePage />,
    index: true,
  },
  {
    path: PATH_ADMIN_APP.brandStore.newBrandStore,
    component: <CreateNewStorePage />,
    index: true,
  },
];
