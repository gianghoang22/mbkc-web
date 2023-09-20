import { Grid, Stack, Typography } from '@mui/material';
import { CREATE_CATEGORY_TYPE_OPTIONS } from '@types';
import { InputField, SelectField, UploadImageField } from 'components';

function CategoryForm() {
  return (
    <Grid container columnSpacing={3}>
      <Grid item md={4} sm={12}>
        <Stack alignItems="center" gap={3}>
          <Stack width="100%">
            <Typography variant="subtitle1">Image</Typography>
            <Typography variant="body2" color="grey.600">
              Select file for product's image
            </Typography>
          </Stack>
          <UploadImageField label="Drag and drop or select files" name="imageUrl" defaultValue="" />
        </Stack>
      </Grid>
      <Grid item md={8} sm={12}>
        <Stack gap={3}>
          <Stack width="100%">
            <Typography variant="subtitle1">Detail</Typography>
            <Typography variant="body2" color="grey.600">
              Name, code, type,...
            </Typography>
          </Stack>

          <Stack spacing={2}>
            <InputField fullWidth name="name" label="Category name" />
            <InputField fullWidth name="code" label="Category code" />
            <Stack direction="row" alignItems="start" gap={2}>
              <SelectField fullWidth options={CREATE_CATEGORY_TYPE_OPTIONS} name="type" label="Category type" />
              <InputField type="number" fullWidth name="displayOrder" label="Display order" />
            </Stack>
            <InputField fullWidth name="description" label="Description" multiline minRows={8} />
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default CategoryForm;
