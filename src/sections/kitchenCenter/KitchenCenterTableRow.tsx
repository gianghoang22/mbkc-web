// @mui
import { Avatar, FormControlLabel, IconButton, Switch, TableCell, TableRow } from '@mui/material';
// @mui icon
import MoreVertIcon from '@mui/icons-material/MoreVert';
//
import { KitchenCenter } from '@types';
import { sentenceCase } from 'change-case';
import { Color, Status } from 'common/enum';
import { ConfirmDialog, Label, Popover } from 'components';
import { useDispatch } from 'react-redux';
import { deleteKitchenCenter, setEditKitchenCenter } from 'redux/kitchenCenter/kitchenCenterSlice';
import { useNavigate } from 'react-router-dom';
import { PATH_ADMIN_APP } from 'routes/paths';
import { useLocales, useModal, usePopover } from 'hooks';

interface KitchenCenterTableRowProps {
  handleNavigateDetail: (kitchenCenter: KitchenCenter, kitchenCenterId: number) => void;
  kitchenCenter: KitchenCenter;
  index: number;
}

function StoreTableRow(props: KitchenCenterTableRowProps) {
  const { index, kitchenCenter, handleNavigateDetail } = props;
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
