import { Skeleton, TableCell, TableRow, Typography } from '@mui/material';

function KitchenCenterTableRowDashboardSkeleton({ length }: { length: number }) {
  return (
    <>
      {Array.from({ length }).map((_, index) => (
        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell component="th" scope="row">
            <Skeleton />
          </TableCell>
          <TableCell>
            <Skeleton variant="circular" width={40} height={40} />
          </TableCell>
          <TableCell>
            <Typography variant="subtitle2" style={{ marginLeft: 4, fontWeight: 600 }}>
              <Skeleton width={140} />
            </Typography>
          </TableCell>
          <TableCell>
            <Skeleton width={60} />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

export default KitchenCenterTableRowDashboardSkeleton;
