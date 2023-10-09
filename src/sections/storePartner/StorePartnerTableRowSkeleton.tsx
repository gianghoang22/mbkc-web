import { IconButton, Skeleton, Stack, TableBody, TableCell, TableRow } from '@mui/material';

function StorePartnerTableRowSkeleton() {
  return (
    <TableBody>
      {Array.from({ length: 5 }).map((_, index: any) => (
        <TableRow key={index}>
          <TableCell width={80} align="center">
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Skeleton width={20} />
            </Stack>
          </TableCell>

          <TableCell width={435.36} align="left">
            <Skeleton />
          </TableCell>

          <TableCell width={452.19} align="left">
            <Skeleton />
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

export default StorePartnerTableRowSkeleton;
