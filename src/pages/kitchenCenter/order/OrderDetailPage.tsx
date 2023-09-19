import { useLocation } from 'react-router-dom';
// @mui
import { Container, Stack, Typography } from '@mui/material';
//
import { Breadcrumbs, Helmet } from 'components';
import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';

function OrderDetailPage(props: any) {
  const { pathname } = useLocation();

  return (
    <>
      <Helmet title="Order Detail | MBKC Food" />

      <Container>
        <Stack>
          <Typography variant="h4">Order Detail</Typography>
          <Breadcrumbs pathname={pathname} navigateDashboard={PATH_KITCHEN_CENTER_APP.root} />
        </Stack>
      </Container>
    </>
  );
}

OrderDetailPage.propTypes = {};

export default OrderDetailPage;
