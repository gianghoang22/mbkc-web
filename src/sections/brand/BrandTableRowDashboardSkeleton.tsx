import { Skeleton, TableCell, TableRow } from '@mui/material';

function BrandTableRowDashboardSkeleton({ length = 3 }: { length: number }) {
  return (
    <>
      {Array.from({ length }).map((_, index) => (
        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell width={60} component="th" scope="row">
            <Skeleton />
          </TableCell>
          <TableCell>
            <Skeleton variant="circular" width={40} height={40} />
          </TableCell>
          <TableCell>
            <Skeleton width={100} />
          </TableCell>
          <TableCell>
            <Skeleton width={600} />
          </TableCell>
          <TableCell>
            <Skeleton width={60} height={30} />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

export default BrandTableRowDashboardSkeleton;
