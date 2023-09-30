import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
// @mui
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogActions, DialogContent, Stack, Typography, IconButton } from '@mui/material';
//
import { PartnerToCreate } from '@types';
import { Color, Language } from 'common/enum';
import { InputField, UploadImageField } from 'components';
import { useLocales } from 'hooks';
import { useAppSelector } from 'redux/configStore';

interface CreatePartnerModalProps {
  isOpen: boolean;
  handleOpen: (title: any) => void;
}

function CreatePartnerModal({ isOpen, handleOpen }: CreatePartnerModalProps) {
  const { translate, currentLang } = useLocales();
  const { partner, isEditing } = useAppSelector((state) => state.partner);

  const createPartnerForm = useForm<PartnerToCreate>({
    defaultValues: {
      name: isEditing && partner ? partner?.name : '',
      logo: isEditing && partner ? partner?.logo : '',
    },
    resolver: yupResolver(
      yup.object({
        name: yup.string().required(
          translate('page.validation.required', {
            name: `${translate('page.form.nameLower')} ${translate('model.lowercase.partner')}`,
          })
        ),
      })
    ),
  });

  const { handleSubmit, reset } = createPartnerForm;

  const onSubmit = async (values: PartnerToCreate) => {
    const data = { ...values };

    console.log(data);
  };

  return (
    <>
      {isOpen && (
        <Dialog maxWidth="sm" fullWidth open={isOpen} onClose={handleOpen}>
          <FormProvider {...createPartnerForm}>
            <DialogContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h4">
                  {isEditing
                    ? translate('page.title.update', {
                        model: `${translate('model.lowercase.information')} ${translate('model.lowercase.partner')}`,
                      })
                    : translate('page.title.create', {
                        model: `${translate('model.lowercase.information')} ${translate('model.lowercase.partner')}`,
                      })}
                </Typography>
                <IconButton onClick={handleOpen}>
                  <CloseIcon />
                </IconButton>
              </Stack>

              <Stack alignItems="center" pt={3} pb={1}>
                <UploadImageField
                  label={translate('page.content.dragDrop')}
                  name="logo"
                  defaultValue=""
                  isEditing={isEditing}
                />

                <InputField
                  fullWidth
                  name="name"
                  label={translate(
                    'page.form.nameExchange',
                    currentLang.value === Language.ENGLISH
                      ? {
                          model: translate('model.capitalizeOne.partner'),
                          name: translate('page.form.nameLower'),
                        }
                      : {
                          model: translate('page.form.name'),
                          name: translate('model.lowercase.partner'),
                        }
                  )}
                />
              </Stack>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3 }}>
              {isEditing && (
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={() => {
                    reset({
                      name: partner?.name,
                      logo: partner?.logo,
                    });
                  }}
                >
                  {translate('button.reset')}
                </Button>
              )}
              <Button
                type="submit"
                variant="contained"
                color={isEditing ? Color.WARNING : Color.PRIMARY}
                onClick={handleSubmit(onSubmit)}
              >
                {isEditing ? translate('button.update') : translate('button.create')}
              </Button>
            </DialogActions>
          </FormProvider>
        </Dialog>
      )}
    </>
  );
}

export default CreatePartnerModal;
