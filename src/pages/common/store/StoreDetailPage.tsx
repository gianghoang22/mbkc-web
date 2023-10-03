import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// @mui
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Button, Divider, Grid, Popover as MUIPopover, MenuItem, Stack, Typography } from '@mui/material';
//
import { Color, Language, PopoverType, Role, Status } from 'common/enum';
import { ConfirmDialog, Label, Page, Popover } from 'components';
import { useLocales, useModal, usePopover, useResponsive } from 'hooks';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { setRoutesToBack } from 'redux/routes/routesSlice';
import { deleteStore, getStoreDetail, setEditStore } from 'redux/store/storeSlice';
import { PATH_ADMIN_APP, PATH_BRAND_APP } from 'routes/paths';
import { ConfirmRegistrationStore, StoreDetailPageSkeleton } from 'sections/store';

function StoreDetailPage() {
  const { id: storeId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const mdSm = useResponsive('up', 'md', 'md');
  const mdXs = useResponsive('up', 'xs', 'xs');
  const { translate, currentLang } = useLocales();
  const { handleOpen: handleOpenModal, isOpen: isOpenModal } = useModal();
  const { open: openPopover, handleOpenMenu, handleCloseMenu } = usePopover();
  const { handleOpen: handleOpenConfirm, isOpen: isOpenConfirm } = useModal();
  const {
    open: openConfirm,
    handleOpenMenu: handleOpenMenuConfirm,
    handleCloseMenu: handleCloseMenuConfirm,
  } = usePopover();

  const { userAuth } = useAppSelector((state) => state.auth);
  const { pathnameToBack } = useAppSelector((state) => state.routes);
  const { isLoading, store } = useAppSelector((state) => state.store);

  const [status, setStatus] = useState<Status>(Status.ACTIVE);

  const params = useMemo(() => {
    return {
      storeId,
      navigate,
    };
  }, [storeId, navigate]);

  useEffect(() => {
    dispatch(getStoreDetail(params));
  }, [dispatch, navigate, params]);

  const handleDelete = () => {
    handleOpenModal(store?.name);
    dispatch(
      deleteStore({
        idParams: { storeId: store?.storeId },
        pathname: pathname,
        navigate,
      })
    );
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
            userAuth?.roleName === Role.MBKC_ADMIN &&
            !(store?.status === Status.DEACTIVE) &&
            !(store?.status === Status.REJECTED)
              ? [
                  <Button
                    color="inherit"
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
                    disabled={store?.status === Status.DEACTIVE || store?.status === Status.REJECTED}
                    onClick={handleOpenMenuConfirm}
                  >
                    {translate('button.menuAction')}
                  </Button>,
                ]
              : userAuth?.roleName === Role.BRAND_MANAGER &&
                !(store?.status === Status.DEACTIVE) &&
                !(store?.status === Status.BE_CONFIRMING) &&
                !(store?.status === Status.REJECTED)
              ? [
                  <Button
                    color="inherit"
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
                    disabled={store?.status === Status.DEACTIVE || store?.status === Status.REJECTED}
                    onClick={handleOpenMenu}
                  >
                    {translate('button.menuAction')}
                  </Button>,
                ]
              : [];
          return listAction;
        }}
      >
        {isLoading ? (
          <StoreDetailPageSkeleton rejectedReason={store?.rejectedReason} />
        ) : (
          <>
            <Grid container columnSpacing={5} rowSpacing={5}>
              <Grid item xs={12} sm={4} md={4}>
                <Stack width="100%" alignItems="center" justifyContent="center">
                  <img
                    src={store?.logo}
                    alt={store?.name}
                    style={{ borderRadius: 16, width: mdSm ? '100%' : mdXs ? 300 : 241, objectFit: 'fill' }}
                  />
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
                          : store?.status === Status.BE_CONFIRMING
                          ? Color.SECONDARY
                          : store?.status === Status.REJECTED
                          ? Color.ERROR
                          : Color.ERROR
                      }
                    >
                      {store?.status === Status.INACTIVE
                        ? translate('status.inactive')
                        : store?.status === Status.ACTIVE
                        ? translate('status.active')
                        : store?.status === Status.BE_CONFIRMING
                        ? translate('status.beConfirming')
                        : store?.status === Status.REJECTED
                        ? translate('status.reject')
                        : translate('status.deactive')}
                    </Label>
                  </Stack>

                  <Divider />

                  {store?.rejectedReason !== null && (
                    <>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="subtitle1">{translate('table.rejectedReason')}</Typography>
                        <Typography variant="body1">{store?.rejectedReason}</Typography>
                      </Stack>

                      <Divider />
                    </>
                  )}

                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1">{translate('table.manageEmail')}</Typography>
                    <Typography variant="body1">{store?.storeManagerEmail}</Typography>
                  </Stack>

                  <Divider />

                  <Stack direction="row" alignItems="start" gap={2}>
                    <Typography variant="subtitle1" minWidth={mdSm ? 150 : 110}>
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
                    <Typography variant="subtitle1" minWidth={mdSm ? 150 : 110}>
                      {translate('table.brand')}
                    </Typography>
                    <Stack direction="row" alignItems="start" gap={1}>
                      <Box sx={{ border: 1, borderColor: (theme) => theme.palette.primary.main }}>
                        <img src={store?.brand.logo} alt={store?.brand.name} height={120} width={120} />
                      </Box>
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
              <Button color="inherit" variant="outlined" onClick={() => navigate(pathnameToBack)}>
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
          navigate(PATH_ADMIN_APP.store.root + `/update/${storeId}`);
          dispatch(setRoutesToBack(pathname));
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

      <MUIPopover
        open={Boolean(openConfirm)}
        anchorEl={openConfirm}
        onClose={handleCloseMenuConfirm}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            mt: 0.5,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem
          onClick={() => {
            setStatus(Status.ACTIVE);
            handleOpenConfirm(Status.ACTIVE);
          }}
        >
          <CheckIcon fontSize="small" sx={{ mr: 2 }} />
          {translate('button.accept')}
        </MenuItem>

        <MenuItem
          sx={{ color: 'error.main' }}
          onClick={() => {
            setStatus(Status.REJECTED);
            handleOpenConfirm(Status.REJECTED);
          }}
        >
          <ClearIcon fontSize="small" sx={{ mr: 2 }} />
          {translate('button.reject')}
        </MenuItem>
      </MUIPopover>

      {isOpenConfirm && (
        <ConfirmRegistrationStore
          store={store}
          storeStatus={status}
          isOpen={isOpenConfirm}
          handleOpen={handleOpenConfirm}
          handleCloseMenuConfirm={handleCloseMenuConfirm}
        />
      )}
    </>
  );
}

export default StoreDetailPage;
