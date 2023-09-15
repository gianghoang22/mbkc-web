import { FormProvider, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
// @mui
import { Button, Card, Container, Grid, Stack, TextField, Typography } from '@mui/material';
//
import { Product } from '@types';
import { RoutesPageKey } from 'common/enum';
import { Breadcrumbs, Helmet } from 'components';
import UploadImageField from 'components/form/UploadImageField';

function EditStorePage() {
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
  const { handleSubmit, reset, watch } = methods;

  const image = watch('image');
  console.log('image edit', image);

  const onSubmit = async (values: Product) => {
    const data = { ...values };
    console.log(data);
  };

  return (
    <>
      <Helmet title="Update Store | MBKC" />

      <Container sx={{ minHeight: '100%' }}>
        <Stack mb={5}>
          <Typography variant="h4">Update Store</Typography>
          <Breadcrumbs model="Store" pathname={pathname} navigateDashboard={RoutesPageKey.BRAND_DASHBOARD} />
        </Stack>

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
                <UploadImageField label="Drag and drop or select files" name="image" />
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
      </Container>
    </>
  );
}

export default EditStorePage;
