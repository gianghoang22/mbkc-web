// @mui
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, Dialog, DialogContent, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
//
import { Cashier } from '@types';
import { Color, Status } from 'common/enum';
import { ConfirmDialog, ContentLabel, ContentSpace, Popover } from 'components';
import { useLocales, useModal, usePopover } from 'hooks';

import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteCashier, setEditCashier } from 'redux/cashier/cashierSlice';

interface CashierDetailModalProps {
  isOpen: boolean;
  handleOpen: (title: any) => void;
  cashier: Cashier;
  page: number;
  rowsPerPage: number;
}

function CashierDetailModal({ isOpen, handleOpen, cashier, page, rowsPerPage }: CashierDetailModalProps) {
  const { translate } = useLocales();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { open, handleCloseMenu } = usePopover();
  const { isOpen: isOpenModalDelete, handleOpen: HandleOpenModalDelete } = useModal();

  const handleEdit = () => {
    navigate(PATH_KITCHEN_CENTER_APP.cashier.root + `/update/${cashier.accountId}`);
    dispatch(setEditCashier(cashier));
  };

  const handleDelete = () => {
    const params = {
      cashierId: cashier?.accountId,
      navigate,
      page: page + 1,
      rowsPerPage: rowsPerPage,
    };

    dispatch<any>(deleteCashier(params));
  };

  return (
    <>
      {isOpen && (
        <Dialog maxWidth="md" fullWidth open={isOpen} onClose={handleOpen}>
          <DialogContent>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h4">Cashier Detail</Typography>

              <IconButton onClick={handleOpen}>
                <CloseIcon />
              </IconButton>
            </Stack>

            <Divider sx={{ mt: 1.5, mb: 3.5 }} />

            <Stack pb={2}>
              <Grid container columnSpacing={2}>
                <Grid item lg={5} md={4} sm={12} style={{ paddingLeft: 40 }}>
                  <Box>
                    <img src={cashier.avatar} alt="avatar" style={{ borderRadius: '50%', width: '80%' }} />
                  </Box>
                </Grid>
                <Grid item lg={7} md={8} sm={12}>
                  <Stack gap={2}>
                    <Stack direction="row" alignItems="center" justifyContent="flex-end">
                      <IconButton onClick={HandleOpenModalDelete}>
                        <DeleteOutlineIcon />
                      </IconButton>

                      <IconButton style={{ marginRight: 4 }} onClick={handleEdit}>
                        <EditOutlinedIcon />
                      </IconButton>
                    </Stack>

                    <Box>
                      <Typography variant="h4">{cashier.fullName}</Typography>
                    </Box>

                    <ContentSpace title="Email" content={cashier.email} />
                    <ContentSpace title="Phone" content={cashier.citizenNumber} />
                    <ContentSpace title="Date of birthday" content={cashier.dateOfBirth.toString()} />
                    <ContentSpace title="Citizen number" content={cashier.citizenNumber} />
                    <ContentSpace title="Gender" content={cashier.gender} />

                    <ContentLabel
                      title="Status"
                      color={
                        cashier?.status === Status.ACTIVE
                          ? Color.SUCCESS
                          : cashier?.status === Status.INACTIVE
                          ? Color.WARNING
                          : Color.ERROR
                      }
                      content={
                        cashier?.status === Status.INACTIVE
                          ? translate('status.inactive')
                          : cashier?.status === Status.ACTIVE
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
          onClose={HandleOpenModalDelete}
          onAction={handleDelete}
          title={translate('dialog.confirmDeleteTitle', { model: translate('model.lowercase.cashier') })}
          description={translate('dialog.confirmDeleteContent', { model: translate('model.lowercase.cashier') })}
        />
      )}
    </>
  );
}

export default CashierDetailModal;
