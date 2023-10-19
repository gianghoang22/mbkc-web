import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
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
import { createNewBrand, updateBrand } from 'redux/brand/brandSlice';
import { Box } from '@mui/material';

function CreateBrandPage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { translate } = useLocales();
  const { schemaBrand } = useValidationForm();

  const { pathnameToBack } = useAppSelector((state: any) => state.routes);
  const { isEditing, isLoading, brand } = useAppSelector((state: any) => state.brand);

  const createBrandForm = useForm<BrandToCreate>({
    defaultValues: {
      Name: isEditing ? brand?.name : '',
      Address: isEditing ? brand?.address : '',
      ManagerEmail: isEditing ? brand?.brandManagerEmail : '',
      Logo: isEditing ? brand?.logo : '',
    },
    resolver: yupResolver(schemaBrand),
  });

  const { handleSubmit } = createBrandForm;

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
