// @mui
import { IconButton, Skeleton, TableCell, TableRow } from '@mui/material';

function StoreTableRow({ length }: { length: number }) {
  return (
    <>
      {Array.from({ length }).map((_, index: any) => (
        <>
          <TableRow hover tabIndex={-1} key={index}>
            <TableCell width={80} align="center">
              <Skeleton />
            </TableCell>
            <TableCell component="th" scope="row" padding="none" sx={{ width: 80 }}>
              <Skeleton variant="circular" width={40} height={40} />
            </TableCell>
            <TableCell align="left" padding="none">
              <Skeleton />
            </TableCell>

            <TableCell align="left">
              <Skeleton />
            </TableCell>

            <TableCell align="left">
              <Skeleton />
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

export default StoreTableRow;
