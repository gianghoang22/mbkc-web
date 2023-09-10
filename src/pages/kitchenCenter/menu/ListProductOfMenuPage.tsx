import { useLocation } from 'react-router-dom';
// @mui
import { Typography, Stack, Container } from '@mui/material';
//
import { RoutesPageKey } from 'common/enum';
import { Breadcrumbs, Helmet } from 'components';

function ListProductOfMenuPage(props: any) {
  const { pathname } = useLocation();

  return (
    <>
      <Helmet title="List Product Of Menu | MBKC Food" />

      <Container>
        <Stack>
          <Typography variant="h4">List Product Of Menu</Typography>
          <Breadcrumbs model="Menu" pathname={pathname} navigateDashboard={RoutesPageKey.BRAND_DASHBOARD} />
        </Stack>
      </Container>
    </>
  );
}

export default ListProductOfMenuPage;
