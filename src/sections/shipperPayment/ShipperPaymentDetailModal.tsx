// @mui
import { Dialog, DialogContent, Divider, IconButton, Stack, Typography } from '@mui/material';
// @mui icon
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
//
import { Color, Language } from 'common/enum';
import { Label } from 'components';
import { useLocales } from 'hooks';

interface ShipperPaymentDetailModalProps {
  isOpen: boolean;
  handleOpen: (title: any) => void;
}

function ShipperPaymentDetailModal({ isOpen, handleOpen }: ShipperPaymentDetailModalProps) {
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
              <Stack direction="row" gap={1}>
                <Typography variant="subtitle1">PAYMENT ID: </Typography>
                <Typography>#MBKC1234</Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between" mt={2}>
                <Typography variant="subtitle1">Banking Account: </Typography>
                <Typography>MOMO</Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between" mt={2}>
                <Typography variant="subtitle1">Amount: </Typography>
                <Typography>132.000 đ</Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between" mt={2}>
                <Typography variant="subtitle1">Create date:</Typography>
                <Typography>12 Aug 2022 10:00 PM</Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between" mt={2}>
                <Typography variant="subtitle1">Payment method:</Typography>
                <Typography>Cash</Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between" mt={2}>
                <Typography variant="subtitle1">Status:</Typography>
                <Label color={Color.SUCCESS}>Successful</Label>
              </Stack>

              <Stack justifyContent="space-between" mt={2}>
                <Typography variant="subtitle1">Content:</Typography>
                <Typography gutterBottom mt={1} maxWidth="100%">
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
