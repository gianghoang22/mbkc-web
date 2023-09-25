// @mui
import { Grid, Stack, Typography } from '@mui/material';
//
import { CREATE_STORE_BRANDS_OPTIONS, CREATE_STORE_KITCHEN_CENTERS_OPTIONS } from '@types';
import { InputField, SelectField, UploadImageField } from 'components';
import { useAppSelector } from 'redux/configStore';

function CategoryForm() {
  const { isEditing } = useAppSelector((state) => state.store);

  return (
    <Grid container columnSpacing={3}>
      <Grid item md={4} sm={12}>
        <Stack alignItems="center" gap={3}>
          <Stack width="100%">
            <Typography variant="subtitle1">Logo</Typography>
            <Typography variant="body2" color="grey.600">
              Select file for store's logo
            </Typography>
          </Stack>
          <UploadImageField
            label="Drag and drop or select files"
            name="logoUrl"
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
              Name, kitchen center, brand,...
            </Typography>
          </Stack>

          <Stack spacing={2}>
            <InputField fullWidth name="name" label="Store name" />
            <Stack direction="row" spacing={3}>
              <Stack direction="row" alignItems="start" gap={2} width="100%">
                <SelectField
                  fullWidth
                  options={CREATE_STORE_KITCHEN_CENTERS_OPTIONS}
                  name="kitchenCenter"
                  label="Kitchen centers"
                />
              </Stack>
              <Stack direction="row" alignItems="start" gap={2} width="100%">
                <SelectField fullWidth options={CREATE_STORE_BRANDS_OPTIONS} name="brand" label="Brands" />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default CategoryForm;
