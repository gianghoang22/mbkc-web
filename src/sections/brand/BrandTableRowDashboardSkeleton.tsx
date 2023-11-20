import { Skeleton, Stack, TableCell, TableRow } from '@mui/material';

function BrandTableRowDashboardSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell width={60} align="center">
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Skeleton width={20} />
            </Stack>
          </TableCell>
          <TableCell width={80}>
            <Skeleton variant="circular" width={40} height={40} />
          </TableCell>
          <TableCell width={250}>
            <Skeleton />
          </TableCell>
          <TableCell width={350}>
            <Skeleton />
          </TableCell>
          <TableCell width={300}>
            <Skeleton />
          </TableCell>
          <TableCell>
            <Skeleton />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

export default BrandTableRowDashboardSkeleton;
