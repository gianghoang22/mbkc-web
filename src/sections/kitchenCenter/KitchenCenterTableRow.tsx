// @mui
import { Avatar, IconButton, Switch, TableCell, TableRow } from '@mui/material';
// @mui icon
import MoreVertIcon from '@mui/icons-material/MoreVert';
//
import { KitchenCenter } from '@types';
import { Color, Status } from 'common/enum';
import { ConfirmDialog, Label, Popover } from 'components';
import { useLocales, useModal, usePopover } from 'hooks';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  deleteKitchenCenter,
  setEditKitchenCenter,
  updateStatusKitchenCenter,
} from 'redux/kitchenCenter/kitchenCenterSlice';
import { PATH_ADMIN_APP } from 'routes/paths';

interface KitchenCenterTableRowProps {
  handleNavigateDetail: (kitchenCenter: KitchenCenter, kitchenCenterId: number) => void;
  kitchenCenter: KitchenCenter;
  index: number;
  page: number;
  rowsPerPage: number;
}

function StoreTableRow({ index, kitchenCenter, handleNavigateDetail, page, rowsPerPage }: KitchenCenterTableRowProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { translate } = useLocales();
  const { open, handleOpenMenu, handleCloseMenu } = usePopover();
  const { handleOpen, isOpen } = useModal();

  const handleDelete = () => {
    const kitchenCenterId = kitchenCenter.kitchenCenterId;
    const params = {
      kitchenCenterId,
      navigate,
    };

    dispatch<any>(deleteKitchenCenter(params));
  };

  const handleEdit = () => {
    navigate(PATH_ADMIN_APP.kitchenCenter.root + `/update/${kitchenCenter.kitchenCenterId}`);
    dispatch(setEditKitchenCenter(kitchenCenter));
  };

  const handleChangeStatus = () => {
    const updateStatusParams = {
      kitchenCenterId: kitchenCenter.kitchenCenterId,
      navigate,
      status: `${kitchenCenter.status === Status.ACTIVE ? 'INACTIVE' : 'ACTIVE'}`,
      page: page,
      rowsPerPage: rowsPerPage,
    };

    dispatch<any>(updateStatusKitchenCenter(updateStatusParams));
  };

  return (
    <>
      <TableRow hover tabIndex={-1} key={kitchenCenter.name} sx={{ cursor: 'pointer' }}>
        <TableCell
          width={60}
          align="center"
          onClick={() => handleNavigateDetail(kitchenCenter, kitchenCenter.kitchenCenterId)}
        >
          {index + 1}
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          onClick={() => handleNavigateDetail(kitchenCenter, kitchenCenter.kitchenCenterId)}
        >
          <Avatar alt={kitchenCenter.name} src={kitchenCenter.logo} />
        </TableCell>
        <TableCell align="left" onClick={() => handleNavigateDetail(kitchenCenter, kitchenCenter.kitchenCenterId)}>
          {kitchenCenter.name}
        </TableCell>

        <TableCell align="left" onClick={() => handleNavigateDetail(kitchenCenter, kitchenCenter.kitchenCenterId)}>
          {kitchenCenter.address}
        </TableCell>
        <TableCell align="left">
          <Label
            color={
              kitchenCenter?.status === Status.ACTIVE
                ? Color.SUCCESS
                : kitchenCenter?.status === Status.INACTIVE
                ? Color.WARNING
                : Color.ERROR
            }
          >
            {kitchenCenter?.status === Status.INACTIVE
              ? translate('status.inactive')
              : kitchenCenter?.status === Status.ACTIVE
              ? translate('status.active')
              : translate('status.deactive')}
          </Label>
        </TableCell>
        <TableCell align="right">
          <Switch
            size="small"
            onChange={handleChangeStatus}
            inputProps={{ 'aria-label': 'controlled' }}
            disabled={kitchenCenter.status === Status.DEACTIVE}
            checked={
              kitchenCenter.status === Status.INACTIVE || kitchenCenter.status === Status.DEACTIVE ? false : true
            }
            color={kitchenCenter?.status === Status.INACTIVE ? Color.WARNING : Color.SUCCESS}
          />
          <IconButton color="inherit" onClick={handleOpenMenu}>
            <MoreVertIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover open={open} handleCloseMenu={handleCloseMenu} onEdit={handleEdit} onDelete={handleOpen} />

      {isOpen && (
        <ConfirmDialog
          open={isOpen}
          onClose={handleOpen}
          onAction={handleDelete}
          title={translate('dialog.confirmDeleteTitle', { model: translate('model.lowercase.brand') })}
          description={translate('dialog.confirmDeleteContent', { model: translate('model.lowercase.brand') })}
        />
      )}
    </>
  );
}

export default StoreTableRow;
