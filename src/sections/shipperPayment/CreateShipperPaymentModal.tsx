import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// @mui
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogActions, DialogContent, IconButton, Stack, Typography } from '@mui/material';
// redux
import { getAllBankingAccounts } from 'redux/bankingAccount/bankingAccountSlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { confirmOrderToCompleted } from 'redux/order/orderSlice';
// interface
import { ListParams, Params } from 'common/@types';
import { Color, PAYMENT_METHOD_OPTIONS, PaymentMethod } from 'common/enums';
import { CompletedOrderParams } from 'common/models';
//
import { AutoCompleteField, SelectField, UploadImageField } from 'components';
import { useLocales } from 'hooks';

interface CreateShipperPaymentModalProps {
  isOpen: boolean;
  orderPartnerId: string;
  orderId: number;
  handleOpen: (title: any) => void;
}

function CreateShipperPaymentModal({ isOpen, handleOpen, orderPartnerId, orderId }: CreateShipperPaymentModalProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { translate } = useLocales();

  const { bankingAccounts } = useAppSelector((state) => state.bankingAccount);
  const { isLoading: isLoadingOrder } = useAppSelector((state) => state.order);

  const createShipperPaymentForm = useForm<CompletedOrderParams>({
    defaultValues: {
      bankingAccountId: '',
      image: '',
      orderPartnerId: '',
    },
  });

  const { handleSubmit, watch } = createShipperPaymentForm;

  const paymentType = watch('paymentType');

  const bankingAccountOptions = bankingAccounts.map((bankingAccount) => ({
    label: bankingAccount.numberAccount,
    value: bankingAccount.bankingAccountId,
    image: bankingAccount.logoUrl,
    description: bankingAccount.name,
  }));

  const getOpObjBankingAccount = (option: any) => {
    if (!option) return option;
    if (!option.value) return bankingAccountOptions.find((opt) => opt.value === option);
    return option;
  };

  const onSubmit = async (values: CompletedOrderParams) => {
    const data = { ...values };

    handleOpen('');

    const paramsToCompleted: Params<Omit<CompletedOrderParams, 'paymentType'>> = {
      data: {
        orderPartnerId: orderPartnerId,
        image: data.image,
        bankingAccountId: paymentType === PaymentMethod.CASH_LESS ? data.bankingAccountId : '',
      },
      idParams: {
        orderId: orderId,
      },
      navigate,
    };
    dispatch(confirmOrderToCompleted(paramsToCompleted));
  };

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        isGetAll: true,
      },
      navigate,
    };
  }, [navigate]);

  useEffect(() => {
    dispatch(getAllBankingAccounts(params));
  }, [params, dispatch]);

  return (
    <>
      {isOpen && (
        <Dialog maxWidth="sm" fullWidth open={isOpen}>
          <FormProvider {...createShipperPaymentForm}>
            <DialogContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h4">
                  {translate('page.title.create', { model: translate('model.lowercase.shipperPayment') })}
                </Typography>
                <IconButton onClick={handleOpen}>
                  <CloseIcon />
                </IconButton>
              </Stack>

              <Stack alignItems="center" pt={3} pb={1}>
                <UploadImageField
                  label={translate('page.content.dragDrop')}
                  subLabel={translate('page.content.imageAllowed')}
                  margin="auto"
                  name="image"
                  defaultValue=""
                  width={500}
                  borderRadius="unset"
                />

                <Stack width="100%" gap={2}>
                  <SelectField<PaymentMethod>
                    fullWidth
                    name="paymentType"
                    disabled={isLoadingOrder}
                    options={PAYMENT_METHOD_OPTIONS}
                    label={translate('page.form.paymentMethod')}
                  />

                  {paymentType === PaymentMethod.CASH_LESS && (
                    <AutoCompleteField
                      options={bankingAccountOptions}
                      getOptionLabel={(value: any) => {
                        const label = getOpObjBankingAccount(value)?.label;
                        return label === undefined ? '' : label;
                      }}
                      isOptionEqualToValue={(option: any, value: any) => {
                        if (!option) return option;
                        return option.value === getOpObjBankingAccount(value)?.value;
                      }}
                      transformValue={(opt: any) => opt.value}
                      name="bankingAccountId"
                      type="text"
                      label={translate('model.capitalizeOne.bankingAccount')}
                    />
                  )}
                </Stack>
              </Stack>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3 }}>
              <Button
                disabled={isLoadingOrder}
                type="submit"
                variant="contained"
                color={Color.PRIMARY}
                onClick={handleSubmit(onSubmit)}
              >
                {translate('button.create')}
              </Button>
            </DialogActions>
          </FormProvider>
        </Dialog>
      )}
    </>
  );
}

export default CreateShipperPaymentModal;
