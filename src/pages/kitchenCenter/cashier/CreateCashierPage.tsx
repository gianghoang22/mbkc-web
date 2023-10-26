import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// @mui
import { Button, Card, Stack, Box } from '@mui/material';
//
import { CashierToCreate } from '@types';
import { Color, Status } from 'common/enum';
import { LoadingScreen, Page } from 'components';
import { useAppSelector } from 'redux/configStore';
import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';
import { CashierForm } from 'sections/cashier';
import { useDispatch } from 'react-redux';
import { createNewCashier, getCashierDetail, updateCashier } from 'redux/cashier/cashierSlice';
import { useLocales, useValidationForm } from 'hooks';
import { useEffect, useMemo } from 'react';

function CreateCashierPage() {
  const { id: cashierId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { schemaCashier } = useValidationForm();

  const { isEditing, isLoading, cashier } = useAppSelector((state) => state.cashier);

  const createCashierForm = useForm<CashierToCreate>({
    defaultValues: {
      email: '',
      fullName: '',
      gender: '',
      avatar: '',
      citizenNumber: '',
      dateOfBirth: '2001/5/9',
    },
    resolver: yupResolver(schemaCashier),
  });

  const { handleSubmit, setValue } = createCashierForm;

  const onSubmit = async (values: CashierToCreate) => {
    const newCashierOptions = { ...values };

    const updateCashierOptions = {
      fullName: values.fullName,
      gender: values.gender,
      dateOfBirth: values.dateOfBirth,
      avatar: values.avatar,
      citizenNumber: values.citizenNumber,
      newPassword: '',
      Status: Status.ACTIVE,
    };

    const updateCashierParams = {
      cashierId: cashier?.accountId,
      navigate,
      updateCashierOptions,
    };

    const createCashierParams = {
      navigate,
      newCashierOptions,
    };

    if (isEditing) {
      dispatch<any>(updateCashier(updateCashierParams));
    } else {
      dispatch<any>(createNewCashier(createCashierParams));
    }
  };

  const paramsDetail = useMemo(() => {
    return {
      cashierId,
      navigate,
    };
  }, [cashierId, navigate]);

  useEffect(() => {
    if (cashier !== null && isEditing === true) {
      setValue('email', cashier?.email as string);
      setValue('fullName', cashier?.fullName as string);
      setValue('gender', cashier?.gender as string);
      setValue('avatar', cashier?.avatar);
      setValue('citizenNumber', cashier?.citizenNumber as string);
      setValue('dateOfBirth', cashier?.dateOfBirth as string);
    }
  }, [cashier, isEditing, setValue]);

  useEffect(() => {
    if (isEditing) {
      dispatch<any>(getCashierDetail(paramsDetail));
    }
  }, [dispatch, navigate, paramsDetail, isEditing]);

  return (
    <>
      {isLoading && (
        <Box sx={{ position: 'fixed', zIndex: 1300, top: 0, bottom: 0, left: 0, right: 0 }}>
          <LoadingScreen />
        </Box>
      )}

      <Page
        title={
          isEditing
            ? translate('page.title.update', { model: translate('model.lowercase.cashier') })
            : translate('page.title.create', { model: translate('model.lowercase.cashier') })
        }
        pathname={pathname}
        navigateDashboard={PATH_KITCHEN_CENTER_APP.root}
      >
        <FormProvider {...createCashierForm}>
          <Card sx={{ p: 3 }}>
            <CashierForm />
          </Card>
          <Stack direction="row" justifyContent="space-between" mt={12}>
            <Button variant="outlined" color="inherit" onClick={() => navigate(PATH_KITCHEN_CENTER_APP.cashier.list)}>
              {translate('button.back')}
            </Button>
            <Stack direction="row" gap={2}>
              {isEditing && (
                <Button variant="contained" disabled={isLoading} color="inherit">
                  {translate('button.reset')}
                </Button>
              )}
              <Button
                variant="contained"
                color={isEditing ? Color.WARNING : Color.PRIMARY}
                type="submit"
                onClick={handleSubmit(onSubmit)}
              >
                {isEditing ? translate('button.update') : translate('button.create')}
              </Button>
            </Stack>
          </Stack>
        </FormProvider>
      </Page>
    </>
  );
}

export default CreateCashierPage;
