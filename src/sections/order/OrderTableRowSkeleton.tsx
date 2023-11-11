import { TableRow, TableCell, Skeleton, TableBody } from '@mui/material';

function OrderTableRowSkeleton({ length }: { length: number }) {
  return (
    <TableBody>
      {Array.from({ length: length > 0 ? length : 5 }).map((_, index) => {
        return (
          <TableRow hover tabIndex={-1} key={index}>
            <TableCell width={60} align="center">
              <Skeleton />
            </TableCell>

            <TableCell align="center">
              <Skeleton width={60} />
            </TableCell>

            <TableCell align="left">
              <Skeleton width={100} />
            </TableCell>

            <TableCell align="left">
              <Skeleton width={100} />
            </TableCell>

            <TableCell align="left">
              <Skeleton width={150} />
            </TableCell>

            <TableCell align="left">
              <Skeleton width={100} />
            </TableCell>
            <TableCell align="left">
              <Skeleton width={130} />
            </TableCell>
            <TableCell align="left">
              <Skeleton width={130} />
            </TableCell>
            <TableCell align="right">
              <Skeleton variant="circular" width={30} height={30} />
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
}

export default OrderTableRowSkeleton;
