import { useLocation } from 'react-router-dom';
// @mui
import { Typography, Stack, Container } from '@mui/material';
//
import { RoutesPageKey } from 'common/enum';
import { Breadcrumbs, Helmet } from 'components';

function CreateNewCashierPage() {
  const { pathname } = useLocation();

  return (
    <>
      <Helmet title="Create Kitchen Center Cashier | MBKC Food" />

      <Container>
        <Stack>
          <Typography variant="h4">Create Kitchen Center Cashier</Typography>
          <Breadcrumbs model="Kitchen" pathname={pathname} navigateDashboard={RoutesPageKey.BRAND_DASHBOARD} />
        </Stack>
      </Container>
    </>
  );
}

export default CreateNewCashierPage;
