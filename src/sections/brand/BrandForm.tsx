// @mui
import { Grid, Stack, Typography } from '@mui/material';
import { Language } from 'common/enum';
//
import { InputField, UploadImageField } from 'components';
import { useLocales } from 'hooks';
import { useAppSelector } from 'redux/configStore';

function BrandForm() {
  const { translate, currentLang } = useLocales();

  const { isEditing } = useAppSelector((state) => state.brand);

  return (
    <Grid container columnSpacing={3}>
      <Grid item md={4} sm={12}>
        <Stack alignItems="start" gap={3}>
          <Stack width="100%">
            <Typography variant="subtitle1">{translate('page.content.logo')}</Typography>
            <Typography variant="body2" color="grey.600">
              {translate('page.content.contentLogo', { model: translate('model.lowercase.brand') })}
            </Typography>
          </Stack>
          <UploadImageField
            label={translate('page.content.dragDrop')}
            subLabel={translate('page.content.imageAllowed')}
            name="Logo"
            captionWidth={200}
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
              {translate('table.name')}, {translate('table.lowercase.address')},{translate('table.lowercase.email')},...
            </Typography>
          </Stack>

          <Stack spacing={2}>
            <InputField
              fullWidth
              name="Name"
              label={translate(
                'page.form.nameExchange',
                currentLang.value === Language.ENGLISH
                  ? {
                      model: translate('model.capitalizeOne.brand'),
                      name: translate('page.form.nameLower'),
                    }
                  : {
                      model: translate('page.form.name'),
                      name: translate('model.lowercase.brand'),
                    }
              )}
            />
            <InputField fullWidth name="ManagerEmail" label={translate('page.form.managerEmail')} />
            <InputField fullWidth name="Address" label={translate('page.form.address')} />
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default BrandForm;
