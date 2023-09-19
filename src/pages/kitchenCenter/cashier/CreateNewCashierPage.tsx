import { useLocation } from 'react-router-dom';
// @mui
import { Container, Stack, Typography } from '@mui/material';
//
import { Breadcrumbs, Helmet } from 'components';
import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';

function CreateNewCashierPage() {
  const { pathname } = useLocation();

  return (
    <>
      <Helmet title="Create Kitchen Center Cashier | MBKC Food" />

      <Container>
        <Stack>
          <Typography variant="h4">Create Kitchen Center Cashier</Typography>
          <Breadcrumbs pathname={pathname} navigateDashboard={PATH_KITCHEN_CENTER_APP.root} />
        </Stack>
      </Container>
    </>
  );
}

export default CreateNewCashierPage;
