import { useLocation } from 'react-router-dom';
// @mui
import { Button, Container, Stack, Typography } from '@mui/material';
// @mui icon
import AddRoundedIcon from '@mui/icons-material/AddRounded';
//
import { RoutesPageKey } from 'common/enum';
import { Breadcrumbs, Helmet } from 'components';
import { useModal } from 'hooks/useModal';
import { CreateProductCategoryModal } from 'sections/brand';

function ListProductCategoryPage(props: any) {
  const { pathname } = useLocation();

  const { handleOpen, isOpen } = useModal();

  return (
    <>
      <Helmet title="List Product Category | MBKC" />

      <Container>
        <Stack direction="row" alignItems="start" justifyContent="space-between" mb={5}>
          <Stack>
            <Typography variant="h4">List Product Category</Typography>
            <Breadcrumbs
              model="Product Category"
              pathname={pathname}
              navigateDashboard={RoutesPageKey.BRAND_DASHBOARD}
            />
          </Stack>

          <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={handleOpen}>
            Create product category
          </Button>
        </Stack>
      </Container>

      {isOpen && <CreateProductCategoryModal isOpen={isOpen} handleOpen={handleOpen} />}
    </>
  );
}

export default ListProductCategoryPage;
