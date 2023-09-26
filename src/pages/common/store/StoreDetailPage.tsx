import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Avatar, Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

//
import { Color, PopoverType } from 'common/enum';
import { ConfirmDialog, Label, Page, Popover } from 'components';
import { useAppSelector } from 'redux/configStore';
import { PATH_ADMIN_APP, PATH_BRAND_APP } from 'routes/paths';
import { useLocales, useModal, usePopover } from 'hooks';
import { useDispatch } from 'react-redux';
import { setEditStore } from 'redux/store/storeSlice';

function StoreDetailPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { translate } = useLocales();
  const { pathname } = useLocation();
  const { handleOpen: handleOpenModal, isOpen: isOpenModal } = useModal();
  const { open: openPopover, handleOpenMenu, handleCloseMenu } = usePopover();

  const { store } = useAppSelector((state) => state.store);

  const handleDelete = () => {
    console.log('Handel delete clicked');
  };

  return (
    <>
      <Page
        title="Store Detail"
        pathname={pathname}
        navigateDashboard={PATH_BRAND_APP.root}
        actions={() => [
          <Button
            color="inherit"
            onClick={handleOpenMenu}
            endIcon={<KeyboardArrowDownIcon />}
            style={{
              backgroundColor: '#000',
              color: '#fff',
              width: 140,
              height: 32,
            }}
            sx={{
              '.css-1dat9h6-MuiButtonBase-root-MuiButton-root:hover': {
                backgroundColor: 'rgba(145, 158, 171, 0.08)',
              },
            }}
          >
            <Typography>Menu Actions</Typography>
          </Button>,
        ]}
      >
        <Grid container columnSpacing={5}>
          <Grid item md={4}>
            <Box>
              <img src={store?.logoUrl} alt={store?.name} width="100%" style={{ borderRadius: 16 }} />
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

              {/* Role = 'MBKC Admin' */}
              <Stack direction="row" alignItems="start" gap={2}>
                <Typography variant="subtitle1" width="150px">
                  Brand
                </Typography>
                <Stack direction="column" alignItems="start" gap={1}>
                  <img src="/assets/images/brands/starbucks.png" alt={store?.name} height={120} />
                  <Stack gap={0.5}>
                    <Stack direction="row" gap={0.7}>
                      <Typography variant="subtitle1">Name:</Typography>
                      <Typography variant="body1">Starbucks</Typography>
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
                        src="/assets/images/avatars/avatar_1.jpg"
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
          <Button color="inherit" variant="outlined" onClick={() => navigate(PATH_BRAND_APP.store.list)}>
            Back
          </Button>
        </Box>
      </Page>

      <Popover
        type={PopoverType.ALL}
        open={openPopover}
        handleCloseMenu={handleCloseMenu}
        onDelete={handleOpenModal}
        onEdit={() => {
          navigate(PATH_ADMIN_APP.store.newStore);
          dispatch(setEditStore(store));
        }}
      />

      {isOpenModal && (
        <ConfirmDialog
          open={isOpenModal}
          onClose={handleOpenModal}
          onAction={handleDelete}
          title={translate('dialog.confirmDeleteTitle', { model: translate('sidebar.store') })}
          description={translate('dialog.confirmDeleteContent', { model: translate('sidebar.store') })}
        />
      )}
    </>
  );
}

export default StoreDetailPage;
