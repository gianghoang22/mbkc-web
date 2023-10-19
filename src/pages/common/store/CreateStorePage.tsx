/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// @mui
import { Box, Button, Card, Stack } from '@mui/material';
//
import { ListParams, Params, StoreToCreate, StoreToUpdate } from '@types';
import { Color, Status } from 'common/enum';
import { LoadingScreen, Page } from 'components';
import { useLocales, useValidationForm } from 'hooks';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { createNewStore, getStoreDetail, updateStore } from 'redux/store/storeSlice';
import { PATH_ADMIN_APP } from 'routes/paths';
import { StoreForm } from 'sections/store';
import { getAllKitchenCenters } from 'redux/kitchenCenter/kitchenCenterSlice';

function CreateStorePage() {
  const { id: storeId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { schemaStore } = useValidationForm();

  const { brandProfile } = useAppSelector((state) => state.profile);
  const { pathnameToBack } = useAppSelector((state) => state.routes);
  const { store, isEditing, isLoading } = useAppSelector((state) => state.store);
  const { isLoading: isLoadingKitchenCenters } = useAppSelector((state) => state.kitchenCenter);
  console.log('isLoadingKitchenCenters', isLoadingKitchenCenters);

  const createStoreForm = useForm<StoreToCreate>({
    defaultValues: {
      name: isEditing && store ? store?.name : '',
      logo: isEditing && store ? store?.logo : '',
      storeManagerEmail: isEditing && store ? store?.storeManagerEmail : '',
      kitchenCenterId: isEditing && store ? store?.kitchenCenter.kitchenCenterId : 0,
      brandId: brandProfile?.brandId,
    },
    resolver: yupResolver(schemaStore),
  });

  const { handleSubmit, reset } = createStoreForm;

  const paramsKitchenCenter: ListParams = useMemo(() => {
    return {
      optionParams: {
        isGetAll: true,
      },
      navigate,
    };
  }, []);

  useEffect(() => {
    if (!isEditing) {
      dispatch(getAllKitchenCenters(paramsKitchenCenter));
    }
  }, [paramsKitchenCenter]);

  const params = useMemo(() => {
    return {
      storeId,
      navigate,
    };
  }, [storeId, navigate]);

  useEffect(() => {
    if (store !== null && isEditing === true) {
      reset({
        name: store?.name,
        logo: store?.logo,
        storeManagerEmail: store?.storeManagerEmail,
        kitchenCenterId: store?.kitchenCenter.kitchenCenterId,
        brandId: store?.brand.brandId,
      });
    }
  }, [store]);

  useEffect(() => {
    if (isEditing) {
      dispatch(getStoreDetail(params));
    }
  }, [dispatch, navigate, params]);

  const onSubmit = async (values: StoreToCreate) => {
    const data = { ...values };

    if (isEditing) {
      const paramUpdate: Params<StoreToUpdate> = {
        data: {
          name: data.name,
          status: store?.status === Status.ACTIVE ? Status.ACTIVE : Status.INACTIVE,
          logo: typeof values.logo === 'string' ? '' : data.logo,
          storeManagerEmail: data.storeManagerEmail,
        },
        idParams: {
          storeId: store?.storeId,
        },
        pathname: pathname,
        navigate,
      };
      dispatch(updateStore(paramUpdate));
    } else {
      const paramCreate: Params<StoreToCreate> = {
        data: data,
        navigate,
      };
      dispatch(createNewStore(paramCreate));
    }
  };

  return (
    <>
      {isEditing ? (
        <>
          {isLoading && (
            <Box sx={{ position: 'fixed', zIndex: 1300, top: 0, bottom: 0, left: 0, right: 0 }}>
              <LoadingScreen />
            </Box>
          )}
        </>
      ) : (
        <>
          {isLoadingKitchenCenters && (
            <Box sx={{ position: 'fixed', zIndex: 1300, top: 0, bottom: 0, left: 0, right: 0 }}>
              <LoadingScreen />
            </Box>
          )}
        </>
      )}

      <Page
        title={
          isEditing
            ? translate('page.title.update', { model: translate('model.lowercase.store') })
            : translate('page.title.create', { model: translate('model.lowercase.store') })
        }
        pathname={pathname}
        navigateDashboard={PATH_ADMIN_APP.root}
      >
        <FormProvider {...createStoreForm}>
          <Card sx={{ p: 3 }}>
            <StoreForm />
          </Card>

          <Stack direction="row" justifyContent="space-between" mt={12}>
            <Button variant="outlined" color="inherit" onClick={() => navigate(pathnameToBack)}>
              {translate('button.back')}
            </Button>
            <Stack direction="row" gap={1.5}>
              {isEditing && (
                <Button
                  variant="contained"
                  color="inherit"
                  disabled={isLoading}
                  onClick={() => {
                    reset({
                      name: store?.name,
                      logo: store?.logo,
                      storeManagerEmail: store?.storeManagerEmail,
                      kitchenCenterId: store?.kitchenCenter.kitchenCenterId,
                    });
                  }}
                >
                  {translate('button.reset')}
                </Button>
              )}
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                color={isEditing ? Color.WARNING : Color.PRIMARY}
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

export default CreateStorePage;
