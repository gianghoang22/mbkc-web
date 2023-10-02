import { IconButton, Skeleton, Stack, TableBody, TableCell, TableRow } from '@mui/material';
import { Role } from 'common/enum';
import { useAppSelector } from 'redux/configStore';

interface StoreTableRowSkeletonProps {
  length?: number;
  haveBrand?: boolean;
  haveKitchenCenter?: boolean;
  showEmail?: boolean;
}

function StoreTableRowSkeleton({
  length,
  haveBrand = false,
  haveKitchenCenter = false,
  showEmail = false,
}: StoreTableRowSkeletonProps) {
  const { userAuth } = useAppSelector((state) => state.auth);

  return (
    <TableBody>
      {Array.from({ length: length ? length : 5 }).map((_, index: any) => (
        <TableRow key={index}>
          <TableCell width={80} align="center">
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Skeleton width={20} />
            </Stack>
          </TableCell>
          <TableCell component="th" scope="row" padding="none" width={80}>
            <Skeleton variant="circular" width={40} height={40} />
          </TableCell>
          <TableCell
            width={!haveKitchenCenter || !haveBrand ? 240 : !showEmail ? 240 : 180}
            align="left"
            padding="none"
            sx={{ pr: 2 }}
          >
            <Skeleton />
          </TableCell>
          {showEmail && (
            <TableCell width={!haveKitchenCenter || !haveBrand ? 220 : 180} align="left">
              <Skeleton />
            </TableCell>
          )}
          {haveKitchenCenter && (
            <TableCell width={!haveBrand ? 250 : !showEmail ? 250 : 200} align="left">
              <Skeleton />
            </TableCell>
          )}
          {haveBrand && (
            <TableCell width={!haveKitchenCenter ? 240 : !showEmail ? 240 : 160} align="left">
              <Skeleton />
            </TableCell>
          )}
          <TableCell align="left">
            <Skeleton variant="rounded" width={100} height={24} />
          </TableCell>
          <TableCell align="right">
            {userAuth?.roleName === Role.BRAND_MANAGER ? (
              <Stack direction="row" alignItems="center" justifyContent="right">
                <Skeleton variant="rounded" width={30} height={14} />
                <IconButton color="inherit">
                  <Skeleton variant="circular" width={28} height={28} />
                </IconButton>
              </Stack>
            ) : (
              <IconButton color="inherit">
                <Skeleton variant="circular" width={28} height={28} />
              </IconButton>
            )}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default StoreTableRowSkeleton;
