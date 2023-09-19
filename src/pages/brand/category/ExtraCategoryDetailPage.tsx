import { useLocation } from 'react-router-dom';
// @mui
import { Container, Stack, Typography } from '@mui/material';
//
import { Breadcrumbs, Helmet } from 'components';
import { PATH_BRAND_APP } from 'routes/paths';

function ExtraCategoryDetailPage() {
  const { pathname } = useLocation();

  return (
    <>
      <Helmet title="Extra Category Detail | MBKC" />

      <Container>
        <Stack mb={5}>
          <Typography variant="h4">Extra Category Detail</Typography>
          <Breadcrumbs pathname={pathname} navigateDashboard={PATH_BRAND_APP.root} />
        </Stack>
      </Container>
    </>
  );
}

export default ExtraCategoryDetailPage;
