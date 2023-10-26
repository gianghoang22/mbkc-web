import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// @mui
import { Box, Button, Card, Stack } from '@mui/material';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import {
  createNewKitchenCenter,
  getKitchenCenterDetail,
  updateKitchenCenter,
} from 'redux/kitchenCenter/kitchenCenterSlice';
//
import { CreateKitchenCenterParams, KitchenCenterToAdd, KitchenCenterToUpdate } from '@types';
import { Color } from 'common/enum';
import { LoadingScreen, Page } from 'components';
import { useLocales, useValidationForm } from 'hooks';
import { PATH_ADMIN_APP } from 'routes/paths';
import KitchenCenterForm from 'sections/kitchenCenter/KitchenCenterForm';
import { useEffect, useMemo } from 'react';

function CreateKitchenCenterPage() {
  const { id: kitchenCenterId } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { translate } = useLocales();
  const dispatch = useAppDispatch();
  const { schemaKitchenCenter } = useValidationForm();
  const { isEditing, isLoading, kitchenCenter } = useAppSelector((state) => state.kitchenCenter);

  const createKitchenCenterForm = useForm<KitchenCenterToAdd>({
    defaultValues: {
      Name: '',
      Address: '',
      Logo: '',
      ManagerEmail: '',
    },
    resolver: yupResolver(schemaKitchenCenter),
  });

  const { handleSubmit, setValue } = createKitchenCenterForm;

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

  const paramsDetail = useMemo(() => {
    return {
      kitchenCenterId,
      navigate,
    };
  }, [kitchenCenterId, navigate]);

  useEffect(() => {
    if (isEditing) {
      dispatch<any>(getKitchenCenterDetail(paramsDetail));
    }
  }, [dispatch, navigate, paramsDetail, isEditing]);

  useEffect(() => {
    if (kitchenCenter !== null && isEditing === true) {
      setValue('Name', kitchenCenter?.name as string);
      setValue('Address', kitchenCenter?.address as string);
      setValue('Logo', kitchenCenter?.logo as string);
      setValue('ManagerEmail', kitchenCenter?.kitchenCenterManagerEmail as string);
    }
  }, [kitchenCenter, isEditing, setValue]);

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
