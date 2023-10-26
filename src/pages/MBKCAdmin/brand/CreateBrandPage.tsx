import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// @mui
import { Button, Card, Stack } from '@mui/material';
//
import { BrandToCreate, BrandToUpdate } from '@types';
import { Color } from 'common/enum';
import { LoadingScreen, Page } from 'components';
import { useLocales, useValidationForm } from 'hooks';
import { useAppSelector } from 'redux/configStore';
import { PATH_ADMIN_APP } from 'routes/paths';
import BrandForm from 'sections/brand/BrandForm';
import { useDispatch } from 'react-redux';
import { createNewBrand, getBrandDetail, updateBrand } from 'redux/brand/brandSlice';
import { Box } from '@mui/material';
import { useEffect, useMemo } from 'react';

function CreateBrandPage() {
  const { id: brandId } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { translate } = useLocales();
  const { schemaBrand } = useValidationForm();

  const { pathnameToBack } = useAppSelector((state: any) => state.routes);
  const { isEditing, isLoading, brand } = useAppSelector((state: any) => state.brand);

  const createBrandForm = useForm<BrandToCreate>({
    defaultValues: {
      Name: '',
      Address: '',
      ManagerEmail: '',
      Logo: '',
    },
    resolver: yupResolver(schemaBrand),
  });

  const { handleSubmit, setValue } = createBrandForm;

  const onSubmit = async (values: BrandToCreate) => {
    // Create a brand
    const data = { ...values };
    const params = {
      newBrand: data,
      navigate,
    };

    // Update a brand
    const BrandToUpdate: BrandToUpdate = {
      Name: values.Name,
      Status: 'ACTIVE',
      Address: values.Address,
      Logo: values.Logo,
      BrandManagerEmail: values.ManagerEmail,
    };

    const updateBrandParams = {
      updateBrandOptions: BrandToUpdate,
      brandId: brand?.brandId,
      navigate,
    };

    // Actions
    if (isEditing) {
      dispatch<any>(updateBrand(updateBrandParams));
    } else {
      dispatch<any>(createNewBrand(params));
    }
  };

  const paramsDetail = useMemo(() => {
    return {
      brandId,
      navigate,
    };
  }, [brandId, navigate]);

  useEffect(() => {
    if (isEditing) {
      dispatch<any>(getBrandDetail(paramsDetail));
    }
  }, [dispatch, navigate, paramsDetail, isEditing]);

  useEffect(() => {
    if (brand !== null && isEditing === true) {
      setValue('Name', brand?.name as string);
      setValue('Address', brand?.address as string);
      setValue('ManagerEmail', brand?.brandManagerEmail);
      setValue('Logo', brand?.logo as string);
    }
  }, [brand, isEditing, setValue]);

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
            ? translate('page.title.update', { model: translate('model.lowercase.brand') })
            : translate('page.title.create', { model: translate('model.lowercase.brand') })
        }
        pathname={pathname}
        navigateDashboard={PATH_ADMIN_APP.root}
      >
        <FormProvider {...createBrandForm}>
          <Card sx={{ p: 3 }}>
            <BrandForm />
          </Card>
          <Stack direction="row" justifyContent="space-between" mt={12}>
            <Button variant="outlined" color="inherit" onClick={() => navigate(pathnameToBack)}>
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
                type="submit"
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

export default CreateBrandPage;
