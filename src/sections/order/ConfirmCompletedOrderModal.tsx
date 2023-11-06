import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// @mui
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogActions, DialogContent, IconButton, Stack, Typography } from '@mui/material';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
//
import { CompletedOrderParams, ListParams, Params } from '@types';
import { Color } from 'common/enum';
import { AutoCompleteField, UploadImageField } from 'components';
import { useLocales, useValidationForm } from 'hooks';
import { useEffect, useMemo } from 'react';
import { confirmOrderToCompleted } from 'redux/order/orderSlice';
import { getAllBankingAccounts } from 'redux/bankingAccount/bankingAccountSlice';

interface ConfirmCompletedOrderModalProps {
  page: number;
  rowsPerPage: number;
  isOpen: boolean;
  handleOpen: (title: any) => void;
}

function ConfirmCompletedOrderModal({ page, rowsPerPage, isOpen, handleOpen }: ConfirmCompletedOrderModalProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { translate } = useLocales();
  const { schemaPaymentForStore } = useValidationForm();

  const { bankingAccounts } = useAppSelector((state) => state.bankingAccount);
  const { isLoading } = useAppSelector((state) => state.wallet);

  const confirmCompletedOrderForm = useForm<CompletedOrderParams>({
    defaultValues: {
      BankingAccountId: '',
      Image: '',
      OrderPartnerId: '',
    },
    resolver: yupResolver<any>(schemaPaymentForStore),
  });

  const { handleSubmit } = confirmCompletedOrderForm;

  const bankingAccountOptions = bankingAccounts.map((bankingAccount) => ({
    label: bankingAccount.name,
    value: bankingAccount.bankingAccountId,
    image: bankingAccount.logoUrl,
  }));

  const getOpObjBankingAccount = (option: any) => {
    if (!option) return option;
    if (!option.value) return bankingAccountOptions.find((opt) => opt.value === option);
    return option;
  };

  const onSubmit = async (values: CompletedOrderParams) => {
    const data = { ...values };
    const paramsToCompleted: Params<CompletedOrderParams> = {
      data: data,
      optionParams: {
        currentPage: page + 1,
        itemsPerPage: rowsPerPage,
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
        <Dialog maxWidth="sm" fullWidth open={isOpen} onClose={handleOpen}>
          <FormProvider {...confirmCompletedOrderForm}>
            <DialogContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h4">
                  {translate('page.title.completedOrder', {
                    model: ` ${translate('model.lowercase.order')}`,
                  })}
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
                  name="Image"
                  defaultValue=""
                />

                <Stack width="100%" gap={2}>
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
                    name="BankingAccountId"
                    type="text"
                    label={translate('model.capitalizeOne.bankingAccount')}
                  />
                </Stack>
              </Stack>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3 }}>
              <Button
                disabled={isLoading}
                type="submit"
                variant="contained"
                color={Color.SUCCESS}
                onClick={handleSubmit(onSubmit)}
              >
                {translate('button.confirm')}
              </Button>
            </DialogActions>
          </FormProvider>
        </Dialog>
      )}
    </>
  );
}

export default ConfirmCompletedOrderModal;
