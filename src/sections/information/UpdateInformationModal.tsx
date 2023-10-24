import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// @mui
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogActions, DialogContent, IconButton, Stack, Typography } from '@mui/material';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { updateBrandProfile } from 'redux/profile/profileSlice';
//
import { Params, UpdateBrandProfile } from '@types';
import { Color, Language } from 'common/enum';
import { InputField, UploadImageField } from 'components';
import { useLocales, useValidationForm } from 'hooks';

interface UpdateInformationModalProps {
  isOpen: boolean;
  handleOpen: (title: any) => void;
}

function UpdateInformationModal({ isOpen, handleOpen }: UpdateInformationModalProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { translate, currentLang } = useLocales();
  const { schemaUpdateProfile } = useValidationForm();

  const { brandProfile, isLoading, isEditing } = useAppSelector((state) => state.profile);

  const createPartnerForm = useForm<UpdateBrandProfile>({
    defaultValues: {
      name: brandProfile?.name,
      logo: brandProfile?.logo,
      address: brandProfile?.address,
    },
    resolver: yupResolver(schemaUpdateProfile),
  });

  const { handleSubmit, reset } = createPartnerForm;

  const onSubmit = async (values: UpdateBrandProfile) => {
    const data = { ...values };

    const paramUpdate: Params<UpdateBrandProfile> = {
      data: {
        name: data.name,
        logo: typeof values.logo === 'string' ? '' : data.logo,
        address: data.address,
      },
      idParams: {
        brandId: brandProfile?.brandId,
      },
      navigate,
    };
    dispatch(updateBrandProfile(paramUpdate));
  };

  return (
    <>
      {isOpen && (
        <Dialog maxWidth="sm" fullWidth open={isOpen} onClose={handleOpen}>
          <FormProvider {...createPartnerForm}>
            <DialogContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h4">
                  {translate('page.title.update', {
                    model: `${translate('model.lowercase.information')} ${translate('model.lowercase.brand')}`,
                  })}
                </Typography>
                <IconButton onClick={handleOpen}>
                  <CloseIcon />
                </IconButton>
              </Stack>

              <Stack alignItems="center" pt={3} pb={1}>
                <UploadImageField
                  label={translate('page.content.dragDrop')}
                  subLabel={translate('page.content.imageAllowed')}
                  margin="auto"
                  name="logo"
                  defaultValue=""
                  isEditing={isEditing}
                />

                <Stack width="100%" gap={2}>
                  <InputField
                    fullWidth
                    name="name"
                    label={translate(
                      'page.form.nameExchange',
                      currentLang.value === Language.ENGLISH
                        ? {
                            model: translate('model.capitalizeOne.brand'),
                            name: translate('page.form.nameLower'),
                          }
                        : {
                            model: translate('page.form.name'),
                            name: translate('model.lowercase.brand'),
                          }
                    )}
                  />

                  <InputField fullWidth name="address" label={translate('page.form.address')} />
                </Stack>
              </Stack>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3 }}>
              <Button
                disabled={isLoading}
                variant="contained"
                color="inherit"
                onClick={() => {
                  reset({
                    name: brandProfile?.name,
                    logo: brandProfile?.logo,
                    address: brandProfile?.address,
                  });
                }}
              >
                {translate('button.reset')}
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                color={Color.WARNING}
                onClick={handleSubmit(onSubmit)}
              >
                {translate('button.update')}
              </Button>
            </DialogActions>
          </FormProvider>
        </Dialog>
      )}
    </>
  );
}

export default UpdateInformationModal;
