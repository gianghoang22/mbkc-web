/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// @mui
import { Box, Button, Card, Stack } from '@mui/material';
// redux
import { createNewBrand, getBrandDetail, updateBrand } from 'redux/brand/brandSlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
// section
import { BrandForm } from 'sections/brand';
//
import { AddressFormInterface, BrandToCreate, BrandToUpdate, Params } from '@types';
import { Color, Status } from 'common/enum';
import { LoadingScreen, Page } from 'components';
import { useLocales, useValidationForm } from 'hooks';
import { PATH_ADMIN_APP } from 'routes/paths';

function CreateBrandPage() {
  const { id: brandId } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { schemaBrand } = useValidationForm();

  const { pathnameToBack } = useAppSelector((state: any) => state.routes);
  const { provinces, districts, wards } = useAppSelector((state) => state.address);
  const { isEditing, isLoading, brand } = useAppSelector((state: any) => state.brand);

  const createBrandForm = useForm<AddressFormInterface>({
    defaultValues: {
      name: isEditing ? brand?.name : '',
      address: isEditing
        ? brand?.address
          ? brand?.address
              .split(', ')
              .slice(0, brand?.address.split(', ').length - 6)
              .join(', ')
          : brand?.address
        : '',
      logo: isEditing ? brand?.logo : '',
      managerEmail: isEditing ? brand?.brandManagerEmail : '',
      provinceId: isEditing ? brand?.address.split(', ').slice(-3)[2] : '',
      districtId: isEditing ? brand?.address.split(', ').slice(-3)[1] : '',
      wardId: isEditing ? brand?.address.split(', ').slice(-3)[0] : '',
    },
    resolver: yupResolver(schemaBrand),
  });

  const { handleSubmit, watch, reset } = createBrandForm;

  const name = watch('name');
  const address = watch('address');
  const logo = watch('logo');
  const managerEmail = watch('managerEmail');
  const provinceId = watch('provinceId');
  const districtId = watch('districtId');
  const wardId = watch('wardId');

  const province = provinces.find((opt) => opt.province_id.toString() === provinceId);
  const district = districts.find((opt) => opt.district_id.toString() === districtId);
  const ward = wards.find((opt) => opt.ward_id.toString() === wardId);

  useEffect(() => {
    if (isEditing === true) {
      reset({
        name: brand?.name,
        address: brand?.address
          ? brand?.address
              .split(', ')
              .slice(0, brand?.address.split(', ').length - 6)
              .join(', ')
          : brand?.address,
        logo: brand?.logo,
        managerEmail: brand?.brandManagerEmail,
        provinceId: brand?.address.split(', ').slice(-3)[2],
        districtId: brand?.address.split(', ').slice(-3)[1],
        wardId: brand?.address.split(', ').slice(-3)[0],
      });
    }
  }, [brand]);

  const params = useMemo(() => {
    return {
      brandId,
      navigate,
    };
  }, [brandId, navigate]);

  useEffect(() => {
    if (isEditing) {
      dispatch(getBrandDetail(params));
    }
  }, [params]);

  useEffect(() => {
    reset({
      name: name,
      address: address,
      logo: logo,
      managerEmail: managerEmail,
      provinceId: provinceId,
      districtId: '',
      wardId: '',
    });
  }, [provinceId]);

  useEffect(() => {
    reset({
      name: name,
      address: address,
      logo: logo,
      managerEmail: managerEmail,
      provinceId: provinceId,
      districtId: districtId,
      wardId: wardId !== undefined ? wardId : '',
    });
  }, [districtId]);

  const onSubmit = (values: AddressFormInterface) => {
    const data = { ...values };

    if (isEditing) {
      const paramUpdate: Params<BrandToUpdate> = {
        data: {
          name: data.name,
          address: `${data.address}, ${ward?.ward_name}, ${district?.district_name}, ${province?.province_name}, ${ward?.ward_id}, ${district?.district_id}, ${province?.province_id}`,
          status: Status.ACTIVE,
          logo: typeof values.logo === 'string' ? '' : data.logo,
          brandManagerEmail: data.managerEmail,
        },
        idParams: {
          brandId: brand?.brandId,
        },
        pathname: pathnameToBack,
        navigate,
      };
      dispatch<any>(updateBrand(paramUpdate));
    } else {
      const createBrand: Params<BrandToCreate> = {
        data: {
          Name: data.name,
          Address: `${data.address}, ${ward?.ward_name}, ${district?.district_name}, ${province?.province_name}, ${ward?.ward_id}, ${district?.district_id}, ${province?.province_id}`,
          Logo: data.logo,
          ManagerEmail: data.managerEmail,
        },
        navigate,
      };

      console.log(createBrand);
      dispatch<any>(createNewBrand(createBrand));
    }
  };

  return (
    <>
      {isLoading && (
        <Box sx={{ position: 'fixed', zIndex: 1300, top: 0, bottom: 0, left: 0, right: 0 }}>
          <LoadingScreen />
        </Box>
      )}

      <Page
        title={
          isEditing
            ? translate('page.title.update', { model: translate('model.lowercase.brand') })
            : translate('page.title.create', { model: translate('model.lowercase.brand') })
        }
        pathname={pathname}
        navigateDashboard={PATH_ADMIN_APP.root}
      >
        <FormProvider {...createBrandForm}>
          <Card sx={{ p: 3 }}>
            <BrandForm />
          </Card>
          <Stack direction="row" justifyContent="space-between" mt={12}>
            <Button variant="outlined" color="inherit" onClick={() => navigate(pathnameToBack)}>
              {translate('button.back')}
            </Button>
            <Stack direction="row" gap={2}>
              {isEditing && (
                <Button variant="contained" disabled={isLoading} color="inherit">
                  {translate('button.reset')}
                </Button>
              )}
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                color={isEditing ? Color.WARNING : Color.PRIMARY}
                onClick={handleSubmit(onSubmit)}
              >
                {isEditing ? translate('button.update') : translate('button.create')}
              </Button>
            </Stack>
          </Stack>
        </FormProvider>
      </Page>
    </>
  );
}

export default CreateBrandPage;
