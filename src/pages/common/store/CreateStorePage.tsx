/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Button, Card, Stack } from '@mui/material';
//
import { StoreToCreate } from '@types';
import { Color } from 'common/enum';
import { Page } from 'components';
import { useLocales, useValidationForm } from 'hooks';
import { useAppSelector } from 'redux/configStore';
import { PATH_ADMIN_APP } from 'routes/paths';
import { StoreForm } from 'sections/store';

function CreateStorePage() {
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { schemaStore } = useValidationForm();

  const { store, isEditing, pathnameBack } = useAppSelector((state) => state.store);

  const createStoreForm = useForm<StoreToCreate>({
    defaultValues: {
      name: isEditing ? store?.name : '',
      storeManagerEmail: isEditing ? store?.storeManagerEmail : '',
      logo: isEditing ? store?.logo : '',
      kitchenCenterId: isEditing ? store?.kitchenCenter.kitchenCenterId : 0,
      brandId: isEditing ? store?.brand.brandId : 0,
    },
    resolver: yupResolver(schemaStore),
  });

  const { handleSubmit, watch } = createStoreForm;

  const image = watch('logo');

  const onSubmit = async (values: StoreToCreate) => {
    const data = { ...values };
    console.log(data);
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
            <Button variant="outlined" color="inherit" onClick={() => navigate(pathnameBack)}>
              {translate('button.back')}
            </Button>
            <Stack direction="row" gap={1.5}>
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

export default CreateStorePage;
