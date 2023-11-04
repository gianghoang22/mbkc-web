import { TableRow, TableCell, Skeleton } from '@mui/material';

function OrderTableRowSkeleton({ length }: { length: number }) {
  return (
    <>
      {Array.from({ length }).map((_, index) => {
        return (
          <TableRow hover tabIndex={-1} key={index}>
            <TableCell width={60} align="center">
              <Skeleton />
            </TableCell>

            <TableCell align="left">
              <Skeleton width={140} />
            </TableCell>

            <TableCell align="left">
              <Skeleton width={120} />
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
    </>
  );
}

export default OrderTableRowSkeleton;
