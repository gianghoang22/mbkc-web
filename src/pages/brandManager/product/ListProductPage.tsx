import { useLocation } from 'react-router-dom';
// @mui
import { Typography, Stack, Container } from '@mui/material';
//
import { RoutesPageKey } from 'common/enum';
import { Breadcrumbs, Helmet } from 'components';

function ListProductPage() {
  const { pathname } = useLocation();

  return (
    <>
      <Helmet title="Dashboard | List Product" />

      <Container>
        <Stack>
          <Typography variant="h4">List Product</Typography>
          <Breadcrumbs model="Product" pathname={pathname} navigateDashboard={RoutesPageKey.BRAND_DASHBOARD} />
        </Stack>
      </Container>
    </>
  );
}

export default ListProductPage;
