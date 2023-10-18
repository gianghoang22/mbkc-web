import { Grid, Stack, Typography } from '@mui/material';
import { GENDER_OPTIONS, Gender } from 'common/enum';
import { DatePickerField, InputField, SelectField, UploadImageField } from 'components';
import { useLocales } from 'hooks';
import { useAppSelector } from 'redux/configStore';

function CashierForm() {
  const { isEditing } = useAppSelector((state) => state.category);
  const { translate } = useLocales();

  return (
    <Grid container columnSpacing={3}>
      <Grid item md={4} sm={12}>
        <Stack alignItems="center" gap={3}>
          <Stack width="100%">
            <Typography variant="subtitle1">{translate('table.image')}</Typography>
            <Typography variant="body2" color="grey.600">
              {translate('page.content.contentLogo', { model: translate('model.lowercase.cashier') })}
            </Typography>
          </Stack>
          <UploadImageField
            label={translate('page.content.dragDrop')}
            name="avatar"
            defaultValue=""
            isEditing={isEditing}
          />
        </Stack>
      </Grid>
      <Grid item md={8} sm={12}>
        <Stack gap={3}>
          <Stack width="100%">
            <Typography variant="subtitle1">Detail</Typography>
            <Typography variant="body2" color="grey.600">
              Email, {translate('table.fullName')}, {translate('table.gender')},...
            </Typography>
          </Stack>

          <Stack spacing={3}>
            <InputField fullWidth name="email" label="Email" />
            <InputField fullWidth name="fullName" label={translate('table.fullName')} />
            <Stack direction="row" alignItems="start" gap={2}>
              <SelectField<Gender> fullWidth options={GENDER_OPTIONS} name="gender" label={translate('table.gender')} />
            </Stack>
            <DatePickerField name="dateOfBirth" label="Date of birth" />
            <InputField fullWidth name="citizenNumber" label={translate('model.capitalizeOne.citizenNumber')} />
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default CashierForm;
