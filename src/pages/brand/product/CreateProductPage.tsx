/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Button, Card, Stack } from '@mui/material';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
//
import { Params, ProductSizeEnum, ProductToCreate, ProductToCreateParams, ProductTypeEnum } from '@types';
import { Color } from 'common/enum';
import { Page } from 'components';
import { useLocales, useValidationForm } from 'hooks';
import { PATH_BRAND_APP } from 'routes/paths';
import { ProductForm } from 'sections/product';
import { createNewProduct } from 'redux/product/productSlice';

function CreateProductPage(props: any) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { schemaProduct } = useValidationForm();

  const { isEditing } = useAppSelector((state) => state.product);

  const createProductForm = useForm<ProductToCreate>({
    defaultValues: {
      name: '',
      code: '',
      description: '',
      // historicalPrice: 0,
      // sellingPrice: 0,
      // discountPrice: 0,
      // displayOrder: 0,
      image: '',
      size: '',
      type: '',
      // parentProductId: 0,
      // categoryId: 0,
    },
    resolver: yupResolver(schemaProduct),
  });

  const { handleSubmit, watch, reset } = createProductForm;

  const image = watch('image');
  const name = watch('name');
  const code = watch('code');
  const type = watch('type');
  const description = watch('description');
  const displayOrder = watch('displayOrder');

  const resetForm = async (type: string) => {
    let initialValues = {};
    if (type === ProductTypeEnum.SINGLE) {
      initialValues = {
        name: name,
        code: code,
        description: description,
        image: image,
        type: type,
        parentProductId: 0,
        historicalPrice: '',
        sellingPrice: '',
        discountPrice: '',
        size: ProductSizeEnum.MEDIUM,
      };
    }

    if (type === ProductTypeEnum.PARENT) {
      initialValues = {
        type: type,
        name: name,
        code: code,
        description: description,
        image: image,
        displayOrder: displayOrder,
        parentProductId: 0,
        historicalPrice: 0,
        sellingPrice: 0,
        discountPrice: 0,
        size: ProductSizeEnum.MEDIUM,
        categoryId: '',
      };
    }

    if (type === ProductTypeEnum.CHILD) {
      initialValues = {
        type: type,
        name: 'name',
        historicalPrice: '',
        sellingPrice: '',
        discountPrice: '',
        categoryId: 0,
        parentProductId: '',
        size: '',
      };
    }

    if (type === ProductTypeEnum.EXTRA) {
      initialValues = {
        type: type,
        name: name,
        code: code,
        description: description,
        image: image,
        historicalPrice: '',
        sellingPrice: '',
        discountPrice: '',
        categoryId: '',
        parentProductId: 0,
        size: ProductSizeEnum.MEDIUM,
      };
    }

    reset(initialValues);
  };

  useEffect(() => {
    resetForm(type);
  }, [type]);

  const onSubmit = async (values: ProductToCreate) => {
    const data = { ...values };
    console.log('ProductToCreate', data);

    if (type === ProductTypeEnum.SINGLE) {
      const paramsSingle: Params<ProductToCreateParams> = {
        data: { ...data, size: '', parentProductId: '' },
        navigate,
      };
      console.log('ProductToCreate', paramsSingle);
      dispatch(createNewProduct(paramsSingle));
    }

    if (type === ProductTypeEnum.EXTRA) {
      const paramsExtra: Params<ProductToCreateParams> = {
        data: { ...data, size: '', parentProductId: '' },
        navigate,
      };
      console.log('ProductToCreate', paramsExtra);
      dispatch(createNewProduct(paramsExtra));
    }

    if (type === ProductTypeEnum.CHILD) {
      const paramsChild: Params<ProductToCreateParams> = {
        data: { ...data, categoryId: '' },
        navigate,
      };
      console.log('ProductToCreate', paramsChild);
      dispatch(createNewProduct(paramsChild));
    }

    if (type === ProductTypeEnum.PARENT) {
      const paramsParent: Params<ProductToCreateParams> = {
        data: { ...data, size: '', parentProductId: '', historicalPrice: '', sellingPrice: '', discountPrice: '' },
        navigate,
      };
      console.log('ProductToCreate', paramsParent);
      dispatch(createNewProduct(paramsParent));
    }
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
