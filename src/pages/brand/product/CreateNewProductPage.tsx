import { useLocation } from 'react-router-dom';
// @mui
import { Container, Stack, Typography } from '@mui/material';
//
import { Breadcrumbs, Helmet } from 'components';
import { PATH_BRAND_APP } from 'routes/paths';

function CreateNewProductPage(props: any) {
  const { pathname } = useLocation();

  return (
    <>
      <Helmet title="Create Product | MBKC" />

      <Container>
        <Stack mb={5}>
          <Typography variant="h4">Create Product</Typography>
          <Breadcrumbs pathname={pathname} navigateDashboard={PATH_BRAND_APP.root} />
        </Stack>
      </Container>
    </>
  );
}

export default CreateNewProductPage;
