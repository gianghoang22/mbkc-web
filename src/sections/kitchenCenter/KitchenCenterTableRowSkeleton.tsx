// @mui
import { TableRow, Skeleton, TableCell, IconButton } from '@mui/material'

function KitchenCenterTableRowSkeleton({ length }: { length: number }) {
  return (
    <>
      {Array.from({ length }).map((_, index: any) => (
        <TableRow hover tabIndex={-1} key={index} sx={{ cursor: 'pointer' }}>
          <TableCell width={60} align="center">
            <Skeleton />
          </TableCell>

          <TableCell component="th" scope="row" width={60}>
            <Skeleton variant="circular" width={40} height={40} />
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
            <IconButton color="inherit">
              <Skeleton width={20} />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}

export default KitchenCenterTableRowSkeleton
