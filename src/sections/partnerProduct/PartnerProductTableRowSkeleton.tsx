import { IconButton, Skeleton, Stack, TableBody, TableCell, TableRow } from '@mui/material';

interface ProductTableRowSkeletonProps {
  length: number;
}

function ProductTableRowSkeleton({ length }: ProductTableRowSkeletonProps) {
  return (
    <TableBody>
      {Array.from({ length: length ? length : 5 }).map((_, index: any) => (
        <TableRow key={index} sx={{ height: '72.89px' }}>
          <TableCell width={60} align="center">
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Skeleton width={20} />
            </Stack>
          </TableCell>
          <TableCell component="th" scope="row" padding="none" width={210}>
            <Skeleton />
          </TableCell>
          <TableCell align="left" width={340}>
            <Skeleton />
          </TableCell>
          <TableCell align="left" padding="none" width={140}>
            <Skeleton />
          </TableCell>
          <TableCell align="left" width={246}>
            <Skeleton />
          </TableCell>
          <TableCell align="left">
            <Skeleton variant="rounded" width={120} height={24} />
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
