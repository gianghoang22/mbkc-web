// @mui
import { IconButton, Skeleton, TableCell, TableRow } from '@mui/material';

function BrandTableRowSkeleton({ length }: { length: number }) {
  return (
    <>
      {Array.from({ length }).map((_, index) => (
        <>
          <TableRow hover tabIndex={-1} key={index} sx={{ cursor: 'pointer' }}>
            <TableCell width={60} align="center">
              <Skeleton />
            </TableCell>

            <TableCell component="th" scope="row" sx={{ width: 80 }}>
              <Skeleton variant="circular" width={40} height={40} />
            </TableCell>

            <TableCell align="left">
              <Skeleton width={158} />
            </TableCell>

            <TableCell align="left">
              <Skeleton width={364} />
            </TableCell>

            <TableCell align="left">
              <Skeleton width={200} />
            </TableCell>

            <TableCell align="right">
              <IconButton color="inherit">
                <Skeleton width={20} />
              </IconButton>
            </TableCell>
          </TableRow>
        </>
      ))}
    </>
  );
}

export default BrandTableRowSkeleton;
