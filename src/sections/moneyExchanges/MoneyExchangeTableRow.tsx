// @mui
import { TableCell, TableRow } from '@mui/material';
//
import { MoneyExchange } from 'common/models';
import { Color, Status } from 'common/enums';
import { Label } from 'components';
import { useLocales, useModal } from 'hooks';
import MoneyExchangeDetailModal from './MoneyExchangeDetailModal';

interface MoneyExchangeTableRowProps {
  moneyExchange: MoneyExchange;
  index: number;
  page: number;
  rowsPerPage: number;
}

function MoneyExchangeTableRow({ index, moneyExchange }: MoneyExchangeTableRowProps) {
  const { translate } = useLocales();
  const { handleOpen: handleOpenModalDetail, isOpen: isOpenModalDetail } = useModal();

  return (
    <>
      <TableRow hover tabIndex={-1} key={moneyExchange.amount} sx={{ cursor: 'pointer' }}>
        <TableCell width={60} align="center" onClick={handleOpenModalDetail}>
          {index + 1}
        </TableCell>
        <TableCell align="left" onClick={handleOpenModalDetail}>
          {moneyExchange.senderName}
        </TableCell>

        <TableCell align="left" onClick={handleOpenModalDetail}>
          {moneyExchange.receiveName}
        </TableCell>

        <TableCell align="left" onClick={handleOpenModalDetail}>
          {moneyExchange.amount}
        </TableCell>

        <TableCell align="left" onClick={handleOpenModalDetail}>
          {moneyExchange.exchangeType}
        </TableCell>

        <TableCell align="left" onClick={handleOpenModalDetail}>
          <Label
            color={
              moneyExchange?.status === Status.ACTIVE
                ? Color.SUCCESS
                : moneyExchange?.status === Status.INACTIVE
                ? Color.WARNING
                : Color.ERROR
            }
          >
            {moneyExchange?.status === Status.INACTIVE
              ? translate('status.inactive')
              : moneyExchange?.status === Status.ACTIVE
              ? translate('status.active')
              : translate('status.deActive')}
          </Label>
        </TableCell>
      </TableRow>

      {isOpenModalDetail && <MoneyExchangeDetailModal isOpen={isOpenModalDetail} handleOpen={handleOpenModalDetail} />}
    </>
  );
}

export default MoneyExchangeTableRow;
