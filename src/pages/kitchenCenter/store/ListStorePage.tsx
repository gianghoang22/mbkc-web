import { useLocation } from 'react-router-dom';
// @mui
import { Typography, Stack, Container } from '@mui/material';
//
import { RoutesPageKey } from 'common/enum';
import { Breadcrumbs, Helmet } from 'components';

function ListStorePage() {
  const { pathname } = useLocation();

  return (
    <>
      <Helmet title="List Kitchen | MBKC Food" />

      <Container>
        <Stack>
          <Typography variant="h4">List Kitchen</Typography>
          <Breadcrumbs model="Kitchen" pathname={pathname} navigateDashboard={RoutesPageKey.BRAND_DASHBOARD} />
        </Stack>
      </Container>
    </>
  );
}

export default ListStorePage;
