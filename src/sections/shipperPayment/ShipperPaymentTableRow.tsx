// @mui
import { TableCell, TableRow } from '@mui/material';
//
import { ShipperPayment } from 'common/models';
import { Color, FilterStatus, PaymentMethod } from 'common/enums';
import { Label } from 'components';
import { useLocales, useModal } from 'hooks';
import ShipperPaymentDetailModal from './ShipperPaymentDetailModal';
import { fDateTime, formatCurrency } from 'utils';

interface ShipperPaymentTableRowProps {
  shipperPayment: ShipperPayment;
  index: number;
  page: number;
  rowsPerPage: number;
}

function ShipperPaymentTableRow({ index, shipperPayment }: ShipperPaymentTableRowProps) {
  const { translate } = useLocales();
  const { handleOpen: handleOpenModalDetail, isOpen: isOpenModalDetail } = useModal();

  return (
    <>
      <TableRow hover tabIndex={-1} key={shipperPayment.paymentId} sx={{ cursor: 'pointer' }}>
        <TableCell width={60} align="center" onClick={handleOpenModalDetail}>
          {index + 1}
        </TableCell>
        <TableCell align="left" onClick={handleOpenModalDetail}>
          {shipperPayment.orderId}
        </TableCell>

        <TableCell align="left" onClick={handleOpenModalDetail}>
          {shipperPayment.cashierCreated}
        </TableCell>

        <TableCell align="left" onClick={handleOpenModalDetail}>
          {fDateTime(shipperPayment.createDate)}
        </TableCell>

        <TableCell align="left" onClick={handleOpenModalDetail}>
          {formatCurrency(shipperPayment.amount)}
        </TableCell>

        <TableCell align="left" onClick={handleOpenModalDetail}>
          {shipperPayment.paymentMethod === PaymentMethod.CASH
            ? translate('page.content.cash')
            : translate('page.content.cashless')}
        </TableCell>

        <TableCell align="left" onClick={handleOpenModalDetail}>
          {shipperPayment.kcBankingAccountName}
        </TableCell>

        <TableCell align="left" onClick={handleOpenModalDetail}>
          <Label color={shipperPayment?.status === FilterStatus.SUCCESS ? Color.SUCCESS : Color.ERROR}>
            {shipperPayment?.status === FilterStatus.SUCCESS
              ? translate('status.success')
              : translate('status.success')}
          </Label>
        </TableCell>
      </TableRow>

      {isOpenModalDetail && (
        <ShipperPaymentDetailModal
          shipperPayment={shipperPayment}
          isOpen={isOpenModalDetail}
          handleOpen={handleOpenModalDetail}
        />
      )}
    </>
  );
}

export default ShipperPaymentTableRow;
