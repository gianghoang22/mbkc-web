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
import { Role } from 'common/enum';
import { Label, Popover } from 'components';
import { useLocales, useModal, usePopover } from 'hooks';
import { PATH_CASHIER_APP, PATH_KITCHEN_CENTER_APP } from 'routes/paths';
import { formatCurrency } from 'utils';

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
        <TableCell width={60} align="center" onClick={() => handleNavigateDetail(order.id)}>
          {index + 1}
        </TableCell>

        <TableCell align="left" onClick={() => handleNavigateDetail(order.id)}>
          {order.orderPartnerId}
        </TableCell>

        <TableCell align="left" onClick={() => handleNavigateDetail(order.id)}>
          {order.partner.name}
        </TableCell>

        <TableCell align="left" onClick={() => handleNavigateDetail(order.id)}>
          {order.store.name}
        </TableCell>

        <TableCell align="left" onClick={() => handleNavigateDetail(order.id)}>
          {order.finalTotalPrice}
        </TableCell>
        <TableCell align="left">
          <Label>{order?.systemStatus}</Label>
        </TableCell>
        <TableCell align="left">
          <Label>{order?.partnerOrderStatus}</Label>
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
              {order.orderDetails.map((detail) => {
                return (
                  <Stack justifyContent="space-between" direction="row" padding={2}>
                    <Stack direction="row" alignItems="center" spacing={2} width={200}>
                      <Avatar alt={'Product Image'} src={detail.product.image} />
                      <Stack direction="column">
                        <Typography variant="body2" noWrap>
                          {detail.product.name}
                        </Typography>
                        <Typography variant="caption" color={(theme) => theme.palette.grey[500]}>
                          {detail.product.code}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Typography>x{detail.quantity}</Typography>
                    <Typography>{formatCurrency(detail.product.sellingPrice)}</Typography>
                  </Stack>
                );
              })}
            </Stack>
          </Collapse>
        </TableCell>
      </TableRow>

      <Popover open={open} handleCloseMenu={handleCloseMenu} onDelete={handleOpen} />
    </>
  );
}

export default OrderTableRow;
