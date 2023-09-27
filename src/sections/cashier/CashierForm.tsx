import { Grid, Stack, Typography } from '@mui/material';
import { GENDER_OPTIONS, Gender } from 'common/enum';
import { DatePickerField, InputField, SelectField, UploadImageField } from 'components';
import { useAppSelector } from 'redux/configStore';

function CashierForm() {
  const { isEditing } = useAppSelector((state) => state.category);

  return (
    <Grid container columnSpacing={3}>
      <Grid item md={4} sm={12}>
        <Stack alignItems="center" gap={3}>
          <Stack width="100%">
            <Typography variant="subtitle1">Image</Typography>
            <Typography variant="body2" color="grey.600">
              Select file for cashier's image
            </Typography>
          </Stack>
          <UploadImageField label="Drag and drop or select files" name="avatar" defaultValue="" isEditing={isEditing} />
        </Stack>
      </Grid>
      <Grid item md={8} sm={12}>
        <Stack gap={3}>
          <Stack width="100%">
            <Typography variant="subtitle1">Detail</Typography>
            <Typography variant="body2" color="grey.600">
              Email, full name, gender,...
            </Typography>
          </Stack>

          <Stack spacing={3}>
            <InputField fullWidth name="email" label="Email" />
            <InputField fullWidth name="fullName" label="Full name" />
            <Stack direction="row" alignItems="start" gap={2}>
              <SelectField<Gender> fullWidth options={GENDER_OPTIONS} name="gender" label="Gender" />
            </Stack>
            <DatePickerField name="dateOfBirth" label="Date of birth" />
            <InputField fullWidth name="citizenNumber" label="Citizen number" />
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default CashierForm;
