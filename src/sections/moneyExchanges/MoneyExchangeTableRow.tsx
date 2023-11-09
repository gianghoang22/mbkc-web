// @mui
import { TableCell, TableRow } from '@mui/material';
//
import { MoneyExchange } from 'common/models';
import { Color, ExchangeStatus, ExchangeType } from 'common/enums';
import { Label } from 'components';
import { useLocales, useModal } from 'hooks';
import MoneyExchangeDetailModal from './MoneyExchangeDetailModal';
import { formatCurrency } from 'utils';

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
          {formatCurrency(moneyExchange.amount)}
        </TableCell>

        <TableCell align="left" onClick={handleOpenModalDetail}>
          {moneyExchange.exchangeType === ExchangeType.RECEIVE
            ? translate('table.receive')
            : moneyExchange.exchangeType === ExchangeType.SEND
            ? translate('table.send')
            : translate('table.withdraw')}
        </TableCell>

        <TableCell align="left" onClick={handleOpenModalDetail}>
          <Label color={moneyExchange?.status === ExchangeStatus.SUCCESS ? Color.SUCCESS : Color.ERROR}>
            {moneyExchange?.status === ExchangeStatus.SUCCESS ? translate('status.success') : translate('status.fail')}
          </Label>
        </TableCell>
      </TableRow>

      {isOpenModalDetail && (
        <MoneyExchangeDetailModal
          isOpen={isOpenModalDetail}
          handleOpen={handleOpenModalDetail}
          moneyExchange={moneyExchange}
        />
      )}
    </>
  );
}

export default MoneyExchangeTableRow;
