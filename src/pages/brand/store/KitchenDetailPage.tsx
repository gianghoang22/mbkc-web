import { useLocation } from 'react-router-dom';
// @mui
import { Typography, Stack, Container } from '@mui/material';
//
import { RoutesPageKey } from 'common/enum';
import { Breadcrumbs, Helmet } from 'components';

function KitchenDetailPage() {
  const { pathname } = useLocation();

  return (
    <>
      <Helmet title="Kitchen Detail | MBKC" />

      <Container>
        <Stack mb={5}>
          <Typography variant="h4">Kitchen Detail</Typography>
          <Breadcrumbs model="Kitchen" pathname={pathname} navigateDashboard={RoutesPageKey.BRAND_DASHBOARD} />
        </Stack>
      </Container>
    </>
  );
}

export default KitchenDetailPage;
