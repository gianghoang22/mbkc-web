// @mui
import { TableCell, TableRow } from '@mui/material';

import { MoneyExchange } from '@types';
import { Color, Status } from 'common/enum';
import { Label } from 'components';
import { useLocales } from 'hooks';

interface MoneyExchangeTableRowProps {
  handleNavigateDetail: (moneyExchange: MoneyExchange, moneyExchangeId: number) => void;
  moneyExchange: MoneyExchange;
  index: number;
  page: number;
  rowsPerPage: number;
}

function MoneyExchangeTableRow({ index, moneyExchange, handleNavigateDetail }: MoneyExchangeTableRowProps) {
  const { translate } = useLocales();

  return (
    <>
      <TableRow hover tabIndex={-1} key={moneyExchange.amount} sx={{ cursor: 'pointer' }}>
        <TableCell
          width={60}
          align="center"
          onClick={() => handleNavigateDetail(moneyExchange, moneyExchange.moneyExchangeId)}
        >
          {index + 1}
        </TableCell>
        <TableCell align="left" onClick={() => handleNavigateDetail(moneyExchange, moneyExchange.moneyExchangeId)}>
          {moneyExchange.sender}
        </TableCell>

        <TableCell align="left" onClick={() => handleNavigateDetail(moneyExchange, moneyExchange.moneyExchangeId)}>
          {moneyExchange.receiver}
        </TableCell>

        <TableCell align="left" onClick={() => handleNavigateDetail(moneyExchange, moneyExchange.moneyExchangeId)}>
          {moneyExchange.amount}
        </TableCell>

        <TableCell align="left" onClick={() => handleNavigateDetail(moneyExchange, moneyExchange.moneyExchangeId)}>
          {moneyExchange.exchangeType}
        </TableCell>

        <TableCell align="left">
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
              : translate('status.deactive')}
          </Label>
        </TableCell>
      </TableRow>
    </>
  );
}

export default MoneyExchangeTableRow;
