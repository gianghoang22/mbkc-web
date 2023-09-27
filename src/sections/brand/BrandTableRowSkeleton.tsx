import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Avatar, FormControlLabel, IconButton, Skeleton, Switch, TableCell, TableRow } from '@mui/material';
// @mui icon
import MoreVertIcon from '@mui/icons-material/MoreVert';
//
import { Brand } from '@types';
import { Color, Status } from 'common/enum';
import { ConfirmDialog, Label, Popover } from 'components';
import { useLocales, useModal, usePopover } from 'hooks';
import { getBrandDetail_local, setEditBrand, setPathToBackBrand } from 'redux/brand/brandSlice';
import { useAppDispatch } from 'redux/configStore';
import { PATH_ADMIN_APP } from 'routes/paths';

function BrandTableRowSkeleton({ length }: { length: number }) {
  return (
    <>
      {Array.from({ length }).map((_, index) => (
        <>
          <TableRow hover tabIndex={-1} key={index} sx={{ cursor: 'pointer' }}>
            <TableCell width={60} align="center">
              <Skeleton />
            </TableCell>

            <TableCell component="th" scope="row" sx={{ width: 80 }}>
              <Skeleton variant="circular" width={40} height={40} />
            </TableCell>

            <TableCell align="left">
              <Skeleton width={158} />
            </TableCell>

            <TableCell align="left">
              <Skeleton width={364} />
            </TableCell>

            <TableCell align="left">
              <Skeleton width={200} />
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

export default BrandTableRowSkeleton;
