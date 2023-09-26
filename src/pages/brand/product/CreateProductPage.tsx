import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
// @mui
import { Button, Card, Stack } from '@mui/material';
//
import { ProductSizeEnum, ProductToCreate } from '@types';
import { Color } from 'common/enum';
import { Page } from 'components';
import { useAppSelector } from 'redux/configStore';
import { PATH_BRAND_APP } from 'routes/paths';
import { ProductForm } from 'sections/product';

enum ProductTypeEnum {
  FATHER = 'Father',
  CHILD = 'Child',
  SINGLE = 'Single',
  EXTRA = 'Extra',
}

// const schemaProduct = yup.object({
//   name: yup.string().when('type', {
//     is: ProductTypeEnum.CHILD as ProductTypeEnum,
//     then: yup.string().notRequired(),
//     otherwise: yup.string().required('Please enter Product name'),
//   }),
//   code: yup.string().required('Please enter Product code'),
//   description: yup.string().required('Please enter Product description'),
//   historicalPrice: yup.number().notOneOf([undefined], 'Please enter Original price'),
//   sellingPrice: yup.number().test({
//     name: 'condition',
//     message: 'Please enter Selling price as a valid number',
//     test: function (value) {
//       const type = this.parent.type;
//       if (type === ProductTypeEnum.FATHER) {
//         if (value === undefined) {
//           return true;
//         }
//         if (isNaN(value)) {
//           return false;
//         }
//       }
//       return true;
//     },
//   }),
//   discountPrice: yup.number().test({
//     name: 'condition',
//     message: 'Please enter Discount price',
//     test: function (value) {
//       const type = this.parent.type;
//       return type !== ProductTypeEnum.FATHER || (type === ProductTypeEnum.FATHER && value !== undefined);
//     },
//   }),
//   displayOrder: yup.number().required('Please enter the Product display order'),
//   size: yup
//     .string()
//     .required('Please select Product size')
//     .oneOf(Object.values(ProductSizeEnum), 'Please select Product size'),
//   type: yup
//     .string()
//     .required('Please select Product type')
//     .oneOf(Object.values(ProductTypeEnum), 'Please select Product type'),
//   image: yup.string(),
//   parentProductId: yup.string().required('Please select Father product'),
//   categoryId: yup.string().required('Please select Categories contain products'),
//   brandId: yup.string().required('Please select Product Photo'),
// });

function CreateProductPage(props: any) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { isEditing } = useAppSelector((state) => state.product);

  const createProductForm = useForm<ProductToCreate>({
    defaultValues: {
      code: '',
      name: '',
      description: '',
      historicalPrice: 0,
      sellingPrice: 0,
      discountPrice: 0,
      // displayOrder: 0,
      image: '',
      parentProductId: '',
      categoryId: '',
      brandId: '',
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
        title={isEditing ? `Update  Product` : `Create  Product`}
        pathname={pathname}
        navigateDashboard={PATH_BRAND_APP.root}
      >
        <FormProvider {...createProductForm}>
          <Card sx={{ p: 3 }}>
            <ProductForm />
          </Card>
          <Stack direction="row" justifyContent="space-between" mt={12}>
            <Button variant="outlined" color="inherit" onClick={() => navigate(PATH_BRAND_APP.product.list)}>
              Back
            </Button>
            <Stack direction="row" gap={2}>
              {isEditing && (
                <Button variant="contained" color="inherit">
                  Reset
                </Button>
              )}
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

export default CreateProductPage;
