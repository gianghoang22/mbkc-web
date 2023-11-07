// @mui
import { Dialog, DialogContent, Divider, Grid, IconButton, Stack, Typography, Button, Backdrop } from '@mui/material';
// @mui icon
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
//
import { Color, Language } from 'common/enum';
import { Label } from 'components';
import { useLocales } from 'hooks';
import { useState } from 'react';

interface MoneyExchangeDetailModalProps {
  isOpen: boolean;
  handleOpen: (title: any) => void;
}

function MoneyExchangeDetailModal({ isOpen, handleOpen }: MoneyExchangeDetailModalProps) {
  const { translate, currentLang } = useLocales();
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };
  const handleOpenBackdrop = () => {
    setOpenBackdrop(true);
  };

  return (
    <>
      {isOpen && (
        <Dialog maxWidth="md" fullWidth open={isOpen} onClose={handleOpen}>
          <DialogContent>
            <Stack width="100%" direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h4">
                {translate('page.title.detail', {
                  model:
                    currentLang.value === Language.ENGLISH
                      ? translate('model.capitalizeOne.moneyExchange')
                      : translate('model.lowercase.moneyExchange'),
                })}
              </Typography>
              <IconButton color="inherit" onClick={handleOpen}>
                <CloseOutlinedIcon />
              </IconButton>
            </Stack>

            <Divider sx={{ mt: 1.5, mb: 3.5 }} />

            <Stack width="100%">
              <Stack direction="row" gap={1}>
                <Typography variant="subtitle1">Exchange ID: </Typography>
                <Typography>#MBKC1234</Typography>
              </Stack>

              <Grid container columnSpacing={4} mt={2}>
                <Grid item md={5} ml={-2}>
                  <Button onClick={handleOpenBackdrop}>
                    <img
                      src="https://www.skynova.com/learn/invoicing/images/Skynova_Invoice_Example.jpg"
                      alt="invoice"
                      width="100%"
                      height="100%"
                    />
                  </Button>
                  <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={openBackdrop}
                    onClick={handleCloseBackdrop}
                  >
                    <img
                      src="https://www.skynova.com/learn/invoicing/images/Skynova_Invoice_Example.jpg"
                      alt="invoice"
                      width="80%"
                      height="80%"
                    />
                  </Backdrop>
                </Grid>
                <Grid item md={7}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="subtitle1">Sender: </Typography>
                    <Typography>Kitchen Center Đồng Khởi</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between" mt={2}>
                    <Typography variant="subtitle1">Receiver: </Typography>
                    <Typography>Yo! Sushi Store</Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" mt={2}>
                    <Typography variant="subtitle1">Payment time:</Typography>
                    <Typography>12 Aug 2022 10:00 PM</Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" mt={2}>
                    <Typography variant="subtitle1">Transaction type:</Typography>
                    <Label>Send</Label>
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
                </Grid>
              </Grid>
            </Stack>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default MoneyExchangeDetailModal;
