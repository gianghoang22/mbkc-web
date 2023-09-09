import { useLocation } from 'react-router-dom';
// @mui
import { Typography, Stack, Container } from '@mui/material';
//
import { RoutesPageKey } from 'common/enum';
import { Breadcrumbs, Helmet } from 'components';

function ListMenuPage(props: any) {
  const { pathname } = useLocation();

  return (
    <>
      <Helmet title="Dashboard | List Menu" />

      <Container>
        <Stack>
          <Typography variant="h4">List Menu</Typography>
          <Breadcrumbs model="Menu" pathname={pathname} navigateDashboard={RoutesPageKey.BRAND_DASHBOARD} />
        </Stack>
      </Container>
    </>
  );
}

ListMenuPage.propTypes = {};

export default ListMenuPage;
