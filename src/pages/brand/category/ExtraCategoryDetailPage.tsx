import { useLocation } from 'react-router-dom';
// @mui
import { Typography, Stack, Container } from '@mui/material';
//
import { RoutesPageKey } from 'common/enum';
import { Breadcrumbs, Helmet } from 'components';

function ExtraCategoryDetailPage() {
  const { pathname } = useLocation();

  return (
    <>
      <Helmet title="Extra Category Detail | MBKC" />

      <Container>
        <Stack mb={5}>
          <Typography variant="h4">Extra Category Detail</Typography>
          <Breadcrumbs model="Extra Category" pathname={pathname} navigateDashboard={RoutesPageKey.BRAND_DASHBOARD} />
        </Stack>
      </Container>
    </>
  );
}

export default ExtraCategoryDetailPage;
