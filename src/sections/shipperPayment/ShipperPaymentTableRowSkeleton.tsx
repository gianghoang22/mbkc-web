import { TableCell, TableRow, Skeleton, TableBody, Stack } from '@mui/material';

function ShipperPaymentTableRowSkeleton() {
  return (
    <TableBody>
      {Array.from({ length: 5 }).map((_, index) => (
        <TableRow tabIndex={-1} key={index} sx={{ cursor: 'pointer', height: '60px' }}>
          <TableCell width={60} align="center">
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Skeleton width={20} />
            </Stack>
          </TableCell>

          <TableCell width={125}>
            <Skeleton />
          </TableCell>

          <TableCell width={180}>
            <Skeleton />
          </TableCell>

          <TableCell width={155}>
            <Skeleton />
          </TableCell>

          <TableCell width={117}>
            <Skeleton />
          </TableCell>

          <TableCell width={140}>
            <Skeleton />
          </TableCell>

          <TableCell width={192}>
            <Skeleton />
          </TableCell>

          <TableCell width={190}>
            <Skeleton />
          </TableCell>

          <TableCell>
            <Skeleton variant="rounded" width={130} height={24} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default ShipperPaymentTableRowSkeleton;
