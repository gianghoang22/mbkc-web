import { Skeleton, TableCell, TableRow, Typography } from '@mui/material';

function BankingAccountTableRow({ length = 5 }: { length: number }) {
  return (
    <>
      {Array.from({ length }).map((_, index) => (
        <>
          <TableRow key={index} hover tabIndex={-1} sx={{ cursor: 'pointer' }}>
            <TableCell width={100} align="center">
              <Skeleton />
            </TableCell>

            <TableCell scope="row" component="th" width={200}>
              <Skeleton variant="circular" width={40} height={40} />
            </TableCell>
            <TableCell component="th" scope="row">
              <Typography variant="subtitle2" sx={{ width: 292 }} noWrap>
                <Skeleton width={292} />
              </Typography>
            </TableCell>
            <TableCell align="left">
              <Skeleton width={264} />
            </TableCell>
            <TableCell align="right">
              <Skeleton width={72} />
            </TableCell>
          </TableRow>
        </>
      ))}
    </>
  );
}

export default BankingAccountTableRow;
