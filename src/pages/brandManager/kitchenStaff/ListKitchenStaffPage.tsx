import { useLocation } from 'react-router-dom';
// @mui
import { Typography, Stack, Container } from '@mui/material';
//
import { RoutesPageKey } from 'common/enum';
import { Breadcrumbs, Helmet } from 'components';

function ListKitchenStaffPage() {
  const { pathname } = useLocation();

  return (
    <>
      <Helmet title="Dashboard | List Kitchen Staff" />

      <Container>
        <Stack>
          <Typography variant="h4">List Kitchen Staff</Typography>
          <Breadcrumbs model="Kitchen Staff" pathname={pathname} navigateDashboard={RoutesPageKey.BRAND_DASHBOARD} />
        </Stack>
      </Container>
    </>
  );
}

export default ListKitchenStaffPage;
