import { useLocation } from 'react-router-dom';
// @mui
import { Typography, Stack, Container } from '@mui/material';
//
import { RoutesPageKey } from 'common/enum';
import { Breadcrumbs, Helmet } from 'components';

function EditStorePage() {
  const { pathname } = useLocation();

  return (
    <>
      <Helmet title="Update Store | MBKC" />

      <Container>
        <Stack mb={5}>
          <Typography variant="h4">Update Store</Typography>
          <Breadcrumbs model="Store" pathname={pathname} navigateDashboard={RoutesPageKey.BRAND_DASHBOARD} />
        </Stack>
      </Container>
    </>
  );
}

export default EditStorePage;
