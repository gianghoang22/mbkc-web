import { useFormContext } from 'react-hook-form';
//
import { Grid, Stack, Typography } from '@mui/material';
// redux
import { useAppSelector } from 'redux/configStore';
//
import { PRODUCT_SIZE_OPTIONS, PRODUCT_TYPE_OPTIONS, ProductSizeEnum, ProductToCreate, ProductTypeEnum } from '@types';
import { Language } from 'common/enum';
import { InputField, SelectField, UploadImageField } from 'components';
import { useLocales } from 'hooks';

function ProductForm() {
  const { translate, currentLang } = useLocales();

  const { isEditing } = useAppSelector((state) => state.product);

  const { watch } = useFormContext<ProductToCreate>();
  const productType = watch('type');
  console.log('productType', productType);

  return (
    <Grid container columnSpacing={3}>
      <Grid item md={3} sm={12}>
        <Stack alignItems="center" gap={3}>
          <Stack width="100%">
            <Typography variant="subtitle1">{translate('page.content.image')}</Typography>
            <Typography variant="body2" color="grey.600">
              {translate('page.content.contentImage', { model: translate('model.lowercase.product') })}
            </Typography>
          </Stack>
          <UploadImageField
            label={translate('page.content.dragDrop')}
            name="image"
            defaultValue=""
            isEditing={isEditing}
          />
        </Stack>
      </Grid>
      <Grid item md={9} sm={12}>
        <Stack gap={3}>
          <Stack width="100%">
            <Typography variant="subtitle1">{translate('page.content.detail')}</Typography>
            <Typography variant="body2" color="grey.600">
              {translate('table.name')}, {translate('table.lowercase.code')}, {translate('table.lowercase.type')},{' '}
              {translate('table.lowercase.description')},...
            </Typography>
          </Stack>

          <Stack spacing={3}>
            <Stack direction="row" alignItems="start" gap={2}>
              <InputField
                fullWidth
                name="name"
                label={translate(
                  'page.form.nameExchange',
                  currentLang.value === Language.ENGLISH
                    ? {
                        model: translate('model.capitalizeOne.product'),
                        name: translate('page.form.nameLower'),
                      }
                    : {
                        model: translate('page.form.name'),
                        name: translate('model.lowercase.product'),
                      }
                )}
                disabled={productType === ProductTypeEnum.CHILD}
                helperText={
                  productType === ProductTypeEnum.CHILD ? translate('page.validation.nameProductHelperText') : ''
                }
              />
              <InputField
                fullWidth
                name="code"
                label={translate(
                  'page.form.nameExchange',
                  currentLang.value === Language.ENGLISH
                    ? {
                        model: translate('model.capitalizeOne.product'),
                        name: translate('page.form.codeLower'),
                      }
                    : {
                        model: translate('page.form.code'),
                        name: translate('model.lowercase.product'),
                      }
                )}
              />
            </Stack>
            <InputField fullWidth name="description" label={translate('table.description')} multiline minRows={8} />
            <Stack direction="row" alignItems="start" gap={2}>
              <SelectField<ProductTypeEnum>
                fullWidth
                options={PRODUCT_TYPE_OPTIONS}
                name="type"
                label={translate(
                  'page.form.nameExchange',
                  currentLang.value === Language.ENGLISH
                    ? {
                        model: translate('model.capitalizeOne.product'),
                        name: translate('table.lowercase.type'),
                      }
                    : {
                        model: translate('table.type'),
                        name: translate('model.lowercase.product'),
                      }
                )}
              />
              <InputField type="number" fullWidth name="displayOrder" label={translate('table.displayOrder')} />
            </Stack>
            {(productType === ProductTypeEnum.CHILD ||
              productType === ProductTypeEnum.SINGLE ||
              productType === ProductTypeEnum.EXTRA) && (
              <Stack direction="row" alignItems="start" gap={2}>
                <InputField
                  fullWidth
                  type="number"
                  name="sellingPrice"
                  label={translate('table.sellingPrice') + '*'}
                  helperText={translate('page.validation.sellingPriceContent')}
                />
                <InputField
                  fullWidth
                  type="number"
                  name="discountPrice"
                  label={translate('table.discountPrice') + '*'}
                  helperText={translate('page.validation.discountPriceContent')}
                />
                <InputField
                  fullWidth
                  type="number"
                  name="historicalPrice"
                  label={translate('table.historicalPrice') + '*'}
                  helperText={translate('page.validation.historicalPriceContent')}
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
                    ? translate('page.form.containExtraProduct')
                    : translate('page.form.containProduct')
                }
              />
            )}
            {productType === ProductTypeEnum.CHILD && (
              <Stack direction="row" alignItems="start" gap={2}>
                <SelectField<ProductTypeEnum>
                  fullWidth
                  options={PRODUCT_TYPE_OPTIONS}
                  name="parentProductId"
                  label={translate('page.form.parentProduct')}
                />
                <SelectField<ProductSizeEnum>
                  fullWidth
                  options={PRODUCT_SIZE_OPTIONS}
                  name="size"
                  label={translate('page.form.productSize')}
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
