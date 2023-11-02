import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Avatar, Collapse, IconButton, Stack, TableCell, TableRow, Typography } from '@mui/material';
// @mui icon
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { setRoutesToBack } from 'redux/routes/routesSlice';
//
import { Order } from '@types';
import { Color, Role, Status } from 'common/enum';
import { Label, Popover } from 'components';
import { useLocales, useModal, usePopover } from 'hooks';
import { PATH_CASHIER_APP, PATH_KITCHEN_CENTER_APP } from 'routes/paths';

interface OrderTableRowProps {
  order: Order;
  index: number;
  page: number;
  rowsPerPage: number;
  selected: readonly string[];
}

function OrderTableRow({ index, order, page, rowsPerPage, selected }: OrderTableRowProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { open, handleCloseMenu } = usePopover();
  const { handleOpen } = useModal();

  const { userAuth } = useAppSelector((state) => state.auth);

  const [openList, setOpenList] = useState(-1);

  const handleNavigateDetail = (orderId: number) => {
    navigate(
      userAuth?.roleName === Role.KITCHEN_CENTER_MANAGER
        ? PATH_KITCHEN_CENTER_APP.order.root + `/${orderId}`
        : PATH_CASHIER_APP.order.root + `/${orderId}`
    );
    dispatch(setRoutesToBack(pathname));
  };

  return (
    <>
      <TableRow hover tabIndex={-1} key={order.customerName} sx={{ cursor: 'pointer' }}>
        <TableCell width={60} align="center" onClick={() => handleNavigateDetail(order.orderId)}>
          {index + 1}
        </TableCell>

        <TableCell align="left" onClick={() => handleNavigateDetail(order.orderId)}>
          {order.orderPartnerId}
        </TableCell>

        <TableCell align="left" onClick={() => handleNavigateDetail(order.orderId)}>
          {order.partnerName}
        </TableCell>

        <TableCell align="left" onClick={() => handleNavigateDetail(order.orderId)}>
          {order.storeName}
        </TableCell>

        <TableCell align="left" onClick={() => handleNavigateDetail(order.orderId)}>
          {order.finalTotalPrice}
        </TableCell>
        <TableCell align="left">
          <Label
            color={
              order?.status === Status.ACTIVE
                ? Color.SUCCESS
                : order?.status === Status.INACTIVE
                ? Color.WARNING
                : Color.ERROR
            }
          >
            {order?.status === Status.INACTIVE
              ? translate('status.inactive')
              : order?.status === Status.ACTIVE
              ? translate('status.active')
              : translate('status.deActive')}
          </Label>
        </TableCell>
        <TableCell align="right">
          <IconButton onClick={() => setOpenList(openList === index ? -1 : index)}>
            {openList === index ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={7} sx={{ paddingBottom: 0, paddingTop: 0, paddingLeft: 5, paddingRight: 5, border: 0 }}>
          <Collapse in={openList === index} timeout="auto" unmountOnExit>
            <Stack direction="column">
              <Stack justifyContent="space-between" direction="row" padding={2}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar alt={'Product Image'} src={'/assets/images/avatars/avatar_1.jpg'} />
                  <Stack direction="column">
                    <Typography variant="subtitle2" noWrap>
                      Food 1
                    </Typography>
                    <Typography variant="body2" noWrap>
                      Food
                    </Typography>
                  </Stack>
                </Stack>
                <Typography>x1</Typography>
                <Typography>45.000đ</Typography>
              </Stack>

              <Stack justifyContent="space-between" direction="row" padding={2}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar alt={'Product Image'} src={'/assets/images/avatars/avatar_1.jpg'} />
                  <Stack direction="column">
                    <Typography variant="subtitle2" noWrap>
                      Food 1
                    </Typography>
                    <Typography variant="body2" noWrap>
                      Food
                    </Typography>
                  </Stack>
                </Stack>
                <Typography>x1</Typography>
                <Typography>45.000đ</Typography>
              </Stack>
            </Stack>
          </Collapse>
        </TableCell>
      </TableRow>

      <Popover open={open} handleCloseMenu={handleCloseMenu} onDelete={handleOpen} />
    </>
  );
}

export default OrderTableRow;
