import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import DescriptionIcon from '@mui/icons-material/Description';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { Avatar, Box, Card, Grid, IconButton, Stack, Typography, Tooltip } from '@mui/material';
//
import { CategoryStatus, CategoryType } from '@types';
import { Color } from 'common/enum';
import { Label, Page } from 'components';
import { useResponsive } from 'hooks';
import { setCategoryType, setEditCategory } from 'redux/category/categorySlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { PATH_BRAND_APP } from 'routes/paths';
import { ProductTableTab } from 'sections/product';

function ExtraCategoryDetailPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const mdUp = useResponsive('up', 'md', 'md');

  const { category } = useAppSelector((state) => state.category);

  return (
    <>
      <Page title="Extra Category Detail" pathname={pathname} navigateDashboard={PATH_BRAND_APP.root}>
        <Stack direction="row" alignItems="center" spacing={5} mb={7}>
          <Card>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={(theme) => ({
                px: 3,
                py: 0.5,
                bgcolor: theme.palette.grey[200],
              })}
            >
              <Stack direction="row" alignItems="center" gap={0.5}>
                <Typography variant="h6">General information</Typography>
                <DescriptionIcon fontSize="small" />
              </Stack>
              <Tooltip title="Edit" placement="top-end" arrow>
                <IconButton
                  onClick={() => {
                    navigate(PATH_BRAND_APP.category.newCategory);
                    dispatch(setCategoryType(CategoryType.EXTRA));
                    dispatch(setEditCategory(category));
                  }}
                >
                  <EditRoundedIcon />
                </IconButton>
              </Tooltip>
            </Stack>
            <Stack sx={{ px: 3, py: 3 }}>
              <Grid container columnSpacing={2}>
                <Grid item md={3} sm={12}>
                  <Stack width="100%" alignItems="center">
                    <Avatar src={category?.imageUrl} alt={category?.name} sx={{ width: 150, height: 150 }} />
                  </Stack>
                </Grid>
                <Grid item md={9} sm={12}>
                  <Stack gap={1}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Stack direction="row" alignItems="center" gap={0.5}>
                        <Typography variant="subtitle1">Code:</Typography>
                        <Typography variant="body1">{category?.code}</Typography>
                      </Stack>
                      <Label color={(category?.status === CategoryStatus.INACTIVE && Color.ERROR) || Color.SUCCESS}>
                        {category?.status}
                      </Label>
                    </Stack>

                    <Stack direction="row" alignItems="center" gap={0.5}>
                      <Typography variant="subtitle1">Name:</Typography>
                      <Typography variant="body1">{category?.name}</Typography>
                    </Stack>
                    <Box>
                      <Typography variant="subtitle1">Description:</Typography>
                      <Typography variant="body2" sx={{ textAlign: 'justify' }}>
                        {category?.description}
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </Card>

          {mdUp && (
            <Box width={700}>
              <img src="/assets/illustrations/mbkc_cook.svg" alt="login" />
            </Box>
          )}
        </Stack>

        <Stack spacing={1}>
          <Stack direction="row" alignItems="center" gap={0.5}>
            <Typography variant="h6">Products in the category</Typography>
            <DescriptionIcon fontSize="small" />
          </Stack>

          <Card>
            <ProductTableTab />
          </Card>
        </Stack>
      </Page>
    </>
  );
}

export default ExtraCategoryDetailPage;
