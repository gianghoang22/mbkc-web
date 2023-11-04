import { Skeleton, TableCell, TableRow } from '@mui/material';

function OrderHistoryTableRowSkeleton({ length }: { length: number }) {
  return (
    <>
      {Array.from({ length: length }).map((_, index) => {
        return (
          <TableRow hover tabIndex={-1} key={index} sx={{ cursor: 'pointer' }}>
            <TableCell width={60} align="center">
              <Skeleton width={50} />
            </TableCell>

            <TableCell align="left">
              <Skeleton width={100} />
            </TableCell>

            <TableCell align="left">
              <Skeleton width={100} />
            </TableCell>

            <TableCell align="left">
              <Skeleton width={100} />
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
}

export default OrderHistoryTableRowSkeleton;
