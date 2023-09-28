import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
// @mui
import { Button, Card, Stack } from '@mui/material';
//
import { CreateKitchenCenterParams, KitchenCenterToAdd } from '@types';
import { Page } from 'components';
import { PATH_ADMIN_APP } from 'routes/paths';
import KitchenCenterForm from 'sections/kitchenCenter/KitchenCenterForm';
import { useAppSelector } from 'redux/configStore';
import { Color } from 'common/enum';
import { useDispatch } from 'react-redux';
import { createNewKitchenCenter, getAllKitchenCenters } from 'redux/kitchenCenter/kitchenCenterSlice';

const schema = yup.object({
  Name: yup.string().required('Please enter brand name'),
  Address: yup.string().required('Please enter kitchen center address'),
  Logo: yup.string().required('Please select kitchen center logo'),
  ManagerEmail: yup.string().email('Email is not valid').required(),
});

function CreateKitchenCenterPage(props: any) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { isEditing, kitchenCenter } = useAppSelector((state) => state.kitchenCenter);

  const createKitchenCenterForm = useForm<KitchenCenterToAdd>({
    defaultValues: {
      Name: isEditing ? kitchenCenter?.name : '',
      Address: isEditing ? kitchenCenter?.address : '',
      // Logo: isEditing ? kitchenCenter?.logo : '',
      ManagerEmail: isEditing ? kitchenCenter?.managerEmail : '',
    },
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = createKitchenCenterForm;

  const onSubmit = async (values: KitchenCenterToAdd) => {
    const data = { ...values };

    console.log('data: ', data);
    const params: CreateKitchenCenterParams = {
      newKitchenCenter: data,
      navigate,
    };
    dispatch<any>(createNewKitchenCenter(params));
  };

  return (
    <Page
      title={isEditing ? 'Update Kitchen Center' : 'Create New Kitchen Center'}
      pathname={pathname}
      navigateDashboard={PATH_ADMIN_APP.root}
    >
      <FormProvider {...createKitchenCenterForm}>
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
