// @mui
import { TableCell, TableRow } from '@mui/material';
//
import { ShipperPayment } from 'common/models';
import { Color, Status } from 'common/enums';
import { Label } from 'components';
import { useLocales, useModal } from 'hooks';
import ShipperPaymentDetailModal from './ShipperPaymentDetailModal';

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
          {shipperPayment.createDate}
        </TableCell>

        <TableCell align="left" onClick={handleOpenModalDetail}>
          {shipperPayment.amount}
        </TableCell>

        <TableCell align="left" onClick={handleOpenModalDetail}>
          {shipperPayment.paymentMethod}
        </TableCell>

        <TableCell align="left" onClick={handleOpenModalDetail}>
          {shipperPayment.kcBankingAccountName}
        </TableCell>

        <TableCell align="left" onClick={handleOpenModalDetail}>
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

      {isOpenModalDetail && <ShipperPaymentDetailModal isOpen={isOpenModalDetail} handleOpen={handleOpenModalDetail} />}
    </>
  );
}

export default ShipperPaymentTableRow;
