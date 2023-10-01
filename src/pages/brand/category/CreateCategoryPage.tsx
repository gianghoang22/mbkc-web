import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Button, Card, Stack } from '@mui/material';
//
import { CategoryToCreate, CategoryType, Params } from '@types';
import { Color } from 'common/enum';
import { Page } from 'components';
import { useLocales, useValidationForm } from 'hooks';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { PATH_BRAND_APP } from 'routes/paths';
import { CategoryForm } from 'sections/category';
import { createNewCategory } from 'redux/category/categorySlice';

function CreateCategoryPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { schemaCategory } = useValidationForm();

  const { pathnameToBack } = useAppSelector((state) => state.routes);
  const { isEditing, isLoading, categoryType, category } = useAppSelector((state) => state.category);

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

  const { handleSubmit } = createCategoryForm;

  const onSubmit = async (values: CategoryToCreate) => {
    const data = { ...values, brandId: 16 };
    console.log(data);
    const paramCreate: Params<CategoryToCreate> = {
      data: data,
      navigate,
    };
    dispatch(createNewCategory(paramCreate));
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
              disabled={isLoading}
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
