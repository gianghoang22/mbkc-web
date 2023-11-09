// @mui
import { Dialog, DialogContent, Divider, Grid, IconButton, Stack, Typography, Button, Backdrop } from '@mui/material';
// @mui icon
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
//
import { Color, ExchangeStatus, ExchangeType, Language } from 'common/enums';
import { Label } from 'components';
import { useLocales } from 'hooks';
import { useState } from 'react';
import { MoneyExchange } from 'common/models';
import { fDateTime } from 'utils';

interface MoneyExchangeDetailModalProps {
  isOpen: boolean;
  handleOpen: (title: any) => void;
  moneyExchange: MoneyExchange;
}

function MoneyExchangeDetailModal({ isOpen, handleOpen, moneyExchange }: MoneyExchangeDetailModalProps) {
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
              <Grid container columnSpacing={4} mt={2}>
                <Grid item md={5} ml={-2}>
                  <Button disabled={moneyExchange.exchangeImage === null} onClick={handleOpenBackdrop}>
                    <img src={moneyExchange.exchangeImage} alt="Exchange img" width="100%" height="100%" />
                  </Button>
                  <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={openBackdrop}
                    onClick={handleCloseBackdrop}
                  >
                    <img src={moneyExchange.exchangeImage} alt="invoice" width="80%" height="80%" />
                  </Backdrop>
                </Grid>
                <Grid item md={7}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography color={(theme) => theme.palette.grey[600]} variant="subtitle1">
                      {translate('table.sender')}:{' '}
                    </Typography>
                    <Typography variant="body1">{moneyExchange.senderName}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between" mt={2}>
                    <Typography color={(theme) => theme.palette.grey[600]} variant="subtitle1">
                      {translate('table.receiver')}:{' '}
                    </Typography>
                    <Typography variant="body1">{moneyExchange.receiveName}</Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" mt={2}>
                    <Typography color={(theme) => theme.palette.grey[600]} variant="subtitle1">
                      {translate('model.capitalizeOne.paymentTime')}:
                    </Typography>
                    <Typography variant="body1">{fDateTime(moneyExchange.createdDate)}</Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" mt={2}>
                    <Typography color={(theme) => theme.palette.grey[600]} variant="subtitle1">
                      {translate('table.exchangeType')}:
                    </Typography>
                    <Typography variant="body1">
                      {moneyExchange.exchangeType === ExchangeType.RECEIVE
                        ? translate('table.receive')
                        : moneyExchange.exchangeType === ExchangeType.SEND
                        ? translate('table.send')
                        : translate('table.withdraw')}
                    </Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" mt={2}>
                    <Typography color={(theme) => theme.palette.grey[600]} variant="subtitle1">
                      {translate('table.status')}:
                    </Typography>
                    <Label color={moneyExchange?.status === ExchangeStatus.SUCCESS ? Color.SUCCESS : Color.ERROR}>
                      {moneyExchange?.status === ExchangeStatus.SUCCESS
                        ? translate('status.success')
                        : translate('status.fail')}
                    </Label>
                  </Stack>

                  <Stack justifyContent="space-between" mt={2}>
                    <Typography color={(theme) => theme.palette.grey[600]} variant="subtitle1">
                      {translate('page.form.content')}:
                    </Typography>
                    <Typography gutterBottom mt={1} maxWidth="100%">
                      {moneyExchange.content}
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
