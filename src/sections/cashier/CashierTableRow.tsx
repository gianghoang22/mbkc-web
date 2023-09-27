import { sentenceCase } from 'change-case';
import { useNavigate } from 'react-router-dom';
// @mui
import { Avatar, FormControlLabel, IconButton, Switch, TableCell, TableRow, Typography } from '@mui/material';
// @mui icon
import MoreVertIcon from '@mui/icons-material/MoreVert';
//
import { Cashier } from '@types';
import { Color, Status } from 'common/enum';
import { ConfirmDialog, Label, Popover } from 'components';
import { useLocales, useModal, usePopover } from 'hooks';
import { getCashierDetail_local, setEditCashier } from 'redux/cashier/cashierSlice';
import { useAppDispatch } from 'redux/configStore';
import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';

interface CashierTableRowProps {
  index: number;
  cashier: Cashier;
}

function CashierTableRow({ cashier, index }: CashierTableRowProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { translate } = useLocales();
  const { handleOpen, isOpen } = useModal();
  const { handleOpen: handleOpenDetail, isOpen: isOpenDetail } = useModal();
  const { open, handleOpenMenu, handleCloseMenu } = usePopover();

  const handleOpenModalDetail = () => {
    handleOpenDetail(cashier.fullName);
    dispatch(getCashierDetail_local(cashier));
  };

  const handleEdit = () => {
    navigate(PATH_KITCHEN_CENTER_APP.cashier.root + `/update/${cashier.accountId}`);
    dispatch(setEditCashier(cashier));
  };

  const handleDelete = () => {};

  return (
    <>
      <TableRow hover tabIndex={-1} sx={{ cursor: 'pointer' }}>
        <TableCell width={80} align="center">
          {index + 1}
        </TableCell>

        <TableCell scope="row" component="th" padding="none" width={80} onClick={handleOpenModalDetail}>
          <Avatar alt={cashier.fullName} src={cashier.avatar} />
        </TableCell>
        <TableCell component="th" scope="row" onClick={handleOpenModalDetail}>
          <Typography variant="subtitle2" sx={{ width: 150 }} noWrap>
            {cashier.fullName}
          </Typography>
        </TableCell>
        <TableCell align="left" onClick={handleOpenModalDetail}>
          {cashier.email}
        </TableCell>
        <TableCell align="left" onClick={handleOpenModalDetail}>
          {cashier.gender}
        </TableCell>
        <TableCell align="left">
          <FormControlLabel
            control={<Switch size="small" checked={cashier.status === Status.INACTIVE ? false : true} />}
            label={
              <Label color={(cashier.status === Status.INACTIVE && Color.ERROR) || Color.SUCCESS}>
                {sentenceCase(cashier?.status)}
              </Label>
            }
          />
        </TableCell>
        <TableCell align="right">
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
          title={translate('dialog.confirmDeleteTitle', { model: translate('model.lowercase.cashier') })}
          description={translate('dialog.confirmDeleteContent', { model: translate('model.lowercase.cashier') })}
        />
      )}
    </>
  );
}

export default CashierTableRow;
