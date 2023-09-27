// @mui
import { Grid, Stack, Typography } from '@mui/material';
//
import { CREATE_STORE_BRANDS_OPTIONS, CREATE_STORE_KITCHEN_CENTERS_OPTIONS } from '@types';
import { Language } from 'common/enum';
import { InputField, SelectField, UploadImageField } from 'components';
import { useLocales } from 'hooks';
import { useAppSelector } from 'redux/configStore';

function CategoryForm() {
  const { translate, currentLang } = useLocales();

  const { isEditing } = useAppSelector((state) => state.store);

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
                <SelectField
                  fullWidth
                  name="kitchenCenter"
                  options={CREATE_STORE_KITCHEN_CENTERS_OPTIONS}
                  label={translate('model.capitalizeOne.kitchenCenter')}
                />
              </Stack>
              <Stack direction="row" alignItems="start" gap={2} width="100%">
                <SelectField
                  fullWidth
                  name="brand"
                  options={CREATE_STORE_BRANDS_OPTIONS}
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
