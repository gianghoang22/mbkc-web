import { Grid, Stack, Typography } from '@mui/material';
import { PRODUCT_SIZE_OPTIONS, PRODUCT_TYPE_OPTIONS, ProductSizeEnum, ProductToCreate, ProductTypeEnum } from '@types';
import { InputField, SelectField, UploadImageField } from 'components';
import { useFormContext } from 'react-hook-form';
import { useAppSelector } from 'redux/configStore';

function ProductForm() {
  const { isEditing } = useAppSelector((state) => state.product);

  const { watch } = useFormContext<ProductToCreate>();
  const productType = watch('type');
  console.log('productType', productType);

  return (
    <Grid container columnSpacing={3}>
      <Grid item md={3} sm={12}>
        <Stack alignItems="center" gap={3}>
          <Stack width="100%">
            <Typography variant="subtitle1">Image</Typography>
            <Typography variant="body2" color="grey.600">
              Select file for product's image
            </Typography>
          </Stack>
          <UploadImageField label="Drag and drop or select files" name="image" defaultValue="" isEditing={isEditing} />
        </Stack>
      </Grid>
      <Grid item md={9} sm={12}>
        <Stack gap={3}>
          <Stack width="100%">
            <Typography variant="subtitle1">Detail</Typography>
            <Typography variant="body2" color="grey.600">
              Name, code, type,...
            </Typography>
          </Stack>

          <Stack spacing={3}>
            <Stack direction="row" alignItems="start" gap={2}>
              <InputField
                fullWidth
                name="name"
                label="Name"
                disabled={productType === ProductTypeEnum.CHILD}
                helperText={
                  productType === ProductTypeEnum.CHILD ? 'Tên của sản phẩm con: tên sản phẩm cha + size được chọn' : ''
                }
              />
              <InputField fullWidth name="code" label="Code" />
            </Stack>
            <InputField fullWidth name="description" label="Description" multiline minRows={8} />
            <Stack direction="row" alignItems="start" gap={2}>
              <SelectField<ProductTypeEnum> fullWidth options={PRODUCT_TYPE_OPTIONS} name="type" label="Product type" />
              <InputField type="number" fullWidth name="displayOrder" label="Display order" />
            </Stack>
            {(productType === ProductTypeEnum.CHILD ||
              productType === ProductTypeEnum.SINGLE ||
              productType === ProductTypeEnum.EXTRA) && (
              <Stack direction="row" alignItems="start" gap={2}>
                <InputField
                  fullWidth
                  type="number"
                  name="sellingPrice"
                  label="Selling price*"
                  helperText="Selling price of the product"
                />
                <InputField
                  fullWidth
                  type="number"
                  name="discountPrice"
                  label="Discount price*"
                  helperText="Reduced price of the product"
                />
                <InputField
                  fullWidth
                  type="number"
                  name="historicalPrice"
                  label="Original price*"
                  helperText="Cost of manufacturing products"
                />
              </Stack>
            )}
            {(productType === ProductTypeEnum.EXTRA ||
              productType === ProductTypeEnum.SINGLE ||
              productType === ProductTypeEnum.FATHER) && (
              <SelectField<ProductTypeEnum>
                fullWidth
                options={PRODUCT_TYPE_OPTIONS}
                name="categoryId"
                label={
                  productType === ProductTypeEnum.EXTRA
                    ? 'Categories contain extra products'
                    : 'Categories contain products'
                }
              />
            )}
            {productType === ProductTypeEnum.CHILD && (
              <Stack direction="row" alignItems="start" gap={2}>
                <SelectField<ProductTypeEnum>
                  fullWidth
                  options={PRODUCT_TYPE_OPTIONS}
                  name="parentProductId"
                  label="Father Product"
                />
                <SelectField<ProductSizeEnum>
                  fullWidth
                  options={PRODUCT_SIZE_OPTIONS}
                  name="size"
                  label="Product size"
                />
              </Stack>
            )}
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default ProductForm;
