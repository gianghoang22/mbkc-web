import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Typography, Stack, Container, Button, Box } from '@mui/material';

//@mui Icons
import AddIcon from '@mui/icons-material/Add';

import { RoutesPageKey } from 'common/enum';
import { Breadcrumbs, Helmet } from 'components';

function ListKitchenCenterPage(props: any) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <Helmet title="List Brand Page | MBKC Food" />

      <Container>
        <Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h4">List Of Kitchen Centers</Typography>

            <Button variant="contained" onClick={() => navigate(RoutesPageKey.CREATE_KITCHEN_CENTERS)}>
              <AddIcon />
              <Typography marginLeft={1} fontWeight={600}>
                Create new Kitchen Center
              </Typography>
            </Button>
          </Stack>
          <Breadcrumbs model="Kitchen Centers" pathname={pathname} navigateDashboard={RoutesPageKey.ADMIN_DASHBOARD} />
        </Stack>
      </Container>
    </>
  );
}

ListKitchenCenterPage.propTypes = {};

export default ListKitchenCenterPage;
