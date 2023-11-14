import { Skeleton, Stack, TableCell, TableRow } from '@mui/material';

function BrandTableRowDashboardSkeleton({ length = 5 }: { length: number }) {
  return (
    <>
      {Array.from({ length }).map((_, index) => (
        <TableRow key={index}>
          <TableCell width={60} align="center">
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Skeleton width={20} />
            </Stack>
          </TableCell>
          <TableCell width={80}>
            <Skeleton variant="circular" width={40} height={40} />
          </TableCell>
          <TableCell width={290}>
            <Skeleton />
          </TableCell>
          <TableCell width={600}>
            <Skeleton />
          </TableCell>
          <TableCell>
            <Skeleton variant="rounded" width={130} height={24} />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

export default BrandTableRowDashboardSkeleton;
