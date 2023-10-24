/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// @mui
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogActions, DialogContent, IconButton, Stack, Typography } from '@mui/material';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { getAllPartners } from 'redux/partner/partnerSlice';
import { getAllProducts } from 'redux/product/productSlice';
import { getAllStores } from 'redux/store/storeSlice';
import { createNewPartnerProduct, updatePartnerProduct } from 'redux/partnerProduct/partnerProductSlice';
//
import {
  ListParams,
  PARTNER_PRODUCT_STATUS_OPTIONS,
  Params,
  PartnerProduct,
  PartnerProductStatusEnum,
  PartnerProductToCreate,
  PartnerProductToUpdate,
} from '@types';
import { Color, Language } from 'common/enum';
import { AutoCompleteField, InputField, SelectField } from 'components';
import { useLocales, useValidationForm } from 'hooks';

interface CreatePartnerProductModalProps {
  isOpen: boolean;
  handleOpen: () => void;
  partnerProduct?: PartnerProduct;
}

function CreatePartnerProductModal({ isOpen, handleOpen, partnerProduct }: CreatePartnerProductModalProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { translate, currentLang } = useLocales();
  const { schemaPartnerProduct } = useValidationForm();

  const { stores } = useAppSelector((state) => state.store);
  const { partners } = useAppSelector((state) => state.partner);
  const { products } = useAppSelector((state) => state.product);
  const { isLoading, isEditing } = useAppSelector((state) => state.partnerProduct);

  const productOptions = products.map((product) => ({
    label: product.name,
    value: product.productId,
    category: product.categoryName,
    image: product.image,
  }));

  const getOpObjProduct = (option: any) => {
    if (!option) return option;
    if (!option.value) return productOptions.find((opt) => opt.value === option);
    return option;
  };
  const storeOptions = stores.map((store) => ({
    label: store.name,
    value: store.storeId,
    center: store.kitchenCenter.name,
    image: store.logo,
  }));

  const getOpObjStore = (option: any) => {
    if (!option) return option;
    if (!option.value) return storeOptions.find((opt) => opt.value === option);
    return option;
  };

  const partnerOptions = partners.map((partner) => ({
    label: partner.name,
    value: partner.partnerId,
    image: partner.logo,
  }));

  const getOpObjPartner = (option: any) => {
    if (!option) return option;
    if (!option.value) return partnerOptions.find((opt) => opt.value === option);
    return option;
  };

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        isGetAll: true,
      },
      navigate,
    };
  }, []);

  useEffect(() => {
    dispatch(getAllProducts(params));
    dispatch(getAllStores(params));
    dispatch(getAllPartners(params));
  }, [params]);

  const partnerProductForm = useForm<PartnerProductToCreate>({
    defaultValues: {
      productId: isEditing ? partnerProduct?.productId : 0,
      partnerId: isEditing ? partnerProduct?.partnerId : 0,
      storeId: isEditing ? partnerProduct?.storeId : 0,
      productCode: isEditing ? partnerProduct?.productCode : '',
      status: isEditing ? partnerProduct?.status : '',
    },
    resolver: yupResolver(schemaPartnerProduct),
  });

  const { handleSubmit, reset } = partnerProductForm;

  const onSubmit = async (values: PartnerProductToCreate) => {
    const data = { ...values };
    console.log(data);
    if (isEditing) {
      const paramsToUpdate: Params<PartnerProductToUpdate> = {
        data: {
          productCode: data.productCode,
          status: data.status,
        },
        idParams: {
          productId: data?.productId,
          partnerId: data?.partnerId,
          storeId: data?.storeId,
        },
        navigate,
      };
      dispatch(updatePartnerProduct(paramsToUpdate));
    } else {
      const paramsToCreate: Params<PartnerProductToCreate> = {
        data,
        navigate,
      };
      dispatch(createNewPartnerProduct(paramsToCreate));
    }
  };

  return (
    <>
      {isOpen && (
        <Dialog maxWidth="sm" fullWidth open={isOpen} onClose={handleOpen}>
          <FormProvider {...partnerProductForm}>
            <DialogContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h4">
                  {isEditing ? translate('button.updateProductLink') : translate('button.createProductLink')}
                </Typography>
                <IconButton onClick={handleOpen}>
                  <CloseIcon />
                </IconButton>
              </Stack>

              <Stack alignItems="center" pt={3.5} pb={1} gap={2}>
                <AutoCompleteField
                  options={productOptions}
                  getOptionLabel={(value: any) => {
                    return getOpObjProduct(value)?.label;
                  }}
                  isOptionEqualToValue={(option: any, value: any) => {
                    if (!option) return option;
                    return option.value === getOpObjProduct(value)?.value;
                  }}
                  transformValue={(opt: any) => opt.value}
                  name="productId"
                  type="text"
                  disabled={isEditing}
                  label={translate('model.capitalizeOne.product')}
                />
                <AutoCompleteField
                  options={storeOptions}
                  getOptionLabel={(value: any) => {
                    return getOpObjStore(value)?.label;
                  }}
                  isOptionEqualToValue={(option: any, value: any) => {
                    if (!option) return option;
                    return option.value === getOpObjStore(value)?.value;
                  }}
                  transformValue={(opt: any) => opt.value}
                  name="storeId"
                  type="text"
                  disabled={isEditing}
                  label={translate('model.capitalizeOne.store')}
                />
                <AutoCompleteField
                  options={partnerOptions}
                  getOptionLabel={(value: any) => {
                    return getOpObjPartner(value)?.label;
                  }}
                  isOptionEqualToValue={(option: any, value: any) => {
                    if (!option) return option;
                    return option.value === getOpObjPartner(value)?.value;
                  }}
                  transformValue={(opt: any) => opt.value}
                  name="partnerId"
                  type="text"
                  disabled={isEditing}
                  label={translate('model.capitalizeOne.partner')}
                />
                <InputField
                  fullWidth
                  type="text"
                  name="productCode"
                  label={translate(
                    'page.form.nameExchange',
                    currentLang.value === Language.ENGLISH
                      ? {
                          model: translate('model.capitalizeOne.product'),
                          name: translate('page.form.codeLower'),
                        }
                      : {
                          model: translate('page.form.code'),
                          name: translate('model.lowercase.product'),
                        }
                  )}
                />
                <SelectField<PartnerProductStatusEnum>
                  fullWidth
                  name="status"
                  options={PARTNER_PRODUCT_STATUS_OPTIONS}
                  label={translate('table.status') + ' ' + translate('model.lowercase.partnerProduct')}
                />
              </Stack>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3 }}>
              <Stack direction="row" gap={2}>
                {isEditing && (
                  <Button
                    variant="contained"
                    color="inherit"
                    disabled={isLoading}
                    onClick={() => {
                      reset({
                        productId: partnerProduct?.productId,
                        partnerId: partnerProduct?.partnerId,
                        storeId: partnerProduct?.storeId,
                        productCode: partnerProduct?.productCode,
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
            </DialogActions>
          </FormProvider>
        </Dialog>
      )}
    </>
  );
}

export default CreatePartnerProductModal;
