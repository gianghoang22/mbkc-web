import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Button, Card, Stack } from '@mui/material';
//
import { BankingAccountToCreate, BankingAccountToUpdate } from '@types';
import { Color } from 'common/enum';
import { Page } from 'components';
import { useLocales, useValidationForm } from 'hooks';
import { useAppSelector } from 'redux/configStore';
import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';
import { useDispatch } from 'react-redux';
import BankingAccountForm from 'sections/bankingAccount/BankingAccountForm';
import { createNewBankingAccount, updateBankingAccount } from 'redux/bankingAccount/bankingAccountSlice';

function CreateBankingAccountPage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { translate } = useLocales();
  const { schemaBankingAccount } = useValidationForm();

  const { pathnameToBack } = useAppSelector((state) => state.routes);
  const { isEditing, bankingAccount } = useAppSelector((state) => state.bankingAccount);

  const createBankingAccountForm = useForm<BankingAccountToCreate>({
    defaultValues: {
      BankName: isEditing ? bankingAccount?.name : '',
      NumberAccount: isEditing ? bankingAccount?.numberAccount : '',
      BankLogo: isEditing ? bankingAccount?.logoUrl : '',
    },
    resolver: yupResolver(schemaBankingAccount),
  });

  const { handleSubmit } = createBankingAccountForm;

  const onSubmit = async (values: BankingAccountToCreate) => {
    const data = { ...values };
    // Create a banking account
    const createBankingAccountParams = {
      newBankingAccountOptions: data,
      navigate,
    };

    // Update a brand
    const BankingAccountToUpdate: BankingAccountToUpdate = {
      BankName: values.BankName,
      Status: 'ACTIVE',
      BankLogo: values.BankLogo,
    };

    const updateBankingAccountParams = {
      updateBankingAccountOptions: BankingAccountToUpdate,
      bankingAccountId: bankingAccount?.bankingAccountId,
      navigate,
    };

    // Actions
    if (isEditing) {
      dispatch<any>(updateBankingAccount(updateBankingAccountParams));
    } else {
      dispatch<any>(createNewBankingAccount(createBankingAccountParams));
    }
  };

  return (
    <Page
      title={
        isEditing
          ? translate('page.title.update', { model: translate('model.lowercase.bankingAccount') })
          : translate('page.title.create', { model: translate('model.lowercase.bankingAccount') })
      }
      pathname={pathname}
      navigateDashboard={PATH_KITCHEN_CENTER_APP.root}
    >
      <FormProvider {...createBankingAccountForm}>
        <Card sx={{ p: 3 }}>
          <BankingAccountForm />
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
              type="submit"
              color={isEditing ? Color.WARNING : Color.PRIMARY}
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

export default CreateBankingAccountPage;
