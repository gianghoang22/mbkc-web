import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// @mui
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogActions, DialogContent, IconButton, Stack, Typography } from '@mui/material';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { getAllStores } from 'redux/store/storeSlice';
import { createPaymentForStore } from 'redux/wallet/walletSlice';
//
import { ListParams, Params } from 'common/@types';
import { Color } from 'common/enums';
import { PaymentForStoresToCreate } from 'common/models';
import { AutoCompleteField, InputNumber, UploadImageField } from 'components';
import { useLocales, useValidationForm } from 'hooks';

interface CreatePaymentForStoreModalProps {
  page: number;
  rowsPerPage: number;
  isOpen: boolean;
  handleOpen: (title: any) => void;
}

function CreatePaymentForStoreModal({ page, rowsPerPage, isOpen, handleOpen }: CreatePaymentForStoreModalProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { translate } = useLocales();
  const { schemaPaymentForStore } = useValidationForm();

  const { stores } = useAppSelector((state) => state.store);
  const { isLoading } = useAppSelector((state) => state.wallet);

  const createPaymentForStoreForm = useForm<PaymentForStoresToCreate>({
    defaultValues: {
      StoreId: '',
      Amount: '',
      Image: '',
    },
    resolver: yupResolver<any>(schemaPaymentForStore),
  });

  const { handleSubmit } = createPaymentForStoreForm;

  const storeOptions = stores.map((store) => ({
    label: store.name,
    value: store.storeId,
    center: store.kitchenCenter.name,
    image: store.logo,
  }));

  const getOpObjStore = (option: any) => {
    if (!option) return option;
    if (!option.value) return storeOptions.find((opt) => opt.value === option);
    return option;
  };

  const onSubmit = async (values: PaymentForStoresToCreate) => {
    const data = { ...values };
    const paramCreate: Params<PaymentForStoresToCreate> = {
      data: data,
      optionParams: {
        currentPage: page + 1,
        itemsPerPage: rowsPerPage,
      },
      navigate,
    };
    dispatch(createPaymentForStore(paramCreate));
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
    dispatch(getAllStores(params));
  }, [params, dispatch]);

  return (
    <>
      {isOpen && (
        <Dialog maxWidth="sm" fullWidth open={isOpen} onClose={handleOpen}>
          <FormProvider {...createPaymentForStoreForm}>
            <DialogContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h4">
                  {translate('page.title.create', {
                    model: ` ${translate('model.lowercase.paymentForStore')}`,
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
                    options={storeOptions}
                    getOptionLabel={(value: any) => {
                      const label = getOpObjStore(value)?.label;
                      return label === undefined ? '' : label;
                    }}
                    isOptionEqualToValue={(option: any, value: any) => {
                      if (!option) return option;
                      return option.value === getOpObjStore(value)?.value;
                    }}
                    transformValue={(opt: any) => opt.value}
                    name="StoreId"
                    type="text"
                    label={translate('model.capitalizeOne.store')}
                  />

                  <InputNumber fullWidth name="Amount" label={translate('page.form.amount')} />
                </Stack>
              </Stack>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3 }}>
              <Button
                disabled={isLoading}
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

export default CreatePaymentForStoreModal;
