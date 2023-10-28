// @mui
import { Avatar, IconButton, Switch, TableCell, TableRow, Typography } from '@mui/material';
// @mui icon
import MoreVertIcon from '@mui/icons-material/MoreVert';
//
import { BankingAccount } from '@types';
import { Color, Status } from 'common/enum';
import { ConfirmDialog, Label, Popover } from 'components';
import { useLocales, useModal, usePopover } from 'hooks';
import {
  deleteBankingAccount,
  setEditBankingAccount,
  updateStatusBankingAccount,
} from 'redux/bankingAccount/bankingAccountSlice';
import { useAppDispatch } from 'redux/configStore';
import { useNavigate } from 'react-router-dom';

import BankingAccountDetailModal from './BankingAccountDetailModal';
import CreateBankingAccountModal from './CreateBankingAccountModal';

interface BankingAccountTableRowProps {
  index: number;
  bankingAccount: BankingAccount;
  page: number;
  rowsPerPage: number;
}

function BankingAccountTableRow({ index, bankingAccount, page, rowsPerPage }: BankingAccountTableRowProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { translate } = useLocales();
  const { handleOpen: handleOpenDelete, isOpen: isOpenDelete } = useModal();
  const { handleOpen: handleOpenModalDetail, isOpen: isOpenModalDetail } = useModal();
  const { handleOpen: handleOpenCreate, isOpen: isOpenCreate } = useModal();
  const { open, handleOpenMenu, handleCloseMenu } = usePopover();

  const handleEdit = () => {
    handleOpenCreate();
    dispatch(setEditBankingAccount(bankingAccount));
  };

  const handleDelete = () => {
    handleOpenDelete();
    dispatch(
      deleteBankingAccount({
        idParams: { bankingAccountId: bankingAccount?.bankingAccountId },
        optionParams: {
          itemsPerPage: rowsPerPage,
          currentPage: page + 1,
        },
        navigate,
      })
    );
  };

  const handleChangeStatus = () => {
    const updateStatusParams = {
      bankingAccountId: bankingAccount.bankingAccountId,
      navigate,
      status: `${bankingAccount.status === Status.ACTIVE ? Status.INACTIVE : Status.ACTIVE}`,
      page: page,
      rowsPerPage: rowsPerPage,
    };

    dispatch(updateStatusBankingAccount(updateStatusParams));
  };

  return (
    <>
      <TableRow hover tabIndex={-1} sx={{ cursor: 'pointer' }}>
        <TableCell width={100} align="center">
          {index + 1}
        </TableCell>

        <TableCell scope="row" component="th" width={200} onClick={handleOpenModalDetail}>
          <Avatar alt={bankingAccount.name} src={bankingAccount.logoUrl} />
        </TableCell>
        <TableCell component="th" scope="row" onClick={handleOpenModalDetail}>
          <Typography variant="subtitle2" sx={{ width: 100 }} noWrap>
            {bankingAccount.name}
          </Typography>
        </TableCell>
        <TableCell align="left" onClick={handleOpenModalDetail}>
          <Label
            color={
              bankingAccount?.status === Status.ACTIVE
                ? Color.SUCCESS
                : bankingAccount?.status === Status.INACTIVE
                ? Color.WARNING
                : Color.ERROR
            }
          >
            {bankingAccount?.status === Status.INACTIVE
              ? translate('status.inactive')
              : bankingAccount?.status === Status.ACTIVE
              ? translate('status.active')
              : translate('status.deActive')}
          </Label>
        </TableCell>
        <TableCell align="right">
          <Switch
            value={bankingAccount.status}
            onChange={handleChangeStatus}
            size="small"
            inputProps={{ 'aria-label': 'controlled' }}
            disabled={bankingAccount.status === Status.DEACTIVE}
            checked={
              bankingAccount.status === Status.INACTIVE || bankingAccount.status === Status.DEACTIVE ? false : true
            }
            color={bankingAccount?.status === Status.INACTIVE ? Color.WARNING : Color.SUCCESS}
          />
          <IconButton color="inherit" onClick={handleOpenMenu}>
            <MoreVertIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover open={open} handleCloseMenu={handleCloseMenu} onEdit={handleEdit} onDelete={handleOpenDelete} />

      {isOpenModalDetail && (
        <BankingAccountDetailModal
          isOpen={isOpenModalDetail}
          handleOpen={handleOpenModalDetail}
          bankingAccount={bankingAccount}
        />
      )}

      {isOpenCreate && (
        <CreateBankingAccountModal
          page={page}
          rowsPerPage={rowsPerPage}
          isOpen={isOpenCreate}
          handleOpen={handleOpenCreate}
        />
      )}

      {isOpenDelete && (
        <ConfirmDialog
          open={isOpenDelete}
          onClose={handleOpenDelete}
          onAction={handleDelete}
          model={bankingAccount?.name}
          title={translate('dialog.confirmDeleteTitle', { model: translate('model.capitalize.bankingAccount') })}
          description={translate('dialog.confirmDeleteContent', { model: translate('model.lowercase.bankingAccount') })}
        />
      )}
    </>
  );
}

export default BankingAccountTableRow;
