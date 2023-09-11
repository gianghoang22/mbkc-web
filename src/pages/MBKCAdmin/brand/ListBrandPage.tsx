import { useLocation } from 'react-router-dom';
// @mui
import { Typography, Stack, Container } from '@mui/material';
//
import { RoutesPageKey } from 'common/enum';
import { Breadcrumbs, Helmet } from 'components';

function ListBrandPage(props: any) {
  const { pathname } = useLocation();

  return (
    <>
      <Helmet title="List Brand Page | MBKC Food" />

      <Container>
        <Stack>
          <Typography variant="h4">List Of Brand</Typography>
          <Breadcrumbs model="Brand" pathname={pathname} navigateDashboard={RoutesPageKey.ADMIN_DASHBOARD} />
        </Stack>
      </Container>
    </>
  );
}

ListBrandPage.propTypes = {};

export default ListBrandPage;
