import { Grid, Stack, Typography } from '@mui/material';
import { InputField, UploadImageField } from 'components';

function KitchenCenterForm() {
  return (
    <Grid container columnSpacing={3}>
      <Grid item md={4} sm={12}>
        <Stack alignItems="start" gap={3}>
          <Stack width="100%">
            <Typography variant="subtitle1">Logo</Typography>
            <Typography variant="body2" color="grey.600">
              Select file for kitchen center's logo
            </Typography>
          </Stack>
          <UploadImageField label="Drag and drop or select files" name="logoUrl" defaultValue="" isEditing />
        </Stack>
      </Grid>
      <Grid item md={8} sm={12}>
        <Stack gap={3}>
          <Stack width="100%">
            <Typography variant="subtitle1">Detail</Typography>
            <Typography variant="body2" color="grey.600">
              Name, address,...
            </Typography>
          </Stack>

          <Stack spacing={2}>
            <InputField fullWidth name="name" label="Name" />
            <InputField fullWidth name="numberOfKitchens" label="Number of kitchens" />
            <Stack direction="row" spacing={2}>
              <InputField fullWidth name="cityProvince" label="City/Province" />
              <InputField fullWidth name="district" label="District" />
            </Stack>
            <InputField fullWidth name="address" label="Address" />
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default KitchenCenterForm;
