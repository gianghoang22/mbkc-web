import { Container, Stack, Typography } from '@mui/material';
import { Breadcrumbs, Helmet } from 'components';
import { useLocation } from 'react-router-dom';
import { PATH_ADMIN_APP } from 'routes/paths';

function CreateKitchenCenterPage(props: any) {
  const { pathname } = useLocation();

  return (
    <>
      <Helmet title="Create Kitchen Center Page" />

      <Container>
        <Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h4">Create new Kitchen Center</Typography>
          </Stack>
          <Breadcrumbs pathname={pathname} navigateDashboard={PATH_ADMIN_APP.root} />
        </Stack>
      </Container>
    </>
  );
}

export default CreateKitchenCenterPage;
