import { useLocation } from 'react-router-dom';
// @mui
import { Container, Stack, Typography } from '@mui/material';
//
import { Breadcrumbs, Helmet } from 'components';
import { PATH_ADMIN_APP } from 'routes/paths';

function ListBrandPage(props: any) {
  const { pathname } = useLocation();

  return (
    <>
      <Helmet title="List Brand Page" />

      <Container>
        <Stack>
          <Typography variant="h4">List Of Brand</Typography>
          <Breadcrumbs pathname={pathname} navigateDashboard={PATH_ADMIN_APP.root} />
        </Stack>
      </Container>
    </>
  );
}

ListBrandPage.propTypes = {};

export default ListBrandPage;
