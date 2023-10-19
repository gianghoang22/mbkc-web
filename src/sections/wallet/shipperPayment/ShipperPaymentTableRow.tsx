// @mui
import { TableCell, TableRow } from '@mui/material';

import { ShipperPayment } from '@types';
import { Color, Status } from 'common/enum';
import { Label } from 'components';
import { useLocales } from 'hooks';

interface ShipperPaymentTableRowProps {
  handleNavigateDetail: (shipperPayment: ShipperPayment, paymentId: number) => void;
  shipperPayment: ShipperPayment;
  index: number;
  page: number;
  rowsPerPage: number;
}

function ShipperPaymentTableRow({ index, shipperPayment, handleNavigateDetail }: ShipperPaymentTableRowProps) {
  const { translate } = useLocales();

  return (
    <>
      <TableRow hover tabIndex={-1} key={shipperPayment.paymentId} sx={{ cursor: 'pointer' }}>
        <TableCell
          width={60}
          align="center"
          onClick={() => handleNavigateDetail(shipperPayment, shipperPayment.paymentId)}
        >
          {index + 1}
        </TableCell>
        <TableCell align="left" onClick={() => handleNavigateDetail(shipperPayment, shipperPayment.paymentId)}>
          {shipperPayment.order}
        </TableCell>

        <TableCell align="left" onClick={() => handleNavigateDetail(shipperPayment, shipperPayment.paymentId)}>
          {shipperPayment.createdDate}
        </TableCell>

        <TableCell align="left" onClick={() => handleNavigateDetail(shipperPayment, shipperPayment.paymentId)}>
          {shipperPayment.createdBy}
        </TableCell>

        <TableCell align="left" onClick={() => handleNavigateDetail(shipperPayment, shipperPayment.paymentId)}>
          {shipperPayment.amount}
        </TableCell>

        <TableCell align="left" onClick={() => handleNavigateDetail(shipperPayment, shipperPayment.paymentId)}>
          {shipperPayment.paymentMethod}
        </TableCell>

        <TableCell align="left" onClick={() => handleNavigateDetail(shipperPayment, shipperPayment.paymentId)}>
          {shipperPayment.KCBankingAccount}
        </TableCell>

        <TableCell align="left">
          <Label
            color={
              shipperPayment?.status === Status.ACTIVE
                ? Color.SUCCESS
                : shipperPayment?.status === Status.INACTIVE
                ? Color.WARNING
                : Color.ERROR
            }
          >
            {shipperPayment?.status === Status.INACTIVE
              ? translate('status.inactive')
              : shipperPayment?.status === Status.ACTIVE
              ? translate('status.active')
              : translate('status.deActive')}
          </Label>
        </TableCell>
      </TableRow>
    </>
  );
}

export default ShipperPaymentTableRow;
