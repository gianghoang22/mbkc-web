import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Button, Card, Stack } from '@mui/material';
//
import { CashierToCreate } from '@types';
import { Color } from 'common/enum';
import { Page } from 'components';
import { useAppSelector } from 'redux/configStore';
import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';
import { CashierForm } from 'sections/cashier';
import { useDispatch } from 'react-redux';
import { createNewCashier, updateCashier } from 'redux/cashier/cashierSlice';
import { useValidationForm } from 'hooks';

// const schema = yup.object({
//   email: yup.string().required('Please enter Cashier Email'),
//   fullName: yup.string().required('Please enter Cashier Full Name'),
//   gender: yup.string().required('Please select Cashier Gender'),
//   dateOfBirth: yup.string().required('Please enter the Cashier date of birth'),
//   avatar: yup.string(),
//   citizenNumber: yup.string().required('Please select Cashier citizen number'),
// });

function CreateCashierPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { isEditing, cashier } = useAppSelector((state) => state.cashier);
  const { schemaCashier } = useValidationForm();

  const createCashierForm = useForm<CashierToCreate>({
    defaultValues: {
      email: isEditing ? cashier?.email : '',
      fullName: isEditing ? cashier?.fullName : '',
      gender: isEditing ? cashier?.gender : '',
      avatar: isEditing ? cashier?.avatar : '',
      citizenNumber: isEditing ? cashier?.citizenNumber : '',
      dateOfBirth: isEditing ? cashier?.dateOfBirth : '2001/5/9',
    },
    resolver: yupResolver(schemaCashier),
  });

  const { handleSubmit } = createCashierForm;

  const onSubmit = async (values: CashierToCreate) => {
    const newCashierOptions = { ...values };

    const updateCashierOptions = {
      fullName: values.fullName,
      gender: values.gender,
      dateOfBirth: values.dateOfBirth,
      avatar: values.avatar,
      citizenNumber: values.citizenNumber,
      newPassword: '',
      Status: 'ACTIVE',
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

  return (
    <>
      <Page
        title={isEditing ? `Update Cashier` : `Create Cashier`}
        pathname={pathname}
        navigateDashboard={PATH_KITCHEN_CENTER_APP.root}
      >
        <FormProvider {...createCashierForm}>
          <Card sx={{ p: 3 }}>
            <CashierForm />
          </Card>
          <Stack direction="row" justifyContent="space-between" mt={12}>
            <Button variant="outlined" color="inherit" onClick={() => navigate(PATH_KITCHEN_CENTER_APP.cashier.list)}>
              Back
            </Button>
            <Stack direction="row" gap={2}>
              {isEditing && (
                <Button variant="contained" color="inherit">
                  Reset
                </Button>
              )}
              <Button
                variant="contained"
                color={isEditing ? Color.WARNING : Color.PRIMARY}
                type="submit"
                onClick={handleSubmit(onSubmit)}
              >
                {isEditing ? 'Update' : 'Create'}
              </Button>
            </Stack>
          </Stack>
        </FormProvider>
      </Page>
    </>
  );
}

export default CreateCashierPage;
