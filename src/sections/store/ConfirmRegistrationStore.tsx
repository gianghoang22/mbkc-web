import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
// @mui
import { Button, Dialog, DialogActions, DialogContent, Divider, Stack, Typography } from '@mui/material';
//
import { StoreToConfirm } from '@types';
import { Color, Status } from 'common/enum';
import { InputField } from 'components';
import { useLocales } from 'hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'redux/configStore';
import { confirmRegistrationStore } from 'redux/store/storeSlice';

interface ConfirmRegistrationStoreProps {
  page?: number;
  rowsPerPage?: number;
  storeId: number;
  isOpen: boolean;
  handleOpen: (title: any) => void;
  handleCloseMenuConfirm: () => void;
}

function ConfirmRegistrationStore({
  storeId,
  isOpen,
  handleOpen,
  page = 1,
  rowsPerPage = 5,
  handleCloseMenuConfirm,
}: ConfirmRegistrationStoreProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { translate } = useLocales();

  const confirmRegistrationForm = useForm<StoreToConfirm>({
    defaultValues: { status: Status.REJECTED },
    resolver: yupResolver(
      yup.object({
        status: yup.string().required(
          translate('page.validation.select', {
            name: translate('table.lowercase.status'),
          })
        ),
        rejectedReason: yup.string().required(
          translate('page.validation.required', {
            name: translate('page.form.contentLower'),
          })
        ),
      })
    ),
  });

  const { handleSubmit } = confirmRegistrationForm;

  const onSubmit = async (values: StoreToConfirm) => {
    handleCloseMenuConfirm();
    const data = { ...values };

    console.log(data);

    dispatch(
      confirmRegistrationStore({
        data: data,
        idParams: { storeId: storeId },
        optionParams: {
          itemsPerPage: rowsPerPage,
          currentPage: page,
        },
        pathname: pathname,
        navigate,
      })
    );
  };

  return (
    <>
      {isOpen && (
        <Dialog maxWidth="xs" fullWidth open={isOpen} onClose={handleOpen}>
          <FormProvider {...confirmRegistrationForm}>
            <DialogContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h4">
                  {translate('page.title.registration', {
                    model: translate('model.lowercase.store'),
                  })}
                </Typography>
              </Stack>

              <Divider sx={{ mt: 1.5, mb: 3.5 }} />

              <Stack alignItems="center" gap={2}>
                <InputField fullWidth name="rejectedReason" label={translate('page.form.content')} />
              </Stack>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3 }}>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => {
                  handleOpen(Status.REJECTED);
                  handleCloseMenuConfirm();
                }}
              >
                {translate('button.cancel')}
              </Button>
              <Button type="submit" variant="contained" color={Color.ERROR} onClick={handleSubmit(onSubmit)}>
                {translate('button.confirm')}
              </Button>
            </DialogActions>
          </FormProvider>
        </Dialog>
      )}
    </>
  );
}

export default ConfirmRegistrationStore;
