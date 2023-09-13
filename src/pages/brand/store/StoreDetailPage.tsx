import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Typography, Stack, Container, Grid, Avatar, Divider, Box, Button } from '@mui/material';
//
import { Color, RoutesPageKey } from 'common/enum';
import { Breadcrumbs, Helmet, Label } from 'components';
import { useAppSelector } from 'redux/configStore';

function StoreDetailPage() {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const { store } = useAppSelector((state) => state.store);
  console.log(store);

  return (
    <>
      <Helmet title="Store Detail | MBKC" />

      <Container>
        <Stack mb={7}>
          <Typography variant="h4">Store Detail</Typography>
          <Breadcrumbs model="Store" pathname={pathname} navigateDashboard={RoutesPageKey.BRAND_DASHBOARD} />
        </Stack>

        <Grid container columnSpacing={5}>
          <Grid item md={4}>
            <Box>
              <img src={store?.logo} alt={store?.name} width="100%" style={{ borderRadius: 16 }} />
            </Box>
          </Grid>
          <Grid item md={8}>
            <Stack gap={2}>
              <Typography variant="h3">{store?.name}</Typography>

              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle1">Status</Typography>
                <Label color={(store?.status === 'inactive' && Color.ERROR) || Color.SUCCESS}>{store?.status}</Label>
              </Stack>

              <Divider />

              <Stack direction="row" alignItems="start" gap={2}>
                <Typography variant="subtitle1" width="150px">
                  Kitchen Center
                </Typography>
                <Stack direction="column" alignItems="start" gap={1}>
                  <img src="/assets/images/kitchen/kitchenCenter.png" alt={store?.name} height={120} />
                  <Stack gap={0.5}>
                    <Stack direction="row" gap={0.7}>
                      <Typography variant="subtitle1">Name:</Typography>
                      <Typography variant="body1">Center Đồng Khởi</Typography>
                    </Stack>
                    <Stack direction="row" gap={0.7}>
                      <Typography variant="subtitle1">Address:</Typography>
                      <Typography variant="body1">
                        428 Nguyễn Văn, Long Thạnh Mỹ, Thủ Đức, Thành phố Hồ Chí Minh
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>

              <Divider />

              <Stack direction="row" alignItems="start">
                <Typography variant="subtitle1" width="150px">
                  Partner
                </Typography>
                <Stack direction="row" gap={2.5}>
                  <Stack direction="row" gap={3}>
                    <Stack
                      direction="row"
                      gap={1}
                      sx={(theme) => ({
                        p: 1.2,
                        borderRadius: 1,
                        backgroundColor: theme.palette.grey[200],
                      })}
                    >
                      <Avatar
                        src="/assets/images/kitchen/avatar_1.jpg"
                        alt="partner"
                        variant="rounded"
                        sx={{ width: 45, height: 45 }}
                      />
                      <Typography variant="subtitle2">Shoppe Food</Typography>
                    </Stack>
                  </Stack>
                  <Stack direction="row" gap={3}>
                    <Stack
                      direction="row"
                      gap={1}
                      sx={(theme) => ({
                        p: 1.2,
                        borderRadius: 1,
                        backgroundColor: theme.palette.grey[200],
                      })}
                    >
                      <Avatar
                        src="/assets/images/avatars/avatar_1.jpg"
                        alt="partner"
                        variant="rounded"
                        sx={{ width: 45, height: 45 }}
                      />
                      <Typography variant="subtitle2">Shoppe Food</Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Box mt={10} textAlign="right">
          <Button color="inherit" variant="outlined" onClick={() => navigate(RoutesPageKey.LIST_STORES)}>
            Back
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default StoreDetailPage;
