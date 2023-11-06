// @mui
import { TableCell, TableRow } from '@mui/material';
//
import { OrderHistory } from '@types';
import { Label } from 'components';
import { fDateTime } from 'utils';

interface OrderHistoryTableRowProps {
  orderHistory: OrderHistory;
  index: number;
}

function OrderHistoryTableRow({ index, orderHistory }: OrderHistoryTableRowProps) {
  return (
    <>
      {orderHistory && (
        <TableRow hover tabIndex={-1} key={orderHistory.orderHistoryId} sx={{ cursor: 'pointer' }}>
          <TableCell width={60} align="center">
            {index + 1}
          </TableCell>

          <TableCell align="left">{fDateTime(orderHistory.createdDate)}</TableCell>

          <TableCell align="left">
            <Label>{orderHistory.partnerOrderStatus}</Label>
          </TableCell>

          <TableCell align="left">
            <Label>{orderHistory.systemStatus}</Label>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

export default OrderHistoryTableRow;
