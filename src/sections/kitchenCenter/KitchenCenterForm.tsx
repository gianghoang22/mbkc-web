import { Grid, Stack, Typography } from '@mui/material';
import { Language } from 'common/enum';
import { InputField, UploadImageField } from 'components';
import { useLocales } from 'hooks';
import { useAppSelector } from 'redux/configStore';

function KitchenCenterForm() {
  const { isEditing } = useAppSelector((state) => state.kitchenCenter);
  const { translate, currentLang } = useLocales();

  return (
    <Grid container columnSpacing={3}>
      <Grid item md={4} sm={12}>
        <Stack alignItems="start" gap={3}>
          <Stack width="100%">
            <Typography variant="subtitle1">Logo</Typography>
            <Typography variant="body2" color="grey.600">
              {translate('page.content.contentLogo', { model: translate('model.lowercase.kitchenCenter') })}
            </Typography>
          </Stack>
          <UploadImageField
            label={translate('page.content.dragDrop')}
            name="Logo"
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
              {translate('table.name')}, {translate('table.lowercase.address')},...
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
                      model: translate('model.capitalizeOne.kitchenCenter'),
                      name: translate('page.form.nameLower'),
                    }
                  : {
                      model: translate('page.form.name'),
                      name: translate('model.lowercase.kitchenCenter'),
                    }
              )}
            />
            <InputField fullWidth name="Address" label={translate('page.form.address')} />
            <InputField fullWidth name="ManagerEmail" label={translate('page.form.managerEmail')} />
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default KitchenCenterForm;
