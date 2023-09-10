import { useLocation } from 'react-router-dom';
// @mui
import { Typography, Stack, Container } from '@mui/material';
//
import { RoutesPageKey } from 'common/enum';
import { Breadcrumbs, Helmet } from 'components';

function ListProductCategoryPage(props: any) {
  const { pathname } = useLocation();

  return (
    <>
      <Helmet title="List Product Category | MBKC Food" />

      <Container>
        <Stack>
          <Typography variant="h4">ListProductCategoryPage</Typography>
          <Breadcrumbs model="Product Category" pathname={pathname} navigateDashboard={RoutesPageKey.BRAND_DASHBOARD} />
        </Stack>
      </Container>
    </>
  );
}

export default ListProductCategoryPage;
