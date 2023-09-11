import { useLocation } from 'react-router-dom';
// @mui
import { Typography, Stack, Container } from '@mui/material';
//
import { RoutesPageKey } from 'common/enum';
import { Breadcrumbs, Helmet } from 'components';

function ListKitchenCenterPage(props: any) {
  const { pathname } = useLocation();

  return (
    <>
      <Helmet title="List Brand Page | MBKC Food" />

      <Container>
        <Stack>
          <Typography variant="h4">List Of Kitchen Centers</Typography>
          <Breadcrumbs model="Kitchen Centers" pathname={pathname} navigateDashboard={RoutesPageKey.ADMIN_DASHBOARD} />
        </Stack>
      </Container>
    </>
  );
}

ListKitchenCenterPage.propTypes = {};

export default ListKitchenCenterPage;
