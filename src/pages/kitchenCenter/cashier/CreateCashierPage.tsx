import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
// @mui
import { Button, Card, Stack } from '@mui/material';
//
import { CashierToCreate } from '@types';
import { Color } from 'common/enum';
import { Page } from 'components';
import { useAppSelector } from 'redux/configStore';
import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';
import { CashierForm } from 'sections/cashier';

const schema = yup.object({
  email: yup.string().required('Please enter Category Name'),
  fullName: yup.string().required('Please enter Category Code'),
  gender: yup.string().required('Please select Category Type'),
  dateOfBirth: yup.date().required('Please enter the category display order'),
  avatar: yup.string(),
  citizenNumber: yup.string().required('Please select Category Photo'),
});

function CreateCashierPage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isEditing, cashier } = useAppSelector((state) => state.cashier);

  const createCashierForm = useForm<CashierToCreate>({
    defaultValues: {
      email: isEditing ? cashier?.email : '',
      fullName: isEditing ? cashier?.fullName : '',
      gender: isEditing ? cashier?.gender : '',
      dateOfBirth: isEditing ? cashier?.dateOfBirth : new Date(),
      avatar: isEditing ? cashier?.avatar : '',
      citizenNumber: isEditing ? cashier?.citizenNumber : '',
    },
    resolver: yupResolver(schema),
  });

  const { handleSubmit, watch } = createCashierForm;

  const image = watch('avatar');
  console.log('image', image);

  const onSubmit = async (values: CashierToCreate) => {
    const data = { ...values, imageUrl: image };
    console.log('CategoryToAdd', data);
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
