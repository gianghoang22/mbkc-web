import { Skeleton, TableCell, TableRow, Typography } from '@mui/material'

function CashierTableRow({ length }: { length: number }) {
  return (
    <>
      {Array.from({ length }).map((_, index) => (
        <>
          <TableRow hover tabIndex={-1} key={index} sx={{ cursor: 'pointer' }}>
            <TableCell width={80} align="center">
              <Skeleton />
            </TableCell>

            <TableCell scope="row" component="th" padding="none" width={100}>
              <Skeleton variant="circular" width={40} height={40} />
            </TableCell>
            <TableCell component="th" scope="row">
              <Skeleton />
            </TableCell>
            <TableCell align="left">
              <Skeleton />
            </TableCell>
            <TableCell align="left">
              <Skeleton />
            </TableCell>
            <TableCell align="left">
              <Skeleton />
            </TableCell>
            <TableCell align="right">
              <Skeleton />
            </TableCell>
          </TableRow>
        </>
      ))}
    </>
  )
}

export default CashierTableRow
