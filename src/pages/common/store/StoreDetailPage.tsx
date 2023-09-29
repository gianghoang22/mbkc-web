import { ReactNode, useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// @mui
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
//
import { Color, Language, PopoverType, Role, Status } from 'common/enum';
import { ConfirmDialog, Label, Page, Popover } from 'components';
import { useLocales, useModal, usePopover } from 'hooks';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { deleteStore, getStoreDetail, setEditStore, setPathToBackStore } from 'redux/store/storeSlice';
import { PATH_ADMIN_APP, PATH_BRAND_APP } from 'routes/paths';
import { StoreDetailPageSkeleton } from 'sections/store';

function StoreDetailPage() {
  const { id: storeId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { translate, currentLang } = useLocales();
  const { handleOpen: handleOpenModal, isOpen: isOpenModal } = useModal();
  const { open: openPopover, handleOpenMenu, handleCloseMenu } = usePopover();

  const { userAuth } = useAppSelector((state) => state.auth);
  const { isLoading, store, pathnameBack } = useAppSelector((state) => state.store);

  const params = useMemo(() => {
    return {
      storeId,
      navigate,
    };
  }, [storeId, navigate]);

  useEffect(() => {
    console.log('fetch');
    dispatch(getStoreDetail(params));
  }, [dispatch, navigate, params]);

  const handleDelete = () => {
    handleOpenModal(store?.name);
    dispatch(deleteStore({ brandId: store?.brand.brandId, storeId: store?.storeId, navigate }));
  };

  return (
    <>
      <Page
        title={translate('page.title.detail', {
          model:
            currentLang.value === Language.ENGLISH
              ? translate('model.capitalize.store')
              : translate('model.lowercase.store'),
        })}
        pathname={pathname}
        navigateDashboard={PATH_BRAND_APP.root}
        actions={() => {
          const listAction: ReactNode[] =
            userAuth?.roleName === Role.MBKC_ADMIN && !(store?.status === Status.DEACTIVE)
              ? [
                  <Button
                    color="inherit"
                    onClick={handleOpenMenu}
                    endIcon={<KeyboardArrowDownIcon />}
                    style={{
                      backgroundColor: '#000',
                      color: '#fff',
                    }}
                    sx={{
                      '.css-1dat9h6-MuiButtonBase-root-MuiButton-root:hover': {
                        backgroundColor: 'rgba(145, 158, 171, 0.08)',
                      },
                    }}
                  >
                    {translate('button.menuAction')}
                  </Button>,
                ]
              : [];
          return listAction;
        }}
      >
        {isLoading ? (
          <StoreDetailPageSkeleton />
        ) : (
          <>
            <Grid container columnSpacing={5} rowSpacing={5}>
              <Grid item xs={12} sm={4} md={4}>
                <Stack width="100%" alignItems="center" justifyContent="center">
                  <img src={store?.logo} alt={store?.name} width="100%" style={{ borderRadius: 16 }} />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={8} md={8}>
                <Stack gap={2}>
                  <Typography variant="h3">{store?.name}</Typography>

                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1">{translate('table.status')}</Typography>
                    <Label
                      color={
                        store?.status === Status.ACTIVE
                          ? Color.SUCCESS
                          : store?.status === Status.INACTIVE
                          ? Color.WARNING
                          : Color.ERROR
                      }
                    >
                      {store?.status === Status.ACTIVE
                        ? translate('status.active')
                        : store?.status === Status.INACTIVE
                        ? translate('status.inactive')
                        : translate('status.deactive')}
                    </Label>
                  </Stack>

                  <Divider />

                  <Stack direction="row" alignItems="start" gap={2}>
                    <Typography variant="subtitle1" width="150px">
                      {translate('table.kitchenCenter')}
                    </Typography>
                    <Stack direction="row" alignItems="start" gap={1}>
                      <img src={store?.kitchenCenter.logo} alt={store?.kitchenCenter.name} height={120} width={120} />
                      <Stack gap={0.5}>
                        <Typography variant="subtitle1">
                          {translate('table.name')}:{' '}
                          <Typography component="span" variant="body1">
                            {store?.kitchenCenter.name}
                          </Typography>
                        </Typography>

                        <Typography variant="subtitle1">
                          {translate('table.address')}:{' '}
                          <Typography component="span" variant="body1">
                            {store?.kitchenCenter.address}
                          </Typography>
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>

                  <Divider />

                  {/* Role = 'MBKC Admin' */}
                  <Stack direction="row" alignItems="start" gap={2}>
                    <Typography variant="subtitle1" width="150px">
                      {translate('table.brand')}
                    </Typography>
                    <Stack direction="row" alignItems="start" gap={1}>
                      <img src={store?.brand.logo} alt={store?.brand.name} height={120} width={120} />
                      <Stack gap={0.5}>
                        <Typography variant="subtitle1">
                          {translate('table.name')}:{' '}
                          <Typography component="span" variant="body1">
                            {store?.brand.name}
                          </Typography>
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>

                  {/* <Divider /> */}

                  {/* <Stack direction="row" alignItems="start">
                  <Typography variant="subtitle1" width="150px">
                    {translate('table.partner')}
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
                </Stack> */}
                </Stack>
              </Grid>
            </Grid>

            <Box mt={10} textAlign="right">
              <Button color="inherit" variant="outlined" onClick={() => navigate(pathnameBack)}>
                {translate('button.back')}
              </Button>
            </Box>
          </>
        )}
      </Page>

      <Popover
        type={PopoverType.ALL}
        open={openPopover}
        handleCloseMenu={handleCloseMenu}
        onDelete={handleOpenModal}
        onEdit={() => {
          navigate(PATH_ADMIN_APP.store.newStore);
          dispatch(setPathToBackStore(pathname));
          dispatch(setEditStore(store));
        }}
      />

      {isOpenModal && (
        <ConfirmDialog
          open={isOpenModal}
          onClose={handleOpenModal}
          onAction={handleDelete}
          model={store?.name}
          title={translate('dialog.confirmDeleteTitle', { model: translate('model.lowercase.store') })}
          description={translate('dialog.confirmDeleteContent', { model: translate('model.lowercase.store') })}
        />
      )}
    </>
  );
}

export default StoreDetailPage;
