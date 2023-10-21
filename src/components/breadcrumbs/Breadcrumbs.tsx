import { useNavigate } from 'react-router-dom';
// @mui
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Link, Breadcrumbs as MUIBreadcrumbs, Stack, Typography } from '@mui/material';
//
import { useLocales } from 'hooks';
import { Breadcrumb } from 'common/enum';

interface BreadcrumbsProps {
  sx?: object;
  pathname: string;
  navigateDashboard: string;
}

function Breadcrumbs({ pathname, navigateDashboard, sx }: BreadcrumbsProps) {
  const navigate = useNavigate();
  const { translate } = useLocales();
  const pathnames = pathname
    .split('/')
    .slice(2)
    .filter((x) => x);

  const pathnameBread = !isNaN(parseInt(pathnames[2]))
    ? pathnames.filter((x) => isNaN(parseInt(x)))
    : !isNaN(parseInt(pathnames[1]))
    ? [...pathnames.filter((x) => isNaN(parseInt(x))), Breadcrumb.DETAIL]
    : pathnames[0] === Breadcrumb.BRANDS ||
      pathnames[0] === Breadcrumb.KITCHEN_CENTERS ||
      pathnames[0] === Breadcrumb.STORES ||
      pathnames[0] === Breadcrumb.PARTNERS ||
      pathnames[0] === Breadcrumb.STORE_PARTNERS ||
      pathnames[0] === Breadcrumb.CATEGORIES ||
      pathnames[0] === Breadcrumb.EXTRA_CATEGORIES ||
      pathnames[0] === Breadcrumb.PRODUCTS ||
      pathnames[0] === Breadcrumb.CASHIERS ||
      pathnames[0] === Breadcrumb.ORDERS ||
      pathnames[0] === Breadcrumb.BANKING_ACCOUNTS ||
      pathnames[0] === Breadcrumb.TRANSACTIONS ||
      pathnames[0] === Breadcrumb.BRANDS
    ? [...pathnames, Breadcrumb.LIST]
    : pathnames;

  return (
    <MUIBreadcrumbs separator={<FiberManualRecordIcon sx={{ fontSize: 8 }} />} aria-label="breadcrumb">
      {pathnameBread.length > 0 ? (
        <Stack direction="row" gap={1} alignItems="center">
          <Link onClick={() => navigate(navigateDashboard)} underline="none" sx={{ cursor: 'pointer' }}>
            {translate('breadcrumb.dashboard')}
          </Link>
        </Stack>
      ) : (
        <Typography>{translate('breadcrumb.dashboard')}</Typography>
      )}
      {pathnameBread.map((path, index) => {
        const routeTo = `/${pathnameBread.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnameBread.length - 1;
        // const nameUppercase = path.split('-').join(' ');
        const nameFinal =
          path === Breadcrumb.BRAND
            ? translate('breadcrumb.brand')
            : path === Breadcrumb.BRANDS
            ? translate('breadcrumb.brands')
            : path === Breadcrumb.KITCHEN_CENTER
            ? translate('breadcrumb.kitchen-center')
            : path === Breadcrumb.KITCHEN_CENTERS
            ? translate('breadcrumb.kitchen-centers')
            : path === Breadcrumb.STORE
            ? translate('breadcrumb.store')
            : path === Breadcrumb.STORES
            ? translate('breadcrumb.stores')
            : path === Breadcrumb.CATEGORY
            ? translate('breadcrumb.category')
            : path === Breadcrumb.CATEGORIES
            ? translate('breadcrumb.categories')
            : path === Breadcrumb.EXTRA_CATEGORY
            ? translate('breadcrumb.extra-category')
            : path === Breadcrumb.EXTRA_CATEGORIES
            ? translate('breadcrumb.extra-categories')
            : path === Breadcrumb.PRODUCT
            ? translate('breadcrumb.product')
            : path === Breadcrumb.PRODUCTS
            ? translate('breadcrumb.products')
            : path === Breadcrumb.CASHIER
            ? translate('breadcrumb.cashier')
            : path === Breadcrumb.CASHIERS
            ? translate('breadcrumb.cashiers')
            : path === Breadcrumb.ORDER
            ? translate('breadcrumb.order')
            : path === Breadcrumb.ORDERS
            ? translate('breadcrumb.orders')
            : path === Breadcrumb.BANKING_ACCOUNT
            ? translate('breadcrumb.banking-account')
            : path === Breadcrumb.BANKING_ACCOUNTS
            ? translate('breadcrumb.banking-accounts')
            : path === Breadcrumb.TRANSACTION
            ? translate('breadcrumb.transaction')
            : path === Breadcrumb.TRANSACTIONS
            ? translate('breadcrumb.transactions')
            : path === Breadcrumb.PARTNER
            ? translate('breadcrumb.partner')
            : path === Breadcrumb.PARTNERS
            ? translate('breadcrumb.partners')
            : path === Breadcrumb.STORE_PARTNER
            ? translate('breadcrumb.storePartner')
            : path === Breadcrumb.STORE_PARTNERS
            ? translate('breadcrumb.storePartners')
            : path === Breadcrumb.MONEY_EXCHANGES
            ? translate('breadcrumb.moneyExchanges')
            : path === Breadcrumb.SHIPPER_PAYMENTS
            ? translate('breadcrumb.shipperPayments')
            : path === Breadcrumb.WALLET
            ? translate('breadcrumb.wallet')
            : path === Breadcrumb.LIST
            ? translate('breadcrumb.list')
            : path === Breadcrumb.DETAIL
            ? translate('breadcrumb.detail')
            : path === Breadcrumb.UPDATE
            ? translate('breadcrumb.update')
            : path === Breadcrumb.CREATE
            ? translate('breadcrumb.create-new')
            : path === Breadcrumb.REGISTER
            ? translate('breadcrumb.create-new')
            : path === Breadcrumb.PROFILE
            ? translate('model.capitalizeOne.accountInformation')
            : path === Breadcrumb.INFORMATION
            ? translate('breadcrumb.information')
            : path;
        return isLast ? (
          <Typography key={path}>{nameFinal}</Typography>
        ) : (
          <Link key={path} underline="none" sx={{ cursor: 'pointer' }} onClick={() => navigate(routeTo)}>
            {nameFinal}
          </Link>
        );
      })}
    </MUIBreadcrumbs>
  );
}

export default Breadcrumbs;
