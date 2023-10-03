/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// @mui
import { Button, Card, Stack } from '@mui/material';
//
import { Params, StoreToCreate, StoreToUpdate } from '@types';
import { Color, Status } from 'common/enum';
import { Page } from 'components';
import { useLocales, useValidationForm } from 'hooks';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { createNewStore, getStoreDetail, updateStore } from 'redux/store/storeSlice';
import { PATH_ADMIN_APP } from 'routes/paths';
import { StoreForm } from 'sections/store';

function CreateStorePage() {
  const { id: storeId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { schemaStore } = useValidationForm();

  const { pathnameToBack } = useAppSelector((state) => state.routes);
  const { store, isEditing, isLoading } = useAppSelector((state) => state.store);

  const createStoreForm = useForm<StoreToCreate>({
    defaultValues: {
      name: isEditing && store ? store?.name : '',
      logo: isEditing && store ? store?.logo : '',
      storeManagerEmail: isEditing && store ? store?.storeManagerEmail : '',
      kitchenCenterId: isEditing && store ? store?.kitchenCenter.kitchenCenterId : 0,
      brandId: 1,
    },
    resolver: yupResolver(schemaStore),
  });

  const { handleSubmit, reset } = createStoreForm;

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
      if (typeof values.logo === 'string') {
        const paramUpdate: Params<StoreToUpdate> = {
          data: {
            name: data.name,
            status: store?.status === Status.ACTIVE ? Status.ACTIVE : Status.INACTIVE,
            logo: '',
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
        const paramUpdate: Params<StoreToUpdate> = {
          data: {
            name: data.name,
            status: store?.status === Status.ACTIVE ? Status.ACTIVE : Status.INACTIVE,
            logo: data.logo,
            storeManagerEmail: data.storeManagerEmail,
          },
          idParams: {
            storeId: store?.storeId,
          },
          pathname: pathname,
          navigate,
        };
        dispatch(updateStore(paramUpdate));
      }
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
