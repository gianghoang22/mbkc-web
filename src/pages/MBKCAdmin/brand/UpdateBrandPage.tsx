import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
// @mui
import { Button, Card, Stack } from '@mui/material';
//
import { BrandToAdd } from '@types';
import { Page } from 'components';
import { PATH_ADMIN_APP } from 'routes/paths';
import BrandForm from 'sections/brand/BrandForm';

const schema = yup.object({
  name: yup.string().required('Please enter brand name'),
  address: yup.string().required('Please enter brand address'),
  logoUrl: yup.string().required('Please select brand logo'),
});
function UpdateBrandPage(props: any) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const createBrandForm = useForm<BrandToAdd>({
    defaultValues: {
      name: '',
      address: '',
      logoUrl: '',
    },
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = createBrandForm;

  const onSubmit = async (values: BrandToAdd) => {
    const data = { ...values };
    console.log('CategoryToAdd', data);
  };

  return (
    <Page title="Update Brand" pathname={pathname} navigateDashboard={PATH_ADMIN_APP.root}>
      <FormProvider {...createBrandForm}>
        <Card sx={{ p: 3 }}>
          <BrandForm />
        </Card>
        <Stack direction="row" justifyContent="space-between" mt={12}>
          <Button variant="outlined" color="inherit" onClick={() => navigate(PATH_ADMIN_APP.brand.detailById)}>
            Back
          </Button>
          <Stack direction="row" gap={2}>
            <Button variant="contained" color="inherit">
              Reset
            </Button>
            <Button variant="contained" type="submit" onClick={handleSubmit(onSubmit)}>
              Update
            </Button>
          </Stack>
        </Stack>
      </FormProvider>
    </Page>
  );
}

UpdateBrandPage.propTypes = {};

export default UpdateBrandPage;
