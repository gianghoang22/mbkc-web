import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// @mui
import { Box, Button, Card, Stack } from '@mui/material';
// redux
import {
  createNewBankingAccount,
  getBankingAccountDetails,
  updateBankingAccount,
} from 'redux/bankingAccount/bankingAccountSlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
// section
import { BankingAccountForm } from 'sections/bankingAccount';
//
import { BankingAccountToCreate, BankingAccountToUpdate } from '@types';
import { Color, Status } from 'common/enum';
import { LoadingScreen, Page } from 'components';
import { useLocales, useValidationForm } from 'hooks';
import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';

function CreateBankingAccountPage() {
  const { id: bankingAccountId } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { schemaBankingAccount } = useValidationForm();

  const { pathnameToBack } = useAppSelector((state) => state.routes);
  const { isEditing, bankingAccount, isLoading } = useAppSelector((state) => state.bankingAccount);

  const createBankingAccountForm = useForm<BankingAccountToCreate>({
    defaultValues: {
      BankName: '',
      NumberAccount: '',
      BankLogo: '',
    },
    resolver: yupResolver(schemaBankingAccount),
  });

  const { handleSubmit, setValue } = createBankingAccountForm;

  const onSubmit = async (values: BankingAccountToCreate) => {
    const data = { ...values };
    // Create a banking account
    const createBankingAccountParams = {
      newBankingAccountOptions: data,
      navigate,
    };

    const BankingAccountToUpdate: BankingAccountToUpdate = {
      BankName: values.BankName,
      Status: Status.ACTIVE,
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

  const paramsDetail = useMemo(() => {
    return {
      bankingAccountId,
      navigate,
    };
  }, [bankingAccountId, navigate]);

  useEffect(() => {
    if (isEditing) {
      dispatch<any>(getBankingAccountDetails(paramsDetail));
    }
  }, [dispatch, navigate, paramsDetail, isEditing]);

  useEffect(() => {
    if (bankingAccount !== null && isEditing === true) {
      setValue('BankName', bankingAccount?.name as string);
      setValue('NumberAccount', bankingAccount?.numberAccount as string);
      setValue('BankLogo', bankingAccount?.logoUrl as string);
    }
  }, [bankingAccount, isEditing, setValue]);

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
    </>
  );
}

export default CreateBankingAccountPage;
