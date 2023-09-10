import { useLocation } from 'react-router-dom';
// @mui
import { Typography, Stack, Container } from '@mui/material';
//
import { RoutesPageKey } from 'common/enum';
import { Breadcrumbs, Helmet } from 'components';

function EditKitchenPage() {
  const { pathname } = useLocation();

  return (
    <>
      <Helmet title="Update Kitchen | MBKC Food" />

      <Container>
        <Stack>
          <Typography variant="h4">Update Kitchen</Typography>
          <Breadcrumbs model="Kitchen" pathname={pathname} navigateDashboard={RoutesPageKey.BRAND_DASHBOARD} />
        </Stack>
      </Container>
    </>
  );
}

export default EditKitchenPage;
