import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
// @mui
import { Button, Card, Stack } from '@mui/material';
//
import { CategoryToAdd, CategoryType } from '@types';
import { Page } from 'components';
import { PATH_BRAND_APP } from 'routes/paths';
import { CategoryForm } from 'sections/category';
import { useAppSelector } from 'redux/configStore';
import { Color } from 'common/enum';

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

  const { isEditing, categoryType, category } = useAppSelector((state) => state.category);

  const createCategoryForm = useForm<CategoryToAdd>({
    defaultValues: {
      name: isEditing ? category?.name : '',
      code: isEditing ? category?.code : '',
      type: categoryType === CategoryType.NORMAL ? CategoryType.NORMAL : CategoryType.EXTRA,
      displayOrder: isEditing ? category?.displayOrder : 0,
      description: isEditing ? category?.description : '',
      imageUrl: isEditing ? category?.imageUrl : '',
    },
    resolver: yupResolver(schema),
  });

  const { handleSubmit, watch } = createCategoryForm;

  const image = watch('imageUrl');
  console.log('image', image);

  const onSubmit = async (values: CategoryToAdd) => {
    const data = { ...values, imageUrl: image };
    console.log('CategoryToAdd', data);
  };

  return (
    <Page
      title={
        isEditing
          ? `Update  ${categoryType === CategoryType.NORMAL ? 'Category' : 'Extra Category'}`
          : `Create  ${categoryType === CategoryType.NORMAL ? 'Category' : 'Extra Category'}`
      }
      pathname={pathname}
      navigateDashboard={PATH_BRAND_APP.root}
    >
      <FormProvider {...createCategoryForm}>
        <Card sx={{ p: 3 }}>
          <CategoryForm />
        </Card>
        <Stack direction="row" justifyContent="space-between" mt={12}>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() =>
              navigate(
                categoryType === CategoryType.NORMAL ? PATH_BRAND_APP.category.list : PATH_BRAND_APP.category.extraList
              )
            }
          >
            Back
          </Button>
          <Stack direction="row" gap={2}>
            {isEditing && (
              <Button variant="contained" color="inherit">
                Reset
              </Button>
            )}
            <Button
              variant="contained"
              color={isEditing ? Color.WARNING : Color.PRIMARY}
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              {isEditing ? 'Update' : 'Create'}
            </Button>
          </Stack>
        </Stack>
      </FormProvider>
    </Page>
  );
}

export default CreateNewCategoryPage;
