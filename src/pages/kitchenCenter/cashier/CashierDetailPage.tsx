import moment from 'moment';
import { ReactNode, useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// @mui icon
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// @mui
import { Button, Card, Divider, Grid, Stack, Typography } from '@mui/material';
// redux
import { deleteCashier, getCashierDetail, setEditCashier } from 'redux/cashier/cashierSlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { setRoutesToBack } from 'redux/routes/routesSlice';
// section
import { CashierDetailPageSkeleton } from 'sections/cashier';
//
import { Color, Language, PopoverType, Status } from 'common/enum';
import { ConfirmDialog, Label, Page, Popover } from 'components';
import { useLocales, useModal, usePopover, useResponsive } from 'hooks';
import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';

function CashierDetailPage() {
  const { id: cashierId } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const mdSm = useResponsive('up', 'md', 'md');
  const mdXs = useResponsive('up', 'xs', 'xs');

  const { pathname } = useLocation();
  const { translate, currentLang } = useLocales();
  const { handleOpen: handleOpenModal, isOpen: isOpenModal } = useModal();
  const { open: openPopover, handleOpenMenu, handleCloseMenu } = usePopover();

  const { isLoading: isLoadingCashier, cashier } = useAppSelector((state) => state.cashier);

  const paramsGetCashierDetail = useMemo(() => {
    return {
      cashierId,
      navigate,
    };
  }, [cashierId, navigate]);

  useEffect(() => {
    dispatch(getCashierDetail(paramsGetCashierDetail));
  }, [dispatch, navigate, paramsGetCashierDetail]);

  const handleDelete = () => {
    handleOpenModal(cashier?.fullName);
    dispatch(
      deleteCashier({
        idParams: { categoryId: cashier?.accountId },
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
              ? translate('model.capitalize.cashier')
              : translate('model.lowercase.cashier'),
        })}
        pathname={pathname}
        navigateDashboard={PATH_KITCHEN_CENTER_APP.root}
        actions={() => {
          const listAction: ReactNode[] = [
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
              onClick={handleOpenMenu}
            >
              {translate('button.menuAction')}
            </Button>,
          ];

          return listAction;
        }}
      >
        {isLoadingCashier ? (
          <CashierDetailPageSkeleton />
        ) : (
          <Grid container columnSpacing={4}>
            <Grid item xs={12} sm={4} md={4}>
              <Stack width="100%" alignItems="center" justifyContent="center">
                <Card>
                  <img
                    src={cashier?.avatar}
                    alt={cashier?.fullName}
                    style={{ borderRadius: 16, width: mdSm ? '100%' : mdXs ? 300 : 241, objectFit: 'fill' }}
                  />
                </Card>
              </Stack>
            </Grid>
            <Grid item xs={12} md={8} lg={8}>
              <Stack paddingLeft={4} paddingRight={4}>
                <Typography variant="h3">{cashier?.fullName}</Typography>

                <Stack direction="row" justifyContent="space-between" pt={1} pb={1}>
                  <Typography variant="subtitle1">{translate('common.status')}</Typography>

                  <Label color={(cashier?.status === Status.INACTIVE && Color.ERROR) || Color.SUCCESS}>
                    {cashier?.status === Status.INACTIVE ? translate('status.inactive') : translate('status.active')}
                  </Label>
                </Stack>
                <Divider />

                <Stack direction="row" justifyContent="space-between" pt={2} pb={1}>
                  <Typography variant="subtitle1">{translate('page.form.email')}</Typography>
                  <Typography>{cashier?.email}</Typography>
                </Stack>
                <Divider />

                <Stack direction="row" justifyContent="space-between" pt={2} pb={1}>
                  <Typography variant="subtitle1">{translate('model.capitalizeOne.citizenNumber')}</Typography>
                  <Typography>{cashier?.citizenNumber}</Typography>
                </Stack>
                <Divider />

                <Stack direction="row" justifyContent="space-between" pt={2} pb={1}>
                  <Typography variant="subtitle1">{translate('model.capitalizeOne.dateOfBirth')}</Typography>
                  <Typography>{moment(cashier?.dateOfBirth).format('DD/MM/yyyy')}</Typography>
                </Stack>
                <Divider />

                <Stack direction="row" justifyContent="space-between" pt={2} pb={1}>
                  <Typography variant="subtitle1">{translate('model.capitalizeOne.gender')}</Typography>
                  <Typography>{cashier?.gender}</Typography>
                </Stack>
                <Divider />

                {cashier?.kitchenCenter && (
                  <Stack direction="row" alignItems="start" gap={2} mt={2}>
                    <Typography variant="subtitle1" minWidth={mdSm ? 150 : 110}>
                      {translate('table.kitchenCenter')}
                    </Typography>
                    <Stack direction="row" alignItems="start" gap={2}>
                      <img
                        src={cashier.kitchenCenter.logo}
                        alt={cashier.kitchenCenter.name}
                        height={120}
                        width={120}
                        style={{ borderRadius: 16 }}
                      />
                      <Stack gap={0.5}>
                        <Typography variant="subtitle1">
                          {translate('table.name')}:{' '}
                          <Typography component="span" variant="body1">
                            {cashier.kitchenCenter.name}
                          </Typography>
                        </Typography>

                        <Typography variant="subtitle1">
                          {translate('table.address')}:{' '}
                          <Typography component="span" variant="body1">
                            {cashier.kitchenCenter.address}
                          </Typography>
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                )}
              </Stack>
            </Grid>
          </Grid>
        )}
      </Page>

      <Popover
        type={PopoverType.ALL}
        open={openPopover}
        handleCloseMenu={handleCloseMenu}
        onDelete={handleOpenModal}
        onEdit={() => {
          navigate(PATH_KITCHEN_CENTER_APP.cashier.root + `/updation/${cashierId}`);
          dispatch(setRoutesToBack(pathname));
          dispatch(setEditCashier(cashier));
        }}
      />

      {isOpenModal && (
        <ConfirmDialog
          open={isOpenModal}
          onClose={handleOpenModal}
          onAction={handleDelete}
          model={cashier?.fullName}
          title={translate('dialog.confirmDeleteTitle', { model: translate('model.lowercase.cashier') })}
          description={translate('dialog.confirmDeleteContent', { model: translate('model.lowercase.cashier') })}
        />
      )}
    </>
  );
}

export default CashierDetailPage;
