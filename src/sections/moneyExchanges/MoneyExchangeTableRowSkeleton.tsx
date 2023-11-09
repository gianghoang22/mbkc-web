// @mui
import { TableCell, TableRow, Skeleton } from '@mui/material';
//

function MoneyExchangeTableRowSkeleton({ length }: { length: number }) {
  return (
    <>
      {Array.from({ length }).map((_, index) => (
        <TableRow hover tabIndex={-1} key={index} sx={{ cursor: 'pointer' }}>
          <TableCell width={60} align="center">
            <Skeleton />
          </TableCell>
          <TableCell align="left">
            <Skeleton width={180} />
          </TableCell>

          <TableCell align="left">
            <Skeleton width={180} />
          </TableCell>

          <TableCell align="left">
            <Skeleton width={170} />
          </TableCell>

          <TableCell align="left">
            <Skeleton width={150} />
          </TableCell>

          <TableCell align="left">
            <Skeleton width={120} />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

export default MoneyExchangeTableRowSkeleton;
