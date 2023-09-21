import React from 'react';
import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
// @mui
import { Button, Card, Stack } from '@mui/material';
//
import { KitchenCenterToAdd } from '@types';
import { Page } from 'components';
import { PATH_ADMIN_APP } from 'routes/paths';
import KitchenCenterForm from 'sections/kitchenCenter/KitchenCenterForm';

const schema = yup.object({
  name: yup.string().required('Please enter brand name'),
  numberOfKitchens: yup.number().required('Please choose number of kitchens'),
  cityProvince: yup.string().required('Please choose city/province'),
  district: yup.string().required('Please choose district'),
  address: yup.string().required('Please enter kitchen center address'),
  logoUrl: yup.string().required('Please select kitchen center logo'),
});

function UpdateKitchenCenterPage(props: any) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const createBrandForm = useForm<KitchenCenterToAdd>({
    defaultValues: {
      name: '',
      numberOfKitchens: 0,
      cityProvince: '',
      district: '',
      address: '',
      logoUrl: '',
    },
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = createBrandForm;

  const onSubmit = async (values: KitchenCenterToAdd) => {
    const data = { ...values };
    console.log('KitchenCenterToAdd', data);
  };

  return (
    <Page title="Update Kitchen Center" pathname={pathname} navigateDashboard={PATH_ADMIN_APP.root}>
      <FormProvider {...createBrandForm}>
        <Card sx={{ p: 3 }}>
          <KitchenCenterForm />
        </Card>
        <Stack direction="row" justifyContent="space-between" mt={12}>
          <Button variant="outlined" color="inherit" onClick={() => navigate(PATH_ADMIN_APP.kitchenCenter.list)}>
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

UpdateKitchenCenterPage.propTypes = {};

export default UpdateKitchenCenterPage;
