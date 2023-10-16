/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// @mui
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CancelIcon from '@mui/icons-material/Cancel';
import { Box, Button, Grid, IconButton, Stack, Typography } from '@mui/material';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { getAllPartners } from 'redux/partner/partnerSlice';
import { getAllStores } from 'redux/store/storeSlice';
//
import { ListParams } from '@types';
import { Language } from 'common/enum';
import { AutoCompleteField, InputField } from 'components';
import { useLocales } from 'hooks';
import { CircularProgress } from '@mui/material';

function StorePartnerForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { translate, currentLang } = useLocales();

  const { stores, store, isLoading } = useAppSelector((state) => state.store);
  const { partners } = useAppSelector((state) => state.partner);

  const storeOptions = stores.map((store) => ({
    label: store.name,
    value: store.storeId,
  }));

  const getOpObjStore = (option: any) => {
    if (!option) return option;
    if (!option.value) return storeOptions.find((opt) => opt.value === option);
    return option;
  };

  const partnerOptions = partners.map((partner) => ({
    label: partner.name,
    value: partner.partnerId,
  }));

  const getOpObjPartner = (option: any) => {
    if (!option) return option;
    if (!option.value) return partnerOptions.find((opt) => opt.value === option);
    return option;
  };

  const { control, getValues, setValue, watch } = useFormContext();
  const { fields, remove } = useFieldArray({
    control,
    name: 'partnerAccountRequests',
  });

  const storeId = watch('storeId');

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        isGetAll: true,
      },
      navigate,
    };
  }, []);

  useEffect(() => {
    dispatch(getAllStores(params));
    dispatch(getAllPartners(params));
  }, [params]);

  return (
    <Grid container columnSpacing={3} rowSpacing={3}>
      <Grid item md={5} sm={12}>
        <Stack alignItems="center" gap={3}>
          <Stack width="100%">
            <Typography variant="subtitle1">
              {translate('page.title.detail', {
                model:
                  currentLang.value === Language.ENGLISH
                    ? translate('model.form.store')
                    : translate('model.lowercase.store'),
              })}
            </Typography>
            <Typography variant="body2" color="grey.600">
              {translate('page.content.selectStore')}
            </Typography>
          </Stack>
          <AutoCompleteField
            options={storeOptions}
            getOptionLabel={(value: any) => {
              return getOpObjStore(value)?.label;
            }}
            isOptionEqualToValue={(option: any, value: any) => {
              if (!option) return option;
              return option.value === getOpObjStore(value)?.value;
            }}
            transformValue={(opt: any) => opt.value}
            name="storeId"
            type="text"
            label={translate('model.capitalizeOne.store')}
          />

          <Stack
            p={1}
            width="100%"
            height="120px"
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{
              borderRadius: '6px',
              border: 2,
              borderStyle: 'dashed',
              borderColor: 'divider',
            }}
          >
            {storeId === 0 || storeId === undefined ? (
              <Typography>Selected store</Typography>
            ) : (
              <>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Stack direction="row" gap={1}>
                    <Box
                      component="img"
                      src={store?.logo}
                      alt={store?.name}
                      style={{ borderRadius: 6, width: 100, height: 100 }}
                    />

                    <Stack>
                      <Typography variant="subtitle1">
                        {translate('table.name')}:{' '}
                        <Typography component="span" variant="body1">
                          {store?.name}
                        </Typography>
                      </Typography>
                      <Typography variant="subtitle1">
                        {translate('table.kitchenCenter')}:{' '}
                        <Typography component="span" variant="body1">
                          {store?.kitchenCenter.name}
                        </Typography>
                      </Typography>
                      <Typography variant="subtitle1">
                        {translate('table.address')}:{' '}
                        <Typography component="span" variant="body1">
                          {store?.kitchenCenter.address}
                        </Typography>
                      </Typography>
                    </Stack>
                  </Stack>
                )}
              </>
            )}
          </Stack>
        </Stack>
      </Grid>
      <Grid item md={7} sm={12}>
        {fields.map((item, index) => (
          <Stack key={item.id} gap={3}>
            <Stack
              width="100%"
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mt: index > 0 ? 3 : 0 }}
            >
              <Stack>
                <Typography variant="subtitle1">
                  {translate('page.title.detail', {
                    model:
                      currentLang.value === Language.ENGLISH
                        ? translate('page.form.accountPartner')
                        : translate('page.form.accountPartner'),
                  })}{' '}
                  {index + 1}
                </Typography>
                <Typography variant="body2" color="grey.600">
                  {translate('model.capitalizeOne.partner')}, {translate('page.form.lowercase.userName')},{' '}
                  {translate('page.form.lowercase.password')},...
                </Typography>
              </Stack>

              {index > 0 && (
                <IconButton color="error" onClick={() => remove(index)}>
                  <CancelIcon />
                </IconButton>
              )}
            </Stack>

            <Stack spacing={2}>
              <AutoCompleteField
                options={partnerOptions}
                getOptionLabel={(value: any) => {
                  return getOpObjPartner(value)?.label;
                }}
                isOptionEqualToValue={(option: any, value: any) => {
                  if (!option) return option;
                  return option.value === getOpObjPartner(value)?.value;
                }}
                transformValue={(opt: any) => opt.value}
                name={`partnerAccountRequests.${index}.partnerId`}
                type="text"
                label={translate('model.capitalizeOne.partner')}
              />

              <InputField
                fullWidth
                name={`partnerAccountRequests.${index}.userName`}
                label={translate('page.form.userName')}
              />
              <InputField
                fullWidth
                name={`partnerAccountRequests.${index}.password`}
                label={translate('page.form.password')}
              />
            </Stack>
          </Stack>
        ))}
        <Box textAlign="right" mt={3}>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<AddRoundedIcon />}
            onClick={() => {
              setValue('partnerAccountRequests', [
                ...(getValues().partnerAccountRequests || []),
                {
                  partnerId: 0,
                  userName: '',
                  password: '',
                },
              ]);
            }}
          >
            {translate('button.add', { model: translate('model.lowercase.partner') })}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default StorePartnerForm;
