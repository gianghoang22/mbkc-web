import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Button, Card, Stack } from '@mui/material';
//
import { CategoryToCreate, CategoryType } from '@types';
import { Color } from 'common/enum';
import { Page } from 'components';
import { useLocales, useValidationForm } from 'hooks';
import { useAppSelector } from 'redux/configStore';
import { PATH_BRAND_APP } from 'routes/paths';
import { CategoryForm } from 'sections/category';

function CreateCategoryPage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { schemaCategory } = useValidationForm();

  const { pathnameToBack } = useAppSelector((state) => state.routes);
  const { isEditing, categoryType, category } = useAppSelector((state) => state.category);

  const createCategoryForm = useForm<CategoryToCreate>({
    defaultValues: {
      name: isEditing ? category?.name : '',
      code: isEditing ? category?.code : '',
      type: categoryType === CategoryType.NORMAL ? CategoryType.NORMAL : CategoryType.EXTRA,
      displayOrder: isEditing ? category?.displayOrder : 0,
      description: isEditing ? category?.description : '',
      imageUrl: isEditing ? category?.imageUrl : '',
    },
    resolver: yupResolver(schemaCategory),
  });

  const { handleSubmit, watch } = createCategoryForm;

  const image = watch('imageUrl');
  console.log('image', image);

  const onSubmit = async (values: CategoryToCreate) => {
    const data = { ...values, imageUrl: image };
    console.log('CategoryToAdd', data);
  };

  return (
    <Page
      title={
        isEditing
          ? translate('page.title.update', {
              model:
                categoryType === CategoryType.NORMAL
                  ? translate('model.lowercase.category')
                  : translate('model.lowercase.extraCategory'),
            })
          : translate('page.title.create', {
              model:
                categoryType === CategoryType.NORMAL
                  ? translate('model.lowercase.category')
                  : translate('model.lowercase.extraCategory'),
            })
      }
      pathname={pathname}
      navigateDashboard={PATH_BRAND_APP.root}
    >
      <FormProvider {...createCategoryForm}>
        <Card sx={{ p: 3 }}>
          <CategoryForm />
        </Card>
        <Stack direction="row" justifyContent="space-between" mt={12}>
          <Button variant="outlined" color="inherit" onClick={() => navigate(pathnameToBack)}>
            {translate('button.back')}
          </Button>
          <Stack direction="row" gap={2}>
            {isEditing && (
              <Button variant="contained" color="inherit">
                {translate('button.reset')}
              </Button>
            )}
            <Button
              variant="contained"
              color={isEditing ? Color.WARNING : Color.PRIMARY}
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              {isEditing ? translate('button.update') : translate('button.create')}
            </Button>
          </Stack>
        </Stack>
      </FormProvider>
    </Page>
  );
}

export default CreateCategoryPage;
