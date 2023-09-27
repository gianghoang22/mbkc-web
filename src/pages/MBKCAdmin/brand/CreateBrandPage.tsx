import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Button, Card, Stack } from '@mui/material';
//
import { BrandToCreate } from '@types';
import { Color } from 'common/enum';
import { Page } from 'components';
import { useLocales, useValidationForm } from 'hooks';
import { useAppSelector } from 'redux/configStore';
import { PATH_ADMIN_APP } from 'routes/paths';
import BrandForm from 'sections/brand/BrandForm';

function CreateBrandPage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { schemaBrand } = useValidationForm();
  const { isEditing, brand, pathnameBack } = useAppSelector((state) => state.brand);

  const createBrandForm = useForm<BrandToCreate>({
    defaultValues: {
      name: isEditing ? brand?.brandName : '',
      address: isEditing ? brand?.address : '',
      email: isEditing ? brand?.brandManagerEmail : '',
      logoUrl: isEditing ? brand?.brandImgUrl : '',
    },
    resolver: yupResolver(schemaBrand),
  });

  const { handleSubmit } = createBrandForm;

  const onSubmit = async (values: BrandToCreate) => {
    const data = { ...values };
    console.log('BrandToCreate', data);
  };

  return (
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
          <Button variant="outlined" color="inherit" onClick={() => navigate(pathnameBack)}>
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
  );
}

export default CreateBrandPage;
