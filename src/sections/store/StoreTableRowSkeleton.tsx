import { IconButton, Skeleton, Stack, TableBody, TableCell, TableRow } from '@mui/material';

interface StoreTableRowSkeletonProps {
  length?: number;
  haveBrand?: boolean;
  haveKitchenCenter?: boolean;
}

function StoreTableRowSkeleton({ length, haveBrand = false, haveKitchenCenter = false }: StoreTableRowSkeletonProps) {
  return (
    <TableBody>
      {Array.from({ length: length ? length : 5 }).map((_, index: any) => (
        <TableRow key={index}>
          <TableCell width={80} align="center">
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Skeleton width={15} />
            </Stack>
          </TableCell>
          <TableCell component="th" scope="row" padding="none" sx={{ width: 80 }}>
            <Skeleton variant="circular" width={40} height={40} />
          </TableCell>
          <TableCell width={180} align="left" padding="none" sx={{ pr: 2 }}>
            <Skeleton />
          </TableCell>
          <TableCell width={180} align="left" padding="none">
            <Skeleton />
          </TableCell>
          {haveKitchenCenter && (
            <TableCell width={200} align="left">
              <Skeleton />
            </TableCell>
          )}
          {haveBrand && (
            <TableCell width={160} align="left">
              <Skeleton />
            </TableCell>
          )}
          <TableCell align="left">
            <Skeleton variant="rounded" width={120} height={24} />
          </TableCell>
          <TableCell align="right">
            <IconButton color="inherit">
              <Skeleton variant="circular" width={28} height={28} />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default StoreTableRowSkeleton;
