// @mui
import { Dialog, DialogContent, Divider, IconButton, Stack, Typography } from '@mui/material';
// @mui icon
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
//
import { Color, FilterStatus, Language, PaymentMethod } from 'common/enums';
import { Label } from 'components';
import { useLocales } from 'hooks';
import { ShipperPayment } from 'common/models';
import { fDateTime, formatCurrency } from 'utils';

interface ShipperPaymentDetailModalProps {
  isOpen: boolean;
  handleOpen: (title: any) => void;
  shipperPayment: ShipperPayment;
}

function ShipperPaymentDetailModal({ isOpen, handleOpen, shipperPayment }: ShipperPaymentDetailModalProps) {
  const { translate, currentLang } = useLocales();

  return (
    <>
      {isOpen && (
        <Dialog maxWidth="sm" fullWidth open={isOpen} onClose={handleOpen}>
          <DialogContent>
            <Stack width="100%" direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h4">
                {translate('page.title.detail', {
                  model:
                    currentLang.value === Language.ENGLISH
                      ? translate('model.capitalizeOne.shipperPayment')
                      : translate('model.lowercase.shipperPayment'),
                })}
              </Typography>
              <IconButton color="inherit" onClick={handleOpen}>
                <CloseOutlinedIcon />
              </IconButton>
            </Stack>

            <Divider sx={{ mt: 1.5, mb: 2 }} />

            <Stack width="100%">
              <Stack direction="row" justifyContent="space-between" mt={1}>
                <Typography variant="subtitle1" color={(theme) => theme.palette.grey[600]}>
                  {translate('table.cashierCreated')}:{' '}
                </Typography>
                <Typography variant="body1">{shipperPayment.cashierCreated}</Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between" mt={2}>
                <Typography variant="subtitle1" color={(theme) => theme.palette.grey[600]}>
                  {translate('model.capitalizeOne.bankingAccount')}:{' '}
                </Typography>
                <Typography variant="body1">{shipperPayment.kcBankingAccountName}</Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between" mt={2}>
                <Typography variant="subtitle1" color={(theme) => theme.palette.grey[600]}>
                  {translate('page.form.amount')}:{' '}
                </Typography>
                <Typography variant="body1">{formatCurrency(shipperPayment.amount)}</Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between" mt={2}>
                <Typography variant="subtitle1" color={(theme) => theme.palette.grey[600]}>
                  {translate('table.createDate')}:
                </Typography>
                <Typography variant="body1">{fDateTime(shipperPayment.createDate)}</Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between" mt={2}>
                <Typography variant="subtitle1" color={(theme) => theme.palette.grey[600]}>
                  {translate('page.content.paymentMethod')}:
                </Typography>
                <Typography variant="body1">
                  {shipperPayment.paymentMethod === PaymentMethod.CASH
                    ? translate('page.content.cash')
                    : translate('page.content.cashless')}
                </Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between" mt={2}>
                <Typography variant="subtitle1" color={(theme) => theme.palette.grey[600]}>
                  {translate('table.status')}:
                </Typography>
                <Label color={shipperPayment.status === FilterStatus.SUCCESS ? Color.SUCCESS : Color.ERROR}>
                  {shipperPayment.status === FilterStatus.SUCCESS
                    ? translate('status.success')
                    : translate('status.fail')}
                </Label>
              </Stack>

              <Stack justifyContent="space-between" mt={2}>
                <Typography variant="subtitle1" color={(theme) => theme.palette.grey[600]}>
                  {translate('page.form.content')}:
                </Typography>
                <Typography variant="body1" gutterBottom mt={1} maxWidth="100%">
                  body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde
                  suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos
                  laborum fugiat deleniti? Eum quasi quidem quibusdam.
                </Typography>
              </Stack>
            </Stack>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default ShipperPaymentDetailModal;
