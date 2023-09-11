import { useLocation } from 'react-router-dom';
// @mui
import { Typography, Stack, Container } from '@mui/material';
//
import { RoutesPageKey } from 'common/enum';
import { Breadcrumbs, Helmet } from 'components';

function CreateNewProductPage(props: any) {
  const { pathname } = useLocation();

  return (
    <>
      <Helmet title="Create Product | MBKC" />

      <Container>
        <Stack mb={5}>
          <Typography variant="h4">Create Product</Typography>
          <Breadcrumbs model="Product" pathname={pathname} navigateDashboard={RoutesPageKey.BRAND_DASHBOARD} />
        </Stack>
      </Container>
    </>
  );
}

export default CreateNewProductPage;
