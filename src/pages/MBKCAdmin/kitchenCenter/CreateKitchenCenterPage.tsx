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
import { useAppSelector } from 'redux/configStore';
import { Color } from 'common/enum';

const schema = yup.object({
  name: yup.string().required('Please enter brand name'),
  address: yup.string().required('Please enter kitchen center address'),
  logoUrl: yup.string().required('Please select kitchen center logo'),
});

function CreateKitchenCenterPage(props: any) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isEditing, kitchenCenter } = useAppSelector((state) => state.kitchenCenter);

  const createBrandForm = useForm<KitchenCenterToAdd>({
    defaultValues: {
      name: isEditing ? kitchenCenter?.title : '',
      address: isEditing ? kitchenCenter?.address : '',
      logoUrl: isEditing ? kitchenCenter?.imageUrl : '',
    },
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = createBrandForm;

  const onSubmit = async (values: KitchenCenterToAdd) => {
    const data = { ...values };
    console.log('KitchenCenterToAdd', data);
  };

  return (
    <Page
      title={isEditing ? 'Update Kitchen Center' : 'Create New Kitchen Center'}
      pathname={pathname}
      navigateDashboard={PATH_ADMIN_APP.root}
    >
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
  );
}

export default CreateKitchenCenterPage;
