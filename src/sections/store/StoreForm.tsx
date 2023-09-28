/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Grid, Stack, Typography } from '@mui/material';
//
import { ListParams } from '@types';
import { Language } from 'common/enum';
import { AutoCompleteField, InputField, UploadImageField } from 'components';
import { useLocales } from 'hooks';
import { getAllBrands } from 'redux/brand/brandSlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { getAllKitchenCenters } from 'redux/kitchenCenter/kitchenCenterSlice';

function CategoryForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { translate, currentLang } = useLocales();

  const { brands } = useAppSelector((state) => state.brand);
  const { isEditing } = useAppSelector((state) => state.store);
  const { kitchenCenters } = useAppSelector((state) => state.kitchenCenter);

  console.log(brands);

  const kitchenCenterOptions = kitchenCenters.map((kitchenCenter) => ({
    label: kitchenCenter.name,
    value: kitchenCenter.kitchenCenterId,
  }));

  const brandOptions = brands.map((brand) => ({
    label: brand.name,
    value: brand.brandId,
  }));

  const getOpObjBrand = (option: any) => {
    if (!option) return option;
    if (!option.value) return brandOptions.find((opt) => opt.value === option);
    return option;
  };
  const getOpObjKitchenCenter = (option: any) => {
    if (!option) return option;
    if (!option.value) return brandOptions.find((opt) => opt.value === option);
    return option;
  };

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        isGetAll: true,
      },
      navigate,
    };
  }, []);

  useEffect(() => {
    dispatch(getAllKitchenCenters(params));
    dispatch(getAllBrands(params));
  }, [params]);

  return (
    <Grid container columnSpacing={3}>
      <Grid item md={4} sm={12}>
        <Stack alignItems="center" gap={3}>
          <Stack width="100%">
            <Typography variant="subtitle1">{translate('page.content.logo')}</Typography>
            <Typography variant="body2" color="grey.600">
              {translate('page.content.contentLogo', { model: translate('model.lowercase.store') })}
            </Typography>
          </Stack>
          <UploadImageField
            label={translate('page.content.dragDrop')}
            name="logoUrl"
            defaultValue=""
            isEditing={isEditing}
          />
        </Stack>
      </Grid>
      <Grid item md={8} sm={12}>
        <Stack gap={3}>
          <Stack width="100%">
            <Typography variant="subtitle1">{translate('page.content.detail')}</Typography>
            <Typography variant="body2" color="grey.600">
              {translate('table.name')}, {translate('model.lowercase.kitchenCenter')},{' '}
              {translate('model.lowercase.brand')},...
            </Typography>
          </Stack>

          <Stack spacing={2}>
            {/* store name */}
            <InputField
              fullWidth
              name="name"
              label={translate(
                'page.form.nameExchange',
                currentLang.value === Language.ENGLISH
                  ? {
                      model: translate('model.capitalizeOne.store'),
                      name: translate('page.form.name'),
                    }
                  : {
                      model: translate('page.form.name'),
                      name: translate('model.lowercase.store'),
                    }
              )}
            />
            <Stack direction="row" spacing={3}>
              <Stack direction="row" alignItems="start" gap={2} width="100%">
                <AutoCompleteField
                  options={kitchenCenterOptions}
                  getOptionLabel={(value: any) => {
                    return getOpObjKitchenCenter(value)?.label;
                  }}
                  isOptionEqualToValue={(option: any, value: any) => {
                    if (!option) return option;
                    return option.value === getOpObjKitchenCenter(value)?.value;
                  }}
                  transformValue={(opt: any) => opt.value}
                  name="kitchenCenter"
                  type="text"
                  label={translate('model.capitalizeOne.kitchenCenter')}
                />
              </Stack>
              <Stack direction="row" alignItems="start" gap={2} width="100%">
                <AutoCompleteField
                  options={brandOptions}
                  getOptionLabel={(value: any) => {
                    return getOpObjBrand(value)?.label;
                  }}
                  isOptionEqualToValue={(option: any, value: any) => {
                    if (!option) return option;
                    return option.value === getOpObjBrand(value)?.value;
                  }}
                  transformValue={(opt: any) => opt.value}
                  name="brand"
                  type="text"
                  label={translate('model.capitalizeOne.brand')}
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default CategoryForm;
