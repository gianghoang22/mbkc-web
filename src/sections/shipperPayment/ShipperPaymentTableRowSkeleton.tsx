// @mui
import { TableCell, TableRow, Skeleton } from '@mui/material';
//

function ShipperPaymentTableRowSkeleton({ length }: { length: number }) {
  return (
    <>
      {Array.from({ length }).map((_, index) => (
        <TableRow hover tabIndex={-1} key={index} sx={{ cursor: 'pointer' }}>
          <TableCell width={60} align="center">
            <Skeleton />
          </TableCell>
          <TableCell align="left">
            <Skeleton />
          </TableCell>

          <TableCell align="left">
            <Skeleton />
          </TableCell>

          <TableCell align="left">
            <Skeleton />
          </TableCell>

          <TableCell align="left">
            <Skeleton />
          </TableCell>

          <TableCell align="left">
            <Skeleton />
          </TableCell>

          <TableCell align="left">
            <Skeleton />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

export default ShipperPaymentTableRowSkeleton;
