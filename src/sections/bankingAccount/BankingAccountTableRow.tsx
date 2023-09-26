import { sentenceCase } from 'change-case';
// @mui
import { Avatar, FormControlLabel, IconButton, Switch, TableCell, TableRow, Typography } from '@mui/material';
// @mui icon
import MoreVertIcon from '@mui/icons-material/MoreVert';
//
import { BankingAccount } from '@types';
import { Color, Status } from 'common/enum';
import { ConfirmDialog, Label, Popover } from 'components';
import { useLocales, useModal, usePopover } from 'hooks';
import { getBankingAccountDetail_local, setEditBankingAccount } from 'redux/bankingAccount/bankingAccountSlice';
import { useAppDispatch } from 'redux/configStore';

interface BankingAccountTableRowProps {
  index: number;
  bankingAccount: BankingAccount;
}

function BankingAccountTableRow({ index, bankingAccount }: BankingAccountTableRowProps) {
  const dispatch = useAppDispatch();
  const { translate } = useLocales();
  const { handleOpen, isOpen } = useModal();
  const { handleOpen: handleOpenCreate, isOpen: isOpenCreate } = useModal();
  const { open, handleOpenMenu, handleCloseMenu } = usePopover();

  const handleOpenModalCreate = () => {
    handleOpenCreate(bankingAccount.name);
    dispatch(getBankingAccountDetail_local(bankingAccount));
  };

  const handleEdit = () => {
    dispatch(setEditBankingAccount(bankingAccount));
  };

  const handleDelete = () => {};

  return (
    <>
      <TableRow hover tabIndex={-1} sx={{ cursor: 'pointer' }}>
        <TableCell width={80} align="center">
          {index + 1}
        </TableCell>

        <TableCell scope="row" component="th" padding="none" width={80} onClick={handleOpenModalCreate}>
          <Avatar alt={bankingAccount.name} src={bankingAccount.logoUrl} />
        </TableCell>
        <TableCell component="th" scope="row" onClick={handleOpenModalCreate}>
          <Typography variant="subtitle2" sx={{ width: 150 }} noWrap>
            {bankingAccount.name}
          </Typography>
        </TableCell>
        <TableCell align="left" onClick={handleOpenModalCreate}>
          {bankingAccount.numberAccount}
        </TableCell>
        <TableCell align="left">
          <FormControlLabel
            control={<Switch size="small" checked={bankingAccount.status === Status.INACTIVE ? false : true} />}
            label={
              <Label color={(bankingAccount.status === Status.INACTIVE && Color.ERROR) || Color.SUCCESS}>
                {sentenceCase(bankingAccount?.status)}
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
          title={translate('dialog.confirmDeleteTitle', { model: translate('model.bankingAccount') })}
          description={translate('dialog.confirmDeleteContent', { model: translate('model.bankingAccount') })}
        />
      )}
    </>
  );
}

export default BankingAccountTableRow;
