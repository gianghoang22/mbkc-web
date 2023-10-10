/* eslint-disable react-hooks/exhaustive-deps */
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Button, Card, Stack } from '@mui/material';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { createNewStorePartner } from 'redux/storePartner/storePartnerSlice';
//
import { Params, StorePartnerToCreate } from '@types';
import { Page } from 'components';
import { useLocales } from 'hooks';
import { PATH_BRAND_APP } from 'routes/paths';
import { StorePartnerForm } from 'sections/storePartner';

function AddPartnerToStorePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const { translate } = useLocales();

  const { pathnameToBack } = useAppSelector((state) => state.routes);
  const { isLoading } = useAppSelector((state) => state.storePartner);

  const defaultValues = {
    storeId: 0,
    partnerAccountRequests: [
      {
        partnerId: 0,
        userName: '',
        password: '',
      },
    ],
  };

  const createStoreForm = useForm<StorePartnerToCreate>({
    defaultValues,
    // resolver: yupResolver(
    //   yup.object({
    //     storeId: yup
    //       .number()
    //       .typeError(translate('page.validation.select', { name: translate('model.lowercase.store') }))
    //       .required(translate('page.validation.select', { name: translate('model.lowercase.store') })),
    //     partnerAccountRequests: yup.array().of(
    //       yup.object({
    //         partnerId: yup.number(),
    //         userName: yup.string(),
    //         password: yup.string(),
    //       })
    //     ),
    //   })
    // ),
  });

  const { handleSubmit, reset } = createStoreForm;

  const onSubmit = async (values: StorePartnerToCreate) => {
    const data = { ...values };
    console.log('data', data);
    const paramCreate: Params<StorePartnerToCreate> = {
      data: data,
      navigate,
    };
    dispatch(createNewStorePartner(paramCreate));
  };

  return (
    <>
      <Page
        title={translate('page.title.create', { model: translate('model.lowercase.storePartner') })}
        pathname={pathname}
        navigateDashboard={PATH_BRAND_APP.root}
      >
        <FormProvider {...createStoreForm}>
          <Card sx={{ p: 3 }}>
            <StorePartnerForm defaultValues={defaultValues} />
          </Card>
          <Stack direction="row" justifyContent="space-between" mt={12}>
            <Button variant="outlined" color="inherit" onClick={() => navigate(pathnameToBack)}>
              {translate('button.back')}
            </Button>
            <Stack direction="row" gap={1.5}>
              <Button variant="contained" color="inherit" disabled={isLoading} onClick={() => reset(defaultValues)}>
                {translate('button.reset')}
              </Button>
              <Button type="submit" variant="contained" disabled={isLoading} onClick={handleSubmit(onSubmit)}>
                {translate('button.create')}
              </Button>
            </Stack>
          </Stack>
        </FormProvider>
      </Page>
    </>
  );
}

export default AddPartnerToStorePage;
