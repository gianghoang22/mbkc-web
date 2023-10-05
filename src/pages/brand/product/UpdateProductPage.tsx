/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// @mui
import { Button, Card, Stack } from '@mui/material';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { createNewProduct, getAllProductsParent, getProductDetail } from 'redux/product/productSlice';
//
import {
  CategoryType,
  ListParams,
  Params,
  ProductSizeEnum,
  ProductToCreate,
  ProductToCreateParams,
  ProductTypeEnum,
} from '@types';
import { Color } from 'common/enum';
import { Page } from 'components';
import { useLocales, usePagination, useValidationForm } from 'hooks';
import { PATH_BRAND_APP } from 'routes/paths';
import { ProductForm } from 'sections/product';
import { getAllCategories } from 'redux/category/categorySlice';

function CreateProductPage() {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { schemaProduct } = useValidationForm();
  const { page, rowsPerPage } = usePagination();

  const { product, productParent, isEditing, isLoading } = useAppSelector((state) => state.product);
  const { categories } = useAppSelector((state) => state.category);

  const createProductForm = useForm<ProductToCreate>({
    defaultValues: {
      name: '',
      code: '',
      description: '',
      displayOrder: 0,
    },
    resolver: yupResolver(schemaProduct),
  });

  const { handleSubmit, watch, reset } = createProductForm;

  const type = watch('type');
  const name = watch('name');
  const code = watch('code');
  const image = watch('image');
  const size = watch('size');
  const description = watch('description');
  const displayOrder = watch('displayOrder');
  const historicalPrice = watch('historicalPrice');
  const sellingPrice = watch('sellingPrice');
  const discountPrice = watch('discountPrice');
  const parentProductId = watch('parentProductId');

  console.log(type);

  const params = useMemo(() => {
    return {
      productId: parentProductId,
      navigate,
    };
  }, [parentProductId, navigate]);

  const paramsEditing = useMemo(() => {
    return {
      productId: productId,
      navigate,
    };
  }, [parentProductId]);

  const paramsCategory: ListParams = useMemo(() => {
    return {
      optionParams: {
        type: type === ProductTypeEnum.EXTRA ? CategoryType.EXTRA : CategoryType.NORMAL,
      },
      navigate,
    };
  }, [type]);

  const paramsProduct: ListParams = useMemo(() => {
    return {
      optionParams: {
        type: ProductTypeEnum.PARENT,
        isGetAll: true,
      },
      navigate,
    };
  }, [type]);

  useEffect(() => {
    if (type === ProductTypeEnum.CHILD) {
      dispatch<any>(getAllProductsParent(paramsProduct));
    }
    dispatch<any>(getAllCategories(paramsCategory));
  }, [paramsCategory, paramsProduct, type]);

  useEffect(() => {
    if (product !== null && isEditing === true) {
      if (product?.type === ProductTypeEnum.SINGLE) {
        reset({
          name: product?.name,
          code: product?.code,
          description: product?.description,
          historicalPrice: product?.historicalPrice,
          sellingPrice: product?.sellingPrice,
          discountPrice: product?.discountPrice,
          displayOrder: product?.displayOrder,
          image: product?.image,
          size:
            product?.size === ProductSizeEnum.SMALL
              ? ProductSizeEnum.SMALL
              : product?.size === ProductSizeEnum.MEDIUM
              ? ProductSizeEnum.MEDIUM
              : ProductSizeEnum.LARGE,
          type: ProductTypeEnum.SINGLE,
          parentProductId: 0,
          categoryId: product?.category.categoryId,
        });
      }
      if (product?.type === ProductTypeEnum.PARENT) {
        reset({
          name: product?.name,
          code: product?.code,
          description: product?.description,
          historicalPrice: 0,
          sellingPrice: 0,
          discountPrice: 0,
          displayOrder: product?.displayOrder,
          image: product?.image,
          size: '',
          type: ProductTypeEnum.PARENT,
          parentProductId: 0,
          categoryId: product?.category.categoryId,
        });
      }
      if (product?.type === ProductTypeEnum.CHILD) {
        reset({
          name: product?.name,
          code: product?.code,
          description: product?.description,
          historicalPrice: product?.historicalPrice,
          sellingPrice: product?.sellingPrice,
          discountPrice: product?.discountPrice,
          displayOrder: product?.displayOrder,
          image: product?.image,
          size:
            product?.size === ProductSizeEnum.SMALL
              ? ProductSizeEnum.SMALL
              : product?.size === ProductSizeEnum.MEDIUM
              ? ProductSizeEnum.MEDIUM
              : ProductSizeEnum.LARGE,
          type: ProductTypeEnum.CHILD,
          parentProductId: Number(product?.parentProductId),
          categoryId: product?.category.categoryId,
        });
      }
      if (product?.type === ProductTypeEnum.EXTRA) {
        reset({
          name: product?.name,
          code: product?.code,
          description: product?.description,
          historicalPrice: product?.historicalPrice,
          sellingPrice: product?.sellingPrice,
          discountPrice: product?.discountPrice,
          displayOrder: product?.displayOrder,
          image: product?.image,
          type: ProductTypeEnum.EXTRA,
          size: '',
          parentProductId: 0,
          categoryId: product?.category.categoryId,
        });
      }
    }
  }, [product]);

  useEffect(() => {
    if (product?.type === ProductTypeEnum.CHILD || type === ProductTypeEnum.CHILD) {
      if (parentProductId !== undefined && parentProductId !== 0 && parentProductId.toString() !== '') {
        dispatch(getProductDetail(params));
      }
    }
    if (isEditing) {
      dispatch(getProductDetail(paramsEditing));
    }
  }, [params, paramsEditing]);

  //for set name of product child
  useEffect(() => {
    if (product?.type === ProductTypeEnum.CHILD || type === ProductTypeEnum.CHILD) {
      if (product?.name !== undefined && size !== undefined) {
        reset({
          name: isEditing
            ? product?.name
            : `${product?.name === undefined ? 'parent name' : product.name} - size ${size}`,
          type: type,
          code: code,
          image: image,
          description: description,
          displayOrder: displayOrder,
          parentProductId: parentProductId,
          historicalPrice: historicalPrice,
          sellingPrice: sellingPrice,
          discountPrice: discountPrice,
          size: size,
          categoryId: 0,
        });
      }
    }
  }, [parentProductId, size]);

  const resetForm = async (type: string) => {
    let initialValues = {};
    if (type === ProductTypeEnum.SINGLE) {
      initialValues = {
        type: type,
        name: name,
        code: code,
        image: image,
        description: description,
        displayOrder: displayOrder,
        parentProductId: 0,
        historicalPrice: isEditing ? product?.historicalPrice : '',
        sellingPrice: isEditing ? product?.sellingPrice : '',
        discountPrice: isEditing ? product?.discountPrice : '',
        size: ProductSizeEnum.MEDIUM,
        categoryId: isEditing ? product?.category.categoryId : '',
      };
    }

    if (type === ProductTypeEnum.PARENT) {
      initialValues = {
        type: type,
        name: name,
        code: code,
        image: image,
        description: description,
        displayOrder: displayOrder,
        parentProductId: 0,
        historicalPrice: '',
        sellingPrice: '',
        discountPrice: '',
        size: ProductSizeEnum.MEDIUM,
        categoryId: isEditing ? product?.category.categoryId : '',
      };
    }

    if (type === ProductTypeEnum.CHILD) {
      initialValues = {
        type: type,
        code: code,
        image: image,
        description: description,
        displayOrder: displayOrder,
        name: isEditing
          ? product?.name
          : `${product?.name === undefined ? 'parent name' : product.name} - ${size ? size : 'size'}`,
        historicalPrice: isEditing ? product?.historicalPrice : '',
        sellingPrice: isEditing ? product?.sellingPrice : '',
        discountPrice: isEditing ? product?.discountPrice : '',
        categoryId: 0,
        parentProductId: isEditing ? Number(product?.parentProductId) : '',
        size: isEditing
          ? product?.size === ProductSizeEnum.SMALL
            ? ProductSizeEnum.SMALL
            : product?.size === ProductSizeEnum.MEDIUM
            ? ProductSizeEnum.MEDIUM
            : ProductSizeEnum.LARGE
          : '',
      };
    }

    if (type === ProductTypeEnum.EXTRA) {
      initialValues = {
        type: type,
        name: name,
        code: code,
        image: image,
        description: description,
        displayOrder: displayOrder,
        historicalPrice: isEditing ? product?.historicalPrice : '',
        sellingPrice: isEditing ? product?.sellingPrice : '',
        discountPrice: isEditing ? product?.discountPrice : '',
        categoryId: isEditing ? product?.category.categoryId : '',
        parentProductId: 0,
        size: ProductSizeEnum.MEDIUM,
      };
    }

    reset(initialValues);
  };

  useEffect(() => {
    if (!isEditing) {
      resetForm(type);
    }
  }, [type]);

  const onSubmit = async (values: ProductToCreate) => {
    const data = { ...values };
    console.log('ProductToCreate', data);

    if (isEditing) {
      console.log(data);
    } else {
      if (type === ProductTypeEnum.SINGLE) {
        const paramsSingle: Params<ProductToCreateParams> = {
          data: { ...data, size: '', parentProductId: '' },
          optionParams: {
            currentPage: page + 1,
            itemsPerPage: rowsPerPage,
          },
          navigate,
        };
        dispatch(createNewProduct(paramsSingle));
      }

      if (type === ProductTypeEnum.EXTRA) {
        const paramsExtra: Params<ProductToCreateParams> = {
          data: { ...data, size: '', parentProductId: '' },
          optionParams: {
            currentPage: page + 1,
            itemsPerPage: rowsPerPage,
          },
          navigate,
        };
        dispatch(createNewProduct(paramsExtra));
      }

      if (type === ProductTypeEnum.CHILD) {
        const paramsChild: Params<ProductToCreateParams> = {
          data: { ...data, categoryId: '' },
          optionParams: {
            currentPage: page + 1,
            itemsPerPage: rowsPerPage,
          },
          navigate,
        };
        console.log('ProductToCreate', paramsChild);
        dispatch(createNewProduct(paramsChild));
      }

      if (type === ProductTypeEnum.PARENT) {
        const paramsParent: Params<ProductToCreateParams> = {
          data: { ...data, size: '', parentProductId: '', historicalPrice: '', sellingPrice: '', discountPrice: '' },
          optionParams: {
            currentPage: page + 1,
            itemsPerPage: rowsPerPage,
          },
          navigate,
        };
        dispatch(createNewProduct(paramsParent));
      }
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
                <Button variant="contained" color="inherit" disabled={isLoading}>
                  {translate('button.reset')}
                </Button>
              )}
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                onClick={handleSubmit(onSubmit)}
                color={isEditing ? Color.WARNING : Color.PRIMARY}
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
