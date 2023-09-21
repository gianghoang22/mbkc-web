import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import DescriptionIcon from '@mui/icons-material/Description';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Avatar, Box, Card, Grid, IconButton, Stack, Tab, Tooltip, Typography } from '@mui/material';
//
import { CategoryType } from '@types';
import { Color } from 'common/enum';
import { Label, Page } from 'components';
import { useResponsive } from 'hooks';
import { setCategoryType, setEditCategory } from 'redux/category/categorySlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { PATH_BRAND_APP } from 'routes/paths';
import { CategoryTableTab } from 'sections/category';
import { ProductTableTab } from 'sections/product';

function CategoryDetailPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const mdUp = useResponsive('up', 'md', 'md');

  const { category } = useAppSelector((state) => state.category);

  const [activeTab, setActiveTab] = useState('1');

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <Page title="Category Detail" pathname={pathname} navigateDashboard={PATH_BRAND_APP.root}>
        <Stack direction="row" alignItems="center" spacing={5} mb={10}>
          <Card>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                px: 3,
                py: 0.5,
                borderBottom: 1,
                borderColor: 'divider',
              }}
            >
              <Stack direction="row" alignItems="center" gap={0.5}>
                <Typography variant="h6">General information</Typography>
                <DescriptionIcon fontSize="small" />
              </Stack>
              <Tooltip title="Edit" placement="top-end" arrow>
                <IconButton
                  onClick={() => {
                    navigate(PATH_BRAND_APP.category.newCategory);
                    dispatch(setCategoryType(CategoryType.NORMAL));
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
                      <Label color={(category?.status === 'inactive' && Color.ERROR) || Color.SUCCESS}>
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
          <Card>
            <TabContext value={activeTab}>
              <Box>
                <TabList sx={{ height: 50, borderBottom: 1, borderColor: 'divider' }} onChange={handleChangeTab}>
                  <Tab label="Products in the category" value="1" sx={{ height: 50, px: 3 }} />
                  <Tab label="Extra list in category" value="2" sx={{ height: 50, px: 3 }} />
                </TabList>
              </Box>

              <Stack>
                <TabPanel sx={{ p: 0 }} value="1">
                  <ProductTableTab />
                </TabPanel>
                <TabPanel sx={{ p: 0 }} value="2">
                  <CategoryTableTab />
                </TabPanel>
              </Stack>
            </TabContext>
          </Card>
        </Stack>
      </Page>
    </>
  );
}

export default CategoryDetailPage;
