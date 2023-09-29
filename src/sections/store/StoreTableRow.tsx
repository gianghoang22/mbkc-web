import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Avatar, FormControlLabel, IconButton, Switch, TableCell, TableRow } from '@mui/material';
// @mui icon
import MoreVertIcon from '@mui/icons-material/MoreVert';
//
import { Store } from '@types';
import { Color, Role, Status } from 'common/enum';
import { ConfirmDialog, Label, Popover } from 'components';
import { useLocales, useModal, usePopover } from 'hooks';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { deleteStore, setEditStore, setPathToBackStore } from 'redux/store/storeSlice';
import { PATH_ADMIN_APP, PATH_BRAND_APP } from 'routes/paths';

interface StoreTableRowProps {
  store: Store;
  index: number;
  length?: number;
  showAction?: boolean;
  haveBrand?: boolean;
  haveKitchenCenter?: boolean;
}

function StoreTableRow({
  index,
  store,
  showAction = false,
  haveBrand = false,
  haveKitchenCenter = false,
}: StoreTableRowProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { handleOpen, isOpen } = useModal();
  const { open, handleOpenMenu, handleCloseMenu } = usePopover();

  const { userAuth } = useAppSelector((state) => state.auth);

  const handleNavigateDetail = (store: Store, storeId: number) => {
    navigate(
      userAuth?.roleName === Role.BRAND_MANAGER
        ? PATH_BRAND_APP.store.root + `/detail/${storeId}`
        : PATH_ADMIN_APP.store.root + `/detail/${storeId}`
    );
    dispatch(setPathToBackStore(pathname));
  };

  const handleEdit = () => {
    navigate(PATH_ADMIN_APP.store.root + `/update/${store.storeId}`);
    dispatch(setPathToBackStore(pathname));
    dispatch(setEditStore(store));
  };

  const handleDelete = () => {
    handleOpen(store.name);
    dispatch(deleteStore({ brandId: store.brand.brandId, storeId: store.storeId, navigate }));
  };

  return (
    <>
      <TableRow hover tabIndex={-1} key={store.name} sx={{ cursor: 'pointer', height: '72.89px' }}>
        <TableCell width={80} align="center" onClick={() => handleNavigateDetail(store, store.storeId)}>
          {index + 1}
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          padding="none"
          sx={{ width: 80 }}
          onClick={() => handleNavigateDetail(store, store.storeId)}
        >
          <Avatar alt={store.name} src={store.logo} />
        </TableCell>
        <TableCell width={180} align="left" padding="none" onClick={() => handleNavigateDetail(store, store.storeId)}>
          {store.name}
        </TableCell>
        <TableCell width={180} align="left" padding="none" onClick={() => handleNavigateDetail(store, store.storeId)}>
          {store.storeManagerEmail}
        </TableCell>
        {haveKitchenCenter && (
          <TableCell width={200} align="left" onClick={() => handleNavigateDetail(store, store.storeId)}>
            {store.kitchenCenter.name}
          </TableCell>
        )}
        {haveBrand && (
          <TableCell width={160} align="left" onClick={() => handleNavigateDetail(store, store.storeId)}>
            {store.brand.name}
          </TableCell>
        )}
        <TableCell align="left">
          <FormControlLabel
            control={
              <Switch
                size="small"
                disabled={store.status === Status.DEACTIVE}
                checked={store.status === Status.INACTIVE || store.status === Status.DEACTIVE ? false : true}
                color={store?.status === Status.INACTIVE ? Color.WARNING : Color.SUCCESS}
              />
            }
            label={
              <Label
                color={
                  store?.status === Status.ACTIVE
                    ? Color.SUCCESS
                    : store?.status === Status.INACTIVE
                    ? Color.WARNING
                    : Color.ERROR
                }
              >
                {store?.status === Status.INACTIVE
                  ? translate('status.inactive')
                  : store?.status === Status.ACTIVE
                  ? translate('status.active')
                  : translate('status.deactive')}
              </Label>
            }
          />
        </TableCell>

        {showAction && (
          <TableCell align="right">
            <IconButton color="inherit" disabled={store?.status === Status.DEACTIVE} onClick={handleOpenMenu}>
              <MoreVertIcon />
            </IconButton>
          </TableCell>
        )}
      </TableRow>

      <Popover open={open} handleCloseMenu={handleCloseMenu} onEdit={handleEdit} onDelete={handleOpen} />

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
    </>
  );
}

export default StoreTableRow;
