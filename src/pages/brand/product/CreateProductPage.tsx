import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Button, Card, Stack } from '@mui/material';
// redux
import { useAppSelector } from 'redux/configStore';
//
import { ProductToCreate } from '@types';
import { Color } from 'common/enum';
import { Page } from 'components';
import { useLocales, useValidationForm } from 'hooks';
import { PATH_BRAND_APP } from 'routes/paths';
import { ProductForm } from 'sections/product';

function CreateProductPage(props: any) {
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { schemaProduct } = useValidationForm();

  const { isEditing } = useAppSelector((state) => state.product);

  const createProductForm = useForm<ProductToCreate>({
    defaultValues: {
      name: '',
      code: '',
      description: '',
      historicalPrice: 0,
      sellingPrice: 0,
      discountPrice: 0,
      displayOrder: 0,
      image: '',
      parentProductId: 0,
      categoryId: 0,
    },
    // resolver: yupResolver(schemaProduct),
  });

  const { handleSubmit, watch } = createProductForm;

  const image = watch('image');
  const type = watch('type');
  console.log('type', type);

  const onSubmit = async (values: ProductToCreate) => {
    const data = { ...values, image: image };
    console.log('ProductToCreate', data);
  };

  return (
    <>
      <Page
        containerWidth="xl"
        title={
          isEditing
            ? translate('page.title.update', { model: translate('model.lowercase.product') })
            : translate('page.title.create', { model: translate('model.lowercase.product') })
        }
        pathname={pathname}
        navigateDashboard={PATH_BRAND_APP.root}
      >
        <FormProvider {...createProductForm}>
          <Card sx={{ p: 3 }}>
            <ProductForm />
          </Card>
          <Stack direction="row" justifyContent="space-between" mt={12}>
            <Button variant="outlined" color="inherit" onClick={() => navigate(PATH_BRAND_APP.product.list)}>
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

export default CreateProductPage;
