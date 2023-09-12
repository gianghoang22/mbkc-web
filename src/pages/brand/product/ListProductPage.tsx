import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Typography, Stack, Container, Button } from '@mui/material';
// @mui icon
import AddRoundedIcon from '@mui/icons-material/AddRounded';
//
import { RoutesPageKey } from 'common/enum';
import { Breadcrumbs, Helmet } from 'components';

function ListProductPage() {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  return (
    <>
      <Helmet title="List Product | MBKC" />

      <Container>
        <Stack direction="row" alignItems="start" justifyContent="space-between" mb={5}>
          <Stack>
            <Typography variant="h4">List Product</Typography>
            <Breadcrumbs model="Product" pathname={pathname} navigateDashboard={RoutesPageKey.BRAND_DASHBOARD} />
          </Stack>

          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={() => {
              navigate(RoutesPageKey.CREATE_NEW_PRODUCT);
            }}
          >
            Create product
          </Button>
        </Stack>
      </Container>
    </>
  );
}

export default ListProductPage;
