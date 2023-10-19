import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
// @mui
import { Box, Button, Card, Stack } from '@mui/material';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { createNewKitchenCenter, updateKitchenCenter } from 'redux/kitchenCenter/kitchenCenterSlice';
//
import { CreateKitchenCenterParams, KitchenCenterToAdd, KitchenCenterToUpdate } from '@types';
import { Color } from 'common/enum';
import { LoadingScreen, Page } from 'components';
import { useLocales } from 'hooks';
import { PATH_ADMIN_APP } from 'routes/paths';
import KitchenCenterForm from 'sections/kitchenCenter/KitchenCenterForm';

const schema = yup.object({
  Name: yup.string().required('Please enter brand name'),
  Address: yup.string().required('Please enter kitchen center address'),
  ManagerEmail: yup.string().email('Email is not valid').required(),
});

function CreateKitchenCenterPage(props: any) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { translate } = useLocales();
  const dispatch = useAppDispatch();
  const { isEditing, isLoading, kitchenCenter } = useAppSelector((state) => state.kitchenCenter);

  const createKitchenCenterForm = useForm<KitchenCenterToAdd>({
    defaultValues: {
      Name: isEditing ? kitchenCenter?.name : '',
      Address: isEditing ? kitchenCenter?.address : '',
      Logo: isEditing ? kitchenCenter?.logo : '',
      ManagerEmail: isEditing ? kitchenCenter?.kitchenCenterManagerEmail : '',
    },
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = createKitchenCenterForm;

  const onSubmit = async (values: KitchenCenterToAdd) => {
    // Create a kitchen center
    const data = { ...values };
    const params: CreateKitchenCenterParams = {
      newKitchenCenter: data,
      navigate,
    };

    // Update a kitchen center
    const updateKitchenCenterOptions: KitchenCenterToUpdate = {
      Name: values.Name,
      Address: values.Address,
      Status: 'ACTIVE',
      Logo: values.Logo,
      ManagerEmail: values.ManagerEmail,
    };

    const paramsUpdate = {
      updateKitchenCenterOptions: updateKitchenCenterOptions,
      kitchenCenterId: kitchenCenter?.kitchenCenterId,
      navigate,
    };

    if (isEditing) {
      dispatch<any>(updateKitchenCenter(paramsUpdate));
    } else {
      dispatch<any>(createNewKitchenCenter(params));
    }
  };

  return (
    <>
      {isEditing && (
        <>
          {isLoading && (
            <Box sx={{ position: 'fixed', zIndex: 1300, top: 0, bottom: 0, left: 0, right: 0 }}>
              <LoadingScreen />
            </Box>
          )}
        </>
      )}

      <Page
        title={
          isEditing
            ? translate('page.title.update', { model: translate('model.lowercase.kitchenCenter') })
            : translate('page.title.create', { model: translate('model.lowercase.kitchenCenter') })
        }
        pathname={pathname}
        navigateDashboard={PATH_ADMIN_APP.root}
      >
        <FormProvider {...createKitchenCenterForm}>
          <Card sx={{ p: 3 }}>
            <KitchenCenterForm />
          </Card>
          <Stack direction="row" justifyContent="space-between" mt={12}>
            <Button variant="outlined" color="inherit" onClick={() => navigate(PATH_ADMIN_APP.kitchenCenter.list)}>
              {translate('button.back')}
            </Button>
            <Stack direction="row" gap={2}>
              {isEditing && (
                <Button variant="contained" color="inherit">
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

export default CreateKitchenCenterPage;
