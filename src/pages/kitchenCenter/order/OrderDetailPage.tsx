import { useLocation } from 'react-router-dom';
// @mui
import { Typography, Stack, Container } from '@mui/material';
//
import { RoutesPageKey } from 'common/enum';
import { Breadcrumbs, Helmet } from 'components';

function OrderDetailPage(props: any) {
  const { pathname } = useLocation();

  return (
    <>
      <Helmet title="Order Detail | MBKC Food" />

      <Container>
        <Stack>
          <Typography variant="h4">Order Detail</Typography>
          <Breadcrumbs model="Order" pathname={pathname} navigateDashboard={RoutesPageKey.BRAND_DASHBOARD} />
        </Stack>
      </Container>
    </>
  );
}

OrderDetailPage.propTypes = {};

export default OrderDetailPage;
