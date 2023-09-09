import { useLocation } from 'react-router-dom';
// @mui
import { Typography, Stack, Container } from '@mui/material';
//
import { RoutesPageKey } from 'common/enum';
import { Breadcrumbs, Helmet } from 'components';

function ListKitchenPage() {
  const { pathname } = useLocation();

  return (
    <>
      <Helmet title="Dashboard | List Kitchen" />

      <Container>
        <Stack>
          <Typography variant="h4">List Kitchen</Typography>
          <Breadcrumbs model="Kitchen" pathname={pathname} navigateDashboard={RoutesPageKey.BRAND_DASHBOARD} />
        </Stack>
      </Container>
    </>
  );
}

export default ListKitchenPage;
