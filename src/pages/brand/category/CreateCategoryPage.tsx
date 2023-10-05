import { useEffect, useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// @mui
import { Button, Card, Stack } from '@mui/material';
//
import { CategoryToCreate, CategoryToUpdate, CategoryType, Params } from '@types';
import { Color, Status } from 'common/enum';
import { Page } from 'components';
import { useLocales, useValidationForm } from 'hooks';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { PATH_BRAND_APP } from 'routes/paths';
import { CategoryForm } from 'sections/category';
import { createNewCategory, getCategoryDetail, updateCategory } from 'redux/category/categorySlice';

function CreateCategoryPage() {
  const { id: categoryId } = useParams();
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

  const { handleSubmit, reset } = createCategoryForm;

  const paramsDetail = useMemo(() => {
    return {
      categoryId,
      navigate,
    };
  }, [categoryId, navigate]);

  useEffect(() => {
    if (isEditing) {
      dispatch(getCategoryDetail(paramsDetail));
    }
  }, [dispatch, navigate, paramsDetail, isEditing]);

  const onSubmit = async (values: CategoryToCreate) => {
    const data = { ...values };
    console.log(data);

    if (isEditing) {
      if (typeof values.imageUrl === 'string') {
        const paramUpdate: Params<CategoryToUpdate> = {
          data: {
            name: data.name,
            code: data.code,
            displayOrder: data.displayOrder,
            imageUrl: '',
            description: data.description,
            status: category?.status === Status.ACTIVE ? Status.ACTIVE : Status.INACTIVE,
          },
          idParams: {
            categoryId: category?.categoryId,
          },
          optionParams: {
            type: category?.type,
          },
          pathname: pathnameToBack,
          navigate,
        };
        dispatch(updateCategory(paramUpdate));
      } else {
        const paramUpdate: Params<CategoryToUpdate> = {
          data: {
            name: data.name,
            code: data.code,
            displayOrder: data.displayOrder,
            imageUrl: data.imageUrl,
            description: data.description,
            status: category?.status === Status.ACTIVE ? Status.ACTIVE : Status.INACTIVE,
          },
          idParams: {
            categoryId: category?.categoryId,
          },
          optionParams: {
            type: category?.type,
          },
          pathname: pathnameToBack,
          navigate,
        };
        dispatch(updateCategory(paramUpdate));
      }
    } else {
      const paramCreate: Params<CategoryToCreate> = {
        data: { ...data, brandId: 1 },
        navigate,
      };
      dispatch(createNewCategory(paramCreate));
    }
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
              <Button
                variant="contained"
                color="inherit"
                disabled={isLoading}
                onClick={() => {
                  reset({
                    name: category?.name,
                    code: category?.code,
                    type: categoryType === CategoryType.NORMAL ? CategoryType.NORMAL : CategoryType.EXTRA,
                    displayOrder: category?.displayOrder,
                    description: category?.description,
                    imageUrl: category?.imageUrl,
                  });
                }}
              >
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
