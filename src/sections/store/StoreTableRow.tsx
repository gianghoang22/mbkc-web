import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Avatar, IconButton, Stack, Switch, TableCell, TableRow, Popover as MUIPopover, MenuItem } from '@mui/material';
// @mui icon
import CheckIcon from '@mui/icons-material/Check';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ClearIcon from '@mui/icons-material/Clear';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
//
import { Params, Store, StoreToUpdateStatus } from '@types';
import { Color, Role, Status } from 'common/enum';
import { ConfirmDialog, Label, Popover } from 'components';
import { useLocales, useModal, usePopover } from 'hooks';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { setRoutesToBack } from 'redux/routes/routesSlice';
import { confirmRegistrationStore, deleteStore, setEditStore, updateStatusStore } from 'redux/store/storeSlice';
import { PATH_ADMIN_APP, PATH_BRAND_APP } from 'routes/paths';
import ConfirmRegistrationStore from './ConfirmRegistrationStore';
import { Tooltip } from '@mui/material';

interface StoreTableRowProps {
  store: Store;
  index: number;
  length?: number;
  page?: number;
  rowsPerPage?: number;
  showAction?: boolean;
  haveBrand?: boolean;
  haveKitchenCenter?: boolean;
  showEmail?: boolean;
}

function StoreTableRow({
  index,
  store,
  page = 1,
  rowsPerPage = 5,
  showAction = false,
  haveBrand = false,
  haveKitchenCenter = false,
  showEmail = false,
}: StoreTableRowProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { handleOpen, isOpen } = useModal();
  const { handleOpen: handleOpenConfirm, isOpen: isOpenConfirm } = useModal();
  const { handleOpen: handleOpenReject, isOpen: isOpenReject } = useModal();
  const {
    open: openConfirm,
    handleOpenMenu: handleOpenMenuConfirm,
    handleCloseMenu: handleCloseMenuConfirm,
  } = usePopover();
  const { open, handleOpenMenu, handleCloseMenu } = usePopover();

  const { userAuth } = useAppSelector((state) => state.auth);

  const handleNavigateDetail = (storeId: number) => {
    navigate(
      userAuth?.roleName === Role.BRAND_MANAGER
        ? PATH_BRAND_APP.store.root + `/detail/${storeId}`
        : PATH_ADMIN_APP.store.root + `/detail/${storeId}`
    );
    dispatch(setRoutesToBack(pathname));
  };

  const handleEdit = () => {
    navigate(PATH_ADMIN_APP.store.root + `/update/${store.storeId}`);
    dispatch(setRoutesToBack(pathname));
    dispatch(setEditStore(store));
  };

  const handleDelete = () => {
    handleOpen(store.name);
    dispatch(
      deleteStore({
        idParams: { storeId: store.storeId },
        optionParams: {
          itemsPerPage: rowsPerPage,
          currentPage: page,
        },
        pathname: pathname,
        navigate,
      })
    );
  };

  const handleUpdateStatus = () => {
    const paramUpdate: Params<StoreToUpdateStatus> = {
      data: {
        status: store.status === Status.ACTIVE ? Status.INACTIVE : Status.ACTIVE,
      },
      idParams: {
        brandId: store?.brand.brandId,
        storeId: store?.storeId,
      },
      optionParams: {
        itemsPerPage: rowsPerPage,
        currentPage: page,
      },
      pathname: pathname,
      navigate,
    };
    dispatch(updateStatusStore(paramUpdate));
  };

  const handleAcceptStore = async () => {
    dispatch(
      confirmRegistrationStore({
        data: { status: Status.ACTIVE, rejectedReason: Status.ACTIVE },
        idParams: { storeId: store.storeId },
        optionParams: {
          itemsPerPage: rowsPerPage,
          currentPage: page,
        },
        pathname: pathname,
        navigate,
      })
    );
  };

  return (
    <>
      <TableRow hover tabIndex={-1} sx={{ cursor: 'pointer', height: '72.89px' }}>
        <TableCell width={80} align="center" onClick={() => handleNavigateDetail(store.storeId)}>
          {index + 1}
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          padding="none"
          width={80}
          onClick={() => handleNavigateDetail(store.storeId)}
        >
          <Avatar alt={store.name} src={store.logo} />
        </TableCell>
        <TableCell
          width={!haveKitchenCenter || !haveBrand ? 240 : !showEmail ? 240 : 180}
          align="left"
          padding="none"
          onClick={() => handleNavigateDetail(store.storeId)}
        >
          {store.name}
        </TableCell>
        {showEmail && (
          <TableCell
            width={!haveKitchenCenter || !haveBrand ? 240 : 180}
            align="left"
            onClick={() => handleNavigateDetail(store.storeId)}
          >
            {store.storeManagerEmail}
          </TableCell>
        )}
        {haveKitchenCenter && (
          <TableCell
            width={!haveBrand ? 250 : !showEmail ? 250 : 200}
            align="left"
            onClick={() => handleNavigateDetail(store.storeId)}
          >
            {store.kitchenCenter.name}
          </TableCell>
        )}
        {haveBrand && (
          <TableCell
            width={!haveKitchenCenter ? 240 : !showEmail ? 240 : 180}
            align="left"
            onClick={() => handleNavigateDetail(store.storeId)}
          >
            {store.brand.name}
          </TableCell>
        )}
        <TableCell align="left">
          <Label
            color={
              store?.status === Status.ACTIVE
                ? Color.SUCCESS
                : store?.status === Status.INACTIVE
                ? Color.WARNING
                : store?.status === Status.BE_CONFIRMING
                ? Color.SECONDARY
                : store?.status === Status.BE_CONFIRMING
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
        </TableCell>

        {showAction && (
          <TableCell align="right">
            {userAuth?.roleName === Role.BRAND_MANAGER ? (
              <Stack direction="row" alignItems="center" justifyContent="right">
                <Switch
                  size="small"
                  onClick={handleUpdateStatus}
                  inputProps={{ 'aria-label': 'controlled' }}
                  disabled={
                    store.status === Status.DEACTIVE ||
                    store.status === Status.BE_CONFIRMING ||
                    store.status === Status.REJECTED
                  }
                  checked={store.status === Status.ACTIVE ? true : false}
                  color={store?.status === Status.INACTIVE ? Color.WARNING : Color.SUCCESS}
                />
                <IconButton
                  color="inherit"
                  disabled={
                    store?.status === Status.DEACTIVE ||
                    store.status === Status.BE_CONFIRMING ||
                    store.status === Status.REJECTED
                  }
                  onClick={handleOpenMenu}
                >
                  <MoreVertIcon />
                </IconButton>
              </Stack>
            ) : (
              <>
                {store?.status === Status.ACTIVE ? (
                  <Tooltip title={translate('status.active')}>
                    <IconButton>
                      <CheckIcon color="success" />
                    </IconButton>
                  </Tooltip>
                ) : store?.status === Status.INACTIVE ? (
                  <Tooltip title={translate('status.inactive')}>
                    <IconButton>
                      <GraphicEqIcon color="warning" />
                    </IconButton>
                  </Tooltip>
                ) : store?.status === Status.REJECTED ? (
                  <Tooltip title={translate('status.reject')}>
                    <IconButton>
                      <ClearIcon color="error" />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <IconButton
                    color="inherit"
                    disabled={store?.status === Status.DEACTIVE}
                    onClick={handleOpenMenuConfirm}
                  >
                    <MoreVertIcon />
                  </IconButton>
                )}
              </>
            )}
          </TableCell>
        )}
      </TableRow>

      <Popover open={open} handleCloseMenu={handleCloseMenu} onEdit={handleEdit} onDelete={handleOpen} />

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
        <MenuItem onClick={handleOpenConfirm}>
          <CheckIcon fontSize="small" sx={{ mr: 2 }} />
          {translate('status.active')}
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }} onClick={handleOpenReject}>
          <ClearIcon fontSize="small" sx={{ mr: 2 }} />
          {translate('button.reject')}
        </MenuItem>
      </MUIPopover>

      {isOpenConfirm && (
        <ConfirmDialog
          open={isOpenConfirm}
          onClose={handleOpenConfirm}
          onAction={handleAcceptStore}
          model={store.name}
          title={translate('dialog.confirmAcceptTitle', { model: translate('model.lowercase.store') })}
          description={translate('dialog.confirmAcceptContent', { model: translate('model.lowercase.store') })}
        />
      )}

      {isOpen && (
        <ConfirmDialog
          open={isOpen}
          onClose={handleOpen}
          onAction={handleDelete}
          model={store.name}
          title={translate('dialog.confirmDeleteTitle', { model: translate('model.lowercase.store') })}
          description={translate('dialog.confirmDeleteContent', { model: translate('model.lowercase.store') })}
        />
      )}

      {isOpenReject && (
        <ConfirmRegistrationStore
          handleCloseMenuConfirm={handleCloseMenuConfirm}
          storeId={store.storeId}
          isOpen={isOpenReject}
          handleOpen={handleOpenReject}
        />
      )}
    </>
  );
}

export default StoreTableRow;
