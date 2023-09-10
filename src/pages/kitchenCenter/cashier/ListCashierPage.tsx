import { useLocation } from 'react-router-dom';
// @mui
import { Typography, Stack, Container } from '@mui/material';
//
import { RoutesPageKey } from 'common/enum';
import { Breadcrumbs, Helmet } from 'components';

function ListCashierPage(props: any) {
  const { pathname } = useLocation();

  return (
    <>
      <Helmet title="List Kitchen Center Cashier | MBKC Food" />

      <Container>
        <Stack>
          <Typography variant="h4">List Kitchen Center Cashier</Typography>
          <Breadcrumbs model="Kitchen Center" pathname={pathname} navigateDashboard={RoutesPageKey.BRAND_DASHBOARD} />
        </Stack>
      </Container>
    </>
  );
}

export default ListCashierPage;
