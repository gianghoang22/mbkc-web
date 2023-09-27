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
import { getStoreDetail_local, setEditStore, setPathToBack } from 'redux/store/storeSlice';
import { PATH_ADMIN_APP, PATH_BRAND_APP } from 'routes/paths';

interface StoreTableRowProps {
  store: Store;
  index: number;
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
    dispatch(setPathToBack(pathname));
    dispatch(getStoreDetail_local(store));
  };

  const handleEdit = () => {
    navigate(PATH_ADMIN_APP.store.root + `/update/${store.storeId}`);
    dispatch(setPathToBack(pathname));
    dispatch(setEditStore(store));
  };

  const handleDelete = () => {};

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
          <Avatar alt={store.name} src={store.logoUrl} />
        </TableCell>
        <TableCell align="left" padding="none" onClick={() => handleNavigateDetail(store, store.storeId)}>
          {store.name}
        </TableCell>
        {haveKitchenCenter && (
          <TableCell align="left" onClick={() => handleNavigateDetail(store, store.storeId)}>
            {store.kitchenCenter}
          </TableCell>
        )}
        {haveBrand && (
          <TableCell align="left" onClick={() => handleNavigateDetail(store, store.storeId)}>
            {store.brand}
          </TableCell>
        )}
        <TableCell align="left" width={120} onClick={() => handleNavigateDetail(store, store.storeId)}>
          {store.partner}
        </TableCell>

        <TableCell align="left">
          <FormControlLabel
            control={<Switch size="small" checked={store.status === Status.INACTIVE ? false : true} />}
            label={
              <Label color={(store.status === Status.INACTIVE && Color.ERROR) || Color.SUCCESS}>
                {store?.status === Status.INACTIVE ? translate('status.inactive') : translate('status.active')}
              </Label>
            }
          />
        </TableCell>
        {showAction && (
          <TableCell align="right">
            <IconButton color="inherit" onClick={handleOpenMenu}>
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
          title={translate('dialog.confirmDeleteTitle', { model: translate('model.lowercase.store') })}
          description={translate('dialog.confirmDeleteContent', { model: translate('model.lowercase.store') })}
        />
      )}
    </>
  );
}

export default StoreTableRow;
