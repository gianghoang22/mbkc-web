import { useNavigate } from 'react-router-dom'
// @mui
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import { Link, Breadcrumbs as MUIBreadcrumbs, Stack, Typography } from '@mui/material'
import { useLocales } from 'hooks'
import { Breadcrumb } from 'common/enum'

interface BreadcrumbsProps {
  sx?: object
  pathname: string
  navigateDashboard: string
}

function Breadcrumbs({ pathname, navigateDashboard, sx }: BreadcrumbsProps) {
  const navigate = useNavigate()
  const { translate } = useLocales()
  const pathnames = pathname
    .split('/')
    .slice(2)
    .filter((x) => x)

  const pathnameBread = !isNaN(parseInt(pathnames[2])) ? pathnames.filter((x) => isNaN(parseInt(x))) : pathnames

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
      {pathnameBread.map((name, index) => {
        const routeTo = `/${pathnameBread.slice(0, index + 1).join('/')}`
        const isLast = index === pathnameBread.length - 1
        const nameUppercase = name.split('-').join(' ')
        const nameFinal =
          nameUppercase === Breadcrumb.BRAND
            ? translate('breadcrumb.brand')
            : nameUppercase === Breadcrumb.BRANDS
            ? translate('breadcrumb.brands')
            : nameUppercase === Breadcrumb.KITCHEN_CENTERS
            ? translate('breadcrumb.kitchen-centers')
            : nameUppercase === Breadcrumb.KITCHEN_CENTER
            ? translate('breadcrumb.kitchen-center')
            : nameUppercase === Breadcrumb.STORE
            ? translate('breadcrumb.store')
            : nameUppercase === Breadcrumb.CATEGORY
            ? translate('breadcrumb.category')
            : nameUppercase === Breadcrumb.EXTRA_CATEGORY
            ? translate('breadcrumb.extra-category')
            : nameUppercase === Breadcrumb.PRODUCT
            ? translate('breadcrumb.product')
            : nameUppercase === Breadcrumb.CASHIER
            ? translate('breadcrumb.cashier')
            : nameUppercase === Breadcrumb.ORDER
            ? translate('breadcrumb.order')
            : nameUppercase === Breadcrumb.BANKING_ACCOUNT
            ? translate('breadcrumb.banking-account')
            : nameUppercase === Breadcrumb.TRANSACTION
            ? translate('breadcrumb.transaction')
            : nameUppercase === Breadcrumb.PARTNERS
            ? translate('breadcrumb.partners')
            : nameUppercase === Breadcrumb.WALLET
            ? translate('breadcrumb.wallet')
            : nameUppercase === Breadcrumb.LIST
            ? translate('breadcrumb.list')
            : nameUppercase === Breadcrumb.DETAIL
            ? translate('breadcrumb.detail')
            : nameUppercase === Breadcrumb.UPDATE
            ? translate('breadcrumb.update')
            : nameUppercase === Breadcrumb.CREATE
            ? translate('breadcrumb.create-new')
            : nameUppercase === Breadcrumb.PROFILE
            ? translate('model.capitalizeOne.accountInformation')
            : nameUppercase === Breadcrumb.INFORMATION
            ? translate('breadcrumb.information')
            : nameUppercase === Breadcrumb.STORE_PARTNER
            ? translate('breadcrumb.storePartner')
            : nameUppercase
        return isLast ? (
          <Typography key={name}>{nameFinal}</Typography>
        ) : (
          <Link key={name} underline="none" sx={{ cursor: 'pointer' }} onClick={() => navigate(routeTo)}>
            {nameFinal}
          </Link>
        )
      })}
    </MUIBreadcrumbs>
  )
}

export default Breadcrumbs
