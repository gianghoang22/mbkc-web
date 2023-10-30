import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Avatar, IconButton, Switch, TableCell, TableRow, Typography, Stack } from '@mui/material';
// @mui icon
import MoreVertIcon from '@mui/icons-material/MoreVert';
// redux
import { deleteCashier, setEditCashier, updateCashierStatus } from 'redux/cashier/cashierSlice';
import { useAppDispatch } from 'redux/configStore';
import { setRoutesToBack } from 'redux/routes/routesSlice';
//
import { Cashier, OrderSortBy } from '@types';
import { Color, Status } from 'common/enum';
import { ConfirmDialog, Label, Popover } from 'components';
import { useLocales, useModal, usePopover } from 'hooks';
import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';
import CashierDetailModal from './CashierDetailModal';

interface CashierTableRowProps {
  index: number;
  cashier: Cashier;
  page: number;
  rowsPerPage: number;
  selected: readonly string[];
}

function CashierTableRow({ cashier, index, page, rowsPerPage, selected }: CashierTableRowProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { handleOpen, isOpen } = useModal();
  const { handleOpen: handleOpenModalDetail, isOpen: isOpenModalDetail } = useModal();
  const { open, handleOpenMenu, handleCloseMenu } = usePopover();

  const handleEdit = () => {
    navigate(PATH_KITCHEN_CENTER_APP.cashier.root + `/updation/${cashier.accountId}`);
    dispatch(setEditCashier(cashier));
    dispatch(setRoutesToBack(pathname));
  };

  const handleNavigateDetail = () => {
    navigate(PATH_KITCHEN_CENTER_APP.cashier.root + `/${cashier.accountId}`);
    dispatch(setRoutesToBack(pathname));
  };

  const handleDelete = () => {
    const params = {
      cashierId: cashier?.accountId,
      navigate,
      page: page,
      rowsPerPage,
    };

    dispatch(deleteCashier(params));
  };

  const handleChangeStatus = () => {
    const updateStatusParams = {
      cashierId: cashier.accountId,
      navigate,
      status: `${cashier.status === Status.ACTIVE ? Status.INACTIVE : Status.ACTIVE}`,
      page: page + 1,
      rowsPerPage: rowsPerPage,
    };

    dispatch<any>(updateCashierStatus(updateStatusParams));
  };

  return (
    <>
      <TableRow hover tabIndex={-1} sx={{ cursor: 'pointer' }}>
        <TableCell width={80} align="center">
          {index + 1}
        </TableCell>

        {selected.includes(OrderSortBy.AVATAR) && (
          <TableCell scope="row" component="th" padding="none" width={150} onClick={handleNavigateDetail}>
            <Avatar alt={cashier.fullName} src={cashier.avatar} />
          </TableCell>
        )}

        <TableCell
          component="th"
          scope="row"
          onClick={handleNavigateDetail}
          width={
            !selected.includes(OrderSortBy.AVATAR) &&
            !selected.includes(OrderSortBy.EMAIL) &&
            !selected.includes(OrderSortBy.GENDER)
              ? 450
              : !selected.includes(OrderSortBy.EMAIL) && !selected.includes(OrderSortBy.GENDER)
              ? 400
              : !selected.includes(OrderSortBy.AVATAR) && !selected.includes(OrderSortBy.GENDER)
              ? 350
              : !selected.includes(OrderSortBy.AVATAR) && !selected.includes(OrderSortBy.EMAIL)
              ? 350
              : !selected.includes(OrderSortBy.EMAIL)
              ? 280
              : !selected.includes(OrderSortBy.GENDER)
              ? 280
              : 200
          }
        >
          <Typography variant="subtitle2" sx={{ width: 150 }} noWrap>
            {cashier.fullName}
          </Typography>
        </TableCell>

        {selected.includes(OrderSortBy.EMAIL) && (
          <TableCell
            align="left"
            onClick={handleNavigateDetail}
            width={
              !selected.includes(OrderSortBy.AVATAR) && !selected.includes(OrderSortBy.GENDER)
                ? 350
                : !selected.includes(OrderSortBy.AVATAR)
                ? 280
                : !selected.includes(OrderSortBy.GENDER)
                ? 280
                : 200
            }
          >
            {cashier.email}
          </TableCell>
        )}

        {selected.includes(OrderSortBy.GENDER) && (
          <TableCell
            align="left"
            onClick={handleNavigateDetail}
            width={
              !selected.includes(OrderSortBy.AVATAR) && !selected.includes(OrderSortBy.EMAIL)
                ? 350
                : !selected.includes(OrderSortBy.AVATAR)
                ? 250
                : !selected.includes(OrderSortBy.EMAIL)
                ? 280
                : 200
            }
          >
            {cashier.gender}
          </TableCell>
        )}

        <TableCell align="left" onClick={handleNavigateDetail}>
          <Label
            color={
              cashier?.status === Status.ACTIVE
                ? Color.SUCCESS
                : cashier?.status === Status.INACTIVE
                ? Color.WARNING
                : Color.ERROR
            }
          >
            {cashier?.status === Status.INACTIVE
              ? translate('status.inactive')
              : cashier?.status === Status.ACTIVE
              ? translate('status.active')
              : translate('status.deActive')}
          </Label>
        </TableCell>
        <TableCell align="right">
          <Stack direction="row" alignItems="center" justifyContent="right">
            <Switch
              size="small"
              onChange={handleChangeStatus}
              inputProps={{ 'aria-label': 'controlled' }}
              disabled={cashier.status === Status.DEACTIVE}
              checked={cashier.status === Status.INACTIVE || cashier.status === Status.DEACTIVE ? false : true}
              color={cashier?.status === Status.INACTIVE ? Color.WARNING : Color.SUCCESS}
            />
            <IconButton color="inherit" onClick={handleOpenMenu}>
              <MoreVertIcon />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>

      <Popover open={open} handleCloseMenu={handleCloseMenu} onEdit={handleEdit} onDelete={handleOpen} />

      {isOpenModalDetail && (
        <CashierDetailModal
          isOpen={isOpenModalDetail}
          handleOpen={handleOpenModalDetail}
          cashier={cashier}
          page={page}
          rowsPerPage={rowsPerPage}
        />
      )}

      {isOpen && (
        <ConfirmDialog
          open={isOpen}
          onClose={handleOpen}
          onAction={handleDelete}
          model={cashier.fullName}
          title={translate('dialog.confirmDeleteTitle', { model: translate('model.lowercase.cashier') })}
          description={translate('dialog.confirmDeleteContent', { model: translate('model.lowercase.cashier') })}
        />
      )}
    </>
  );
}

export default CashierTableRow;
