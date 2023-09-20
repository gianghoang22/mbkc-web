import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
// @mui
import { Button, Card, Stack } from '@mui/material';
//
import { CategoryToAdd } from '@types';
import { Page } from 'components';
import { PATH_BRAND_APP } from 'routes/paths';
import { CategoryForm } from 'sections/category';

const schema = yup.object({
  name: yup.string().required('Please enter Category Name'),
  code: yup.string().required('Please enter Category Code'),
  type: yup.string().required('Please select Category Type'),
  displayOrder: yup.number().required('Please enter the category display order'),
  description: yup.string().required('Please enter Category Name'),
  imageUrl: yup.string().required('Please select Category Photo'),
});

function CreateNewCategoryPage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const createCategoryForm = useForm<CategoryToAdd>({
    defaultValues: {
      name: '',
      code: '',
      type: '',
      displayOrder: 0,
      description: '',
      imageUrl: '',
    },
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = createCategoryForm;

  const onSubmit = async (values: CategoryToAdd) => {
    const data = { ...values };
    console.log('CategoryToAdd', data);
  };

  return (
    <Page title="Create New Category" pathname={pathname} navigateDashboard={PATH_BRAND_APP.root}>
      <FormProvider {...createCategoryForm}>
        <Card sx={{ p: 3 }}>
          <CategoryForm />
        </Card>
        <Stack direction="row" justifyContent="space-between" mt={12}>
          <Button variant="outlined" color="inherit" onClick={() => navigate(PATH_BRAND_APP.category.list)}>
            Back
          </Button>
          <Stack direction="row" gap={2}>
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
  );
}

export default CreateNewCategoryPage;
