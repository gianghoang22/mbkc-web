import { useLocation } from 'react-router-dom';
// @mui
import { Typography, Stack, Container } from '@mui/material';
//
import { RoutesPageKey } from 'common/enum';
import { Breadcrumbs, Helmet } from 'components';

function ListOrdersPage(props: any) {
  const { pathname } = useLocation();

  return (
    <>
      <Helmet title="List Order | MBKC Food" />

      <Container>
        <Stack>
          <Typography variant="h4">List Order</Typography>
          <Breadcrumbs model="Order" pathname={pathname} navigateDashboard={RoutesPageKey.BRAND_DASHBOARD} />
        </Stack>
      </Container>
    </>
  );
}

export default ListOrdersPage;
