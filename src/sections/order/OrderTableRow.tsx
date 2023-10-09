// @mui
import { Avatar, Collapse, IconButton, Stack, TableCell, TableRow, Typography } from '@mui/material';
// @mui icon
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
//
import { Order } from '@types';
import { Color, Status } from 'common/enum';
import { Label, Popover } from 'components';
import { useLocales, useModal, usePopover } from 'hooks';
import { useState } from 'react';

interface OrderTableRowProps {
  handleNavigateDetail: (order: Order, orderId: number) => void;
  order: Order;
  index: number;
  page: number;
  rowsPerPage: number;
}

function OrderTableRow({ index, order, handleNavigateDetail, page, rowsPerPage }: OrderTableRowProps) {
  const { translate } = useLocales();
  const { open, handleCloseMenu } = usePopover();
  const { handleOpen } = useModal();

  const [openList, setOpenList] = useState(-1);

  return (
    <>
      <TableRow hover tabIndex={-1} key={order.customerName} sx={{ cursor: 'pointer' }}>
        <TableCell width={60} align="center" onClick={() => handleNavigateDetail(order, order.orderId)}>
          {index + 1}
        </TableCell>

        <TableCell align="left" onClick={() => handleNavigateDetail(order, order.orderId)}>
          {order.orderCode}
        </TableCell>

        <TableCell align="left" onClick={() => handleNavigateDetail(order, order.orderId)}>
          {order.customerName}
        </TableCell>

        <TableCell align="left" onClick={() => handleNavigateDetail(order, order.orderId)}>
          {order.customerPhone}
        </TableCell>

        <TableCell align="left" onClick={() => handleNavigateDetail(order, order.orderId)}>
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
              : translate('status.deactive')}
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
                <Typography>Kitchen Space 1</Typography>
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
                <Typography>Kitchen Space 1</Typography>
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
