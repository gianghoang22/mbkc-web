// @mui
import { Stack, TableCell, TableRow, Avatar, Typography } from '@mui/material';
//
import { Shift } from 'common/models';

interface MoneyExchangeTableRowProps {
  shift: Shift;
  index: number;
  page: number;
  rowsPerPage: number;
}

function MoneyExchangeTableRow({ index, shift }: MoneyExchangeTableRowProps) {
  return (
    <>
      <TableRow hover tabIndex={-1} key={shift.shiftId} sx={{ cursor: 'pointer' }}>
        <TableCell width={60} align="center">
          {index + 1}
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar src={shift.cashierImage} sx={{ width: 30, height: 30 }} />
            <Stack>
              <Typography variant="body2">{shift.cashierName}</Typography>
              <Typography variant="caption" color={(theme) => theme.palette.grey[600]}>
                {shift.kitchenCenterName}
              </Typography>
            </Stack>
          </Stack>
        </TableCell>

        <TableCell>{shift.date}</TableCell>

        <TableCell>{shift.totalOrder}</TableCell>

        <TableCell>{shift.totalMoneyInWallet}</TableCell>

        <TableCell>{shift.totalMoneyOfToday}</TableCell>
      </TableRow>
    </>
  );
}

export default MoneyExchangeTableRow;
