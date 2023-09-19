import { useLocation } from 'react-router-dom';
// @mui
import { Container, Stack, Typography } from '@mui/material';
//
import { Breadcrumbs, Helmet } from 'components';
import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';

function ListCashierPage(props: any) {
  const { pathname } = useLocation();

  return (
    <>
      <Helmet title="List Cashier | MBKC" />

      <Container>
        <Stack>
          <Typography variant="h4">List Cashier</Typography>
          <Breadcrumbs pathname={pathname} navigateDashboard={PATH_KITCHEN_CENTER_APP.root} />
        </Stack>
      </Container>
    </>
  );
}

export default ListCashierPage;
