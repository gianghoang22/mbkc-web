// @mui
import { IconButton, Skeleton, Stack, TableBody, TableCell, TableRow } from '@mui/material';

interface ProductTableRowSkeletonProps {
  length: number;
  inTab?: boolean;
}

function ProductTableRowSkeleton({ length, inTab = false }: ProductTableRowSkeletonProps) {
  return (
    <TableBody>
      {Array.from({ length: length ? length : 5 }).map((_, index: any) => (
        <TableRow key={index}>
          <TableCell width={60} align="center">
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Skeleton width={20} />
            </Stack>
          </TableCell>
          <TableCell component="th" padding="none" align="center" width={80}>
            <Skeleton variant="circular" width={40} height={40} />
          </TableCell>
          <TableCell component="th" scope="row" padding="none" width={inTab ? 170 : 215}>
            <Skeleton />
          </TableCell>
          <TableCell align="left" width={inTab ? 190 : 180}>
            <Skeleton />
          </TableCell>
          <TableCell align="left" width={inTab ? 115 : 160}>
            <Skeleton />
          </TableCell>
          <TableCell align="left" width={inTab ? 130 : 165}>
            <Skeleton />
          </TableCell>
          <TableCell align="left" width={inTab ? 130 : 165}>
            <Skeleton />
          </TableCell>
          <TableCell align="left">
            <Skeleton variant="rounded" width={100} height={24} />
          </TableCell>
          <TableCell align="right">
            <Stack direction="row" alignItems="center" justifyContent="right">
              <Skeleton variant="rounded" width={30} height={14} />
              <IconButton color="inherit">
                <Skeleton variant="circular" width={28} height={28} />
              </IconButton>
            </Stack>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default ProductTableRowSkeleton;
