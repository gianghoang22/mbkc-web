// @mui
import { TableCell, TableRow } from '@mui/material';
import { Color, PartnerOrderStatus, SystemStatus } from 'common/enums';
//
import { OrderHistory } from 'common/models';
import { Label } from 'components';
import { useLocales } from 'hooks';
import { fDateTime } from 'utils';

interface OrderHistoryTableRowProps {
  orderHistory: OrderHistory;
  index: number;
}

function OrderHistoryTableRow({ index, orderHistory }: OrderHistoryTableRowProps) {
  const { translate } = useLocales();

  return (
    <>
      {orderHistory && (
        <TableRow hover tabIndex={-1} key={orderHistory.orderHistoryId} sx={{ cursor: 'pointer' }}>
          <TableCell width={60} align="center">
            {index + 1}
          </TableCell>

          <TableCell align="left">{fDateTime(orderHistory.createdDate)}</TableCell>

          <TableCell align="left">
            <Label
              color={
                orderHistory?.partnerOrderStatus === PartnerOrderStatus.COMPLETED
                  ? Color.SUCCESS
                  : orderHistory?.partnerOrderStatus === PartnerOrderStatus.CANCELLED
                  ? Color.ERROR
                  : Color.DEFAULT
              }
            >
              {orderHistory?.partnerOrderStatus === PartnerOrderStatus.READY
                ? translate('status.ready')
                : orderHistory?.partnerOrderStatus === PartnerOrderStatus.UPCOMING
                ? translate('status.upcoming')
                : orderHistory?.partnerOrderStatus === PartnerOrderStatus.PREPARING
                ? translate('status.preparing')
                : orderHistory?.partnerOrderStatus === PartnerOrderStatus.COMPLETED
                ? translate('status.completed')
                : translate('status.cancelled')}
            </Label>
          </TableCell>

          <TableCell align="left">
            <Label
              color={
                orderHistory?.systemStatus === SystemStatus.COMPLETED
                  ? Color.SUCCESS
                  : orderHistory?.systemStatus === SystemStatus.CANCELLED
                  ? Color.ERROR
                  : Color.DEFAULT
              }
            >
              {orderHistory?.systemStatus === SystemStatus.IN_STORE
                ? translate('status.inStore')
                : orderHistory?.systemStatus === SystemStatus.READY_DELIVERY
                ? translate('status.readyDelivery')
                : orderHistory?.systemStatus === SystemStatus.COMPLETED
                ? translate('status.completed')
                : translate('status.cancelled')}
            </Label>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

export default OrderHistoryTableRow;
