import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// @mui
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogActions, DialogContent, IconButton, Stack, Typography } from '@mui/material';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
//
import { BankingAccountToCreate, BankingAccountToUpdate, Params } from '@types';
import { Color, Language, Status } from 'common/enum';
import { InputField, UploadImageField } from 'components';
import { useLocales, useValidationForm } from 'hooks';
import { createNewBankingAccount, updateBankingAccount } from 'redux/bankingAccount/bankingAccountSlice';

interface CreateBankingAccountModalProps {
  page: number;
  rowsPerPage: number;
  isOpen: boolean;
  handleOpen: (title: any) => void;
}

function CreateBankingAccountModal({ page, rowsPerPage, isOpen, handleOpen }: CreateBankingAccountModalProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { translate, currentLang } = useLocales();
  const { schemaBankingAccount } = useValidationForm();

  const { isEditing, isLoading, bankingAccount } = useAppSelector((state) => state.bankingAccount);

  const createBankingAccountForm = useForm<BankingAccountToCreate>({
    defaultValues: {
      BankName: isEditing && bankingAccount ? bankingAccount.name : '',
      BankLogo: isEditing && bankingAccount ? bankingAccount.logoUrl : '',
      NumberAccount: isEditing && bankingAccount ? bankingAccount.numberAccount : '',
    },
    resolver: yupResolver(schemaBankingAccount),
  });

  const { handleSubmit, reset } = createBankingAccountForm;

  const onSubmit = async (values: BankingAccountToCreate) => {
    const data = { ...values };

    if (isEditing) {
      const paramUpdate: Params<BankingAccountToUpdate> = {
        data: {
          BankName: data.BankName,
          BankLogo: data.BankLogo,
          Status: Status.ACTIVE,
        },
        optionParams: {
          currentPage: page + 1,
          itemsPerPage: rowsPerPage,
        },
        idParams: {
          bankingAccountId: bankingAccount?.bankingAccountId,
        },
        navigate,
      };
      console.log(data);
      dispatch(updateBankingAccount(paramUpdate));
    } else {
      const paramCreate: Params<BankingAccountToCreate> = {
        data: data,
        optionParams: {
          currentPage: page + 1,
          itemsPerPage: rowsPerPage,
        },
        navigate,
      };
      dispatch(createNewBankingAccount(paramCreate));
      handleOpen('create banking account');
    }
  };

  return (
    <>
      {isOpen && (
        <Dialog maxWidth="sm" fullWidth open={isOpen} onClose={handleOpen}>
          <FormProvider {...createBankingAccountForm}>
            <DialogContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h4">
                  {isEditing
                    ? translate('page.title.update', {
                        model: ` ${translate('model.lowercase.bankingAccount')}`,
                      })
                    : translate('page.title.create', {
                        model: ` ${translate('model.lowercase.bankingAccount')}`,
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
                  name="BankLogo"
                  defaultValue=""
                  isEditing={isEditing}
                />

                <Stack width="100%" gap={2}>
                  <InputField
                    fullWidth
                    name="BankName"
                    label={translate(
                      'page.form.nameExchange',
                      currentLang.value === Language.ENGLISH
                        ? {
                            model: translate('model.capitalizeOne.bankingAccount'),
                            name: translate('page.form.nameLower'),
                          }
                        : {
                            model: translate('page.form.name'),
                            name: translate('model.lowercase.bankingAccount'),
                          }
                    )}
                  />

                  <InputField fullWidth name="NumberAccount" label={translate('page.form.numberAccount')} />
                </Stack>
              </Stack>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3 }}>
              {isEditing && (
                <Button
                  disabled={isLoading}
                  variant="contained"
                  color="inherit"
                  onClick={() => {
                    reset({
                      BankName: bankingAccount?.name,
                      BankLogo: bankingAccount?.logoUrl,
                      NumberAccount: bankingAccount?.numberAccount,
                    });
                  }}
                >
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
            </DialogActions>
          </FormProvider>
        </Dialog>
      )}
    </>
  );
}

export default CreateBankingAccountModal;
