import { FormProvider, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
// @mui
import { Button, Card, Grid, Stack, TextField, Typography } from '@mui/material';
//
import { Product } from '@types';
import { Page, UploadImageField } from 'components';
import { PATH_BRAND_APP } from 'routes/paths';

function CreateNewStorePage() {
  const { pathname } = useLocation();

  const methods = useForm<Product>({
    // resolver: yupResolver(validationSchema),
    defaultValues: {
      description: '',
      sellingPrice: 0,
      discountPrice: 0,
      historicalPrice: 0,
    },
  });
  const { handleSubmit, watch } = methods;

  const image = watch('image');
  console.log('image edit', image);

  const onSubmit = async (values: Product) => {
    const data = { ...values };
    console.log(data);
  };

  return (
    <>
      <Page title="Create New Store" pathname={pathname} navigateDashboard={PATH_BRAND_APP.root}>
        <FormProvider {...methods}>
          <Grid container>
            <Grid item md={4} sm={12}>
              <Stack alignItems="center" gap={3}>
                <Stack width="100%">
                  <Typography variant="subtitle1">Image</Typography>
                  <Typography variant="body2" color="grey.600">
                    Select file for product's image
                  </Typography>
                </Stack>
                <UploadImageField
                  label="Drag and drop or select files"
                  name="image"
                  defaultValue=""
                  isEditing={false}
                />
              </Stack>
            </Grid>
            <Grid item md={8} sm={12}>
              <Stack gap={3}>
                <Stack width="100%">
                  <Typography variant="subtitle1">Detail</Typography>
                  <Typography variant="body2" color="grey.600">
                    Name, status,...
                  </Typography>
                </Stack>
                <Card sx={{ p: 3 }}>
                  <TextField name="email" label="Email address" fullWidth />
                </Card>
              </Stack>
            </Grid>
          </Grid>

          <Stack direction="row" justifyContent="space-between" mt={12}>
            <Button variant="outlined" color="inherit">
              Back
            </Button>
            <Stack direction="row" gap={1.5}>
              <Button variant="contained" color="inherit">
                Reset
              </Button>
              <Button variant="contained" type="submit" onClick={handleSubmit(onSubmit)}>
                Create
              </Button>
            </Stack>
          </Stack>
        </FormProvider>
      </Page>
    </>
  );
}

export default CreateNewStorePage;
