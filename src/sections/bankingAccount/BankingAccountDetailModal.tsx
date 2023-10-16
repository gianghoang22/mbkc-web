// @mui
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, Dialog, DialogContent, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
//
import { BankingAccount } from '@types';
import { Color, Language, Status } from 'common/enum';
import { ConfirmDialog, ContentLabel, ContentSpace, Popover } from 'components';
import { useLocales, useModal, usePopover } from 'hooks';
import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteBankingAccount, setEditBankingAccount } from 'redux/bankingAccount/bankingAccountSlice';

interface BankingAccountDetailModalProps {
  isOpen: boolean;
  handleOpen: (title: any) => void;
  bankingAccount: BankingAccount;
  page: number;
  rowsPerPage: number;
}

function BankingAccountDetailModal({
  isOpen,
  handleOpen,
  bankingAccount,
  page,
  rowsPerPage,
}: BankingAccountDetailModalProps) {
  const { translate, currentLang } = useLocales();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { open, handleCloseMenu } = usePopover();
  const { isOpen: isOpenModalDelete, handleOpen: handleOpenModalDelete } = useModal();

  const handleEdit = () => {
    navigate(PATH_KITCHEN_CENTER_APP.bankingAccount.root + `/update/${bankingAccount?.bankingAccountId}`);
    dispatch(setEditBankingAccount(bankingAccount));
  };

  const deleteParams = { bankingAccountId: bankingAccount?.bankingAccountId, navigate, page, rowsPerPage };

  const handleDelete = () => {
    dispatch<any>(deleteBankingAccount(deleteParams));
  };

  // const params = useMemo(() => {
  //   return { bankingAccountId: bankingAccountId, navigate };
  // }, [bankingAccountId, navigate]);

  // useEffect(() => {
  //   dispatch<any>(getBankingAccountDetails(params));
  // }, []);

  return (
    <>
      {isOpen && (
        <Dialog maxWidth="md" fullWidth open={isOpen} onClose={handleOpen}>
          <DialogContent>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h4">
                {translate('page.title.detail', {
                  model:
                    currentLang.value === Language.ENGLISH
                      ? translate('model.capitalizeOne.bankingAccount')
                      : translate('model.lowercase.bankingAccount'),
                })}
              </Typography>

              <IconButton onClick={handleOpen}>
                <CloseIcon />
              </IconButton>
            </Stack>

            <Divider sx={{ mt: 1.5, mb: 3.5 }} />

            <Stack pb={2}>
              <Grid container columnSpacing={2}>
                <Grid item lg={5} md={4} sm={12} style={{ paddingLeft: 40 }}>
                  <Box>
                    <img src={bankingAccount?.logoUrl} alt="avatar" style={{ borderRadius: '50%', width: '80%' }} />
                  </Box>
                </Grid>
                <Grid item lg={7} md={8} sm={12}>
                  <Stack gap={2}>
                    <Stack direction="row" alignItems="center" justifyContent="flex-end">
                      <IconButton onClick={handleOpenModalDelete}>
                        <DeleteOutlineIcon />
                      </IconButton>

                      <IconButton style={{ marginRight: 4 }} onClick={handleEdit}>
                        <EditOutlinedIcon />
                      </IconButton>
                    </Stack>

                    <Box>
                      <Typography variant="h4">{bankingAccount?.name}</Typography>
                    </Box>

                    <ContentSpace
                      title={translate('model.capitalize.numberAccount')}
                      content={String(bankingAccount?.numberAccount)}
                    />

                    <ContentLabel
                      title={translate('table.status')}
                      color={
                        bankingAccount?.status === Status.ACTIVE
                          ? Color.SUCCESS
                          : bankingAccount?.status === Status.INACTIVE
                          ? Color.WARNING
                          : Color.ERROR
                      }
                      content={
                        bankingAccount?.status === Status.INACTIVE
                          ? translate('status.inactive')
                          : bankingAccount?.status === Status.ACTIVE
                          ? translate('status.active')
                          : translate('status.deactive')
                      }
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </DialogContent>
        </Dialog>
      )}

      <Popover open={open} handleCloseMenu={handleCloseMenu} />

      {isOpenModalDelete && (
        <ConfirmDialog
          open={isOpenModalDelete}
          onClose={handleOpenModalDelete}
          onAction={handleDelete}
          title={translate('dialog.confirmDeleteTitle', { model: translate('model.lowercase.cashier') })}
          description={translate('dialog.confirmDeleteContent', { model: translate('model.lowercase.cashier') })}
        />
      )}
    </>
  );
}

export default BankingAccountDetailModal;
