import { useLocation } from 'react-router-dom';
// @mui
import { Typography, Stack, Container } from '@mui/material';
//
import { RoutesPageKey } from 'common/enum';
import { Breadcrumbs, Helmet } from 'components';

function ListVoucherPage() {
  const { pathname } = useLocation();

  return (
    <>
      <Helmet title="Dashboard | List Voucher" />

      <Container>
        <Stack>
          <Typography variant="h4">List Voucher</Typography>
          <Breadcrumbs model="Voucher" pathname={pathname} navigateDashboard={RoutesPageKey.BRAND_DASHBOARD} />
        </Stack>
      </Container>
    </>
  );
}

export default ListVoucherPage;
