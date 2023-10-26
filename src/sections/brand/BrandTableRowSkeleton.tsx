import { IconButton, Skeleton, TableCell, Stack, TableRow } from '@mui/material';

function BrandTableRowSkeleton({ length }: { length: number }) {
  return (
    <>
      {Array.from({ length }).map((_, index) => (
        <>
          <TableRow key={index}>
            <TableCell width={60} align="center">
              <Stack direction="row" alignItems="center" justifyContent="center">
                <Skeleton width={20} />
              </Stack>
            </TableCell>

            <TableCell component="th" scope="row" width={80}>
              <Skeleton variant="circular" width={40} height={40} />
            </TableCell>

            <TableCell align="left" width={194}>
              <Skeleton />
            </TableCell>

            <TableCell align="left" width={547}>
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
        </>
      ))}
    </>
  );
}

export default BrandTableRowSkeleton;
