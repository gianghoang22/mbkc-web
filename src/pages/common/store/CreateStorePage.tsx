import { FormProvider, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import * as yup from 'yup';

// @mui
import { Button, Card, Grid, Stack, TextField, Typography } from '@mui/material';
//
import { Product, StoreToAdd } from '@types';
import { Page, UploadImageField } from 'components';
import { PATH_ADMIN_APP, PATH_BRAND_APP } from 'routes/paths';
import { useAppSelector } from 'redux/configStore';
import { yupResolver } from '@hookform/resolvers/yup';
import { Color } from 'common/enum';
import { StoreForm } from 'sections/store';

const schema = yup.object({
  name: yup.string().required('Please enter store name'),
  logoUrl: yup.string().required('Please choose store logo'),
  kitchenCenter: yup.string().required('Please select kitchen center'),
  brand: yup.string().required('Please select brand'),
});

function CreateStorePage() {
  const { pathname } = useLocation();
  const { isEditing, store } = useAppSelector((state) => state.store);

  const createStoreForm = useForm<StoreToAdd>({
    defaultValues: {
      name: isEditing ? store?.name : '',
      logoUrl: isEditing ? store?.logoUrl : '',
      kitchenCenter: isEditing ? store?.kitchenCenter : '',
      brand: isEditing ? store?.brand : '',
    },
    resolver: yupResolver(schema),
  });

  const { handleSubmit, watch } = createStoreForm;

  const image = watch('logoUrl');
  console.log('image edit', image);

  const onSubmit = async (values: StoreToAdd) => {
    const data = { ...values, logoUrl: image };
    console.log('StoreToAdd', data);
  };

  return (
    <>
      <Page
        title={isEditing ? 'Update Store' : 'Create New Store'}
        pathname={pathname}
        navigateDashboard={PATH_ADMIN_APP.root}
      >
        <FormProvider {...createStoreForm}>
          <Card sx={{ p: 3 }}>
            <StoreForm />
          </Card>
          <Stack direction="row" justifyContent="space-between" mt={12}>
            <Button variant="outlined" color="inherit">
              Back
            </Button>
            <Stack direction="row" gap={1.5}>
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
    </>
  );
}

export default CreateStorePage;
