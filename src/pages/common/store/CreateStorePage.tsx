import { FormProvider, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import * as yup from 'yup';
// @mui
import { Button, Card, Stack } from '@mui/material';
//
import { yupResolver } from '@hookform/resolvers/yup';
import { StoreToAdd } from '@types';
import { Color } from 'common/enum';
import { Page } from 'components';
import { useAppSelector } from 'redux/configStore';
import { PATH_ADMIN_APP } from 'routes/paths';
import { StoreForm } from 'sections/store';
import { useLocales } from 'hooks';

const schema = yup.object({
  name: yup.string().required('Please enter store name'),
  logoUrl: yup.string().required('Please choose store logo'),
  kitchenCenter: yup.string().required('Please select kitchen center'),
  brand: yup.string().required('Please select brand'),
});

function CreateStorePage() {
  const { pathname } = useLocation();
  const { translate } = useLocales();
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
        title={
          isEditing
            ? translate('page.title.update', { model: translate('model.store') })
            : translate('page.title.create', { model: translate('model.store') })
        }
        pathname={pathname}
        navigateDashboard={PATH_ADMIN_APP.root}
      >
        <FormProvider {...createStoreForm}>
          <Card sx={{ p: 3 }}>
            <StoreForm />
          </Card>
          <Stack direction="row" justifyContent="space-between" mt={12}>
            <Button variant="outlined" color="inherit">
              {translate('page.action.back')}
            </Button>
            <Stack direction="row" gap={1.5}>
              {isEditing && (
                <Button variant="contained" color="inherit">
                  {translate('page.action.reset')}
                </Button>
              )}
              <Button
                variant="contained"
                color={isEditing ? Color.WARNING : Color.PRIMARY}
                type="submit"
                onClick={handleSubmit(onSubmit)}
              >
                {isEditing ? translate('page.action.update') : translate('page.action.create')}
              </Button>
            </Stack>
          </Stack>
        </FormProvider>
      </Page>
    </>
  );
}

export default CreateStorePage;
