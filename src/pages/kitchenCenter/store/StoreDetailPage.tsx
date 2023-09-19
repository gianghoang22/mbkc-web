import { useLocation } from 'react-router-dom';
// @mui
import { Container, Stack, Typography } from '@mui/material';
//
import { Breadcrumbs, Helmet } from 'components';
import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';

function StoreDetailPage() {
  const { pathname } = useLocation();

  return (
    <>
      <Helmet title="Kitchen Detail | MBKC" />

      <Container>
        <Stack>
          <Typography variant="h4">Kitchen Detail</Typography>
          <Breadcrumbs pathname={pathname} navigateDashboard={PATH_KITCHEN_CENTER_APP.root} />
        </Stack>
      </Container>
    </>
  );
}

export default StoreDetailPage;
