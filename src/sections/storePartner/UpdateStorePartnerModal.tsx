/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// @mui
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  InputAdornment,
  Grid,
  Stack,
  Avatar,
  Typography,
} from '@mui/material';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { updateStorePartner } from 'redux/storePartner/storePartnerSlice';
//
import { Params, StorePartnerToUpdate, StorePartnerToUpdateApi } from '@types';
import { Color, Status } from 'common/enum';
import { InputField } from 'components';
import { useLocales, useValidationForm } from 'hooks';

interface UpdateStorePartnerModalProps {
  isOpen: boolean;
  handleOpen: () => void;
  partnerId: number;
  storeId: number;
}

function UpdateStorePartnerModal({ isOpen, handleOpen, partnerId, storeId }: UpdateStorePartnerModalProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { translate } = useLocales();
  const { schemaUpdateStorePartner } = useValidationForm();

  const { storePartner, isLoading } = useAppSelector((state) => state.storePartner);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const updateStorePartnerForm = useForm<StorePartnerToUpdate>({
    defaultValues: {
      userName: storePartner?.userName,
      password: storePartner?.password,
    },
    resolver: yupResolver(schemaUpdateStorePartner),
  });

  const { handleSubmit } = updateStorePartnerForm;

  const onSubmit = async (values: StorePartnerToUpdate) => {
    const data = { ...values };
    const params: Params<StorePartnerToUpdateApi> = {
      data: { ...data, status: storePartner?.status === Status.ACTIVE ? Status.ACTIVE : Status.INACTIVE },
      idParams: {
        partnerId,
        storeId,
      },
      navigate,
    };
    dispatch(updateStorePartner(params));
  };

  return (
    <>
      {isOpen && (
        <Dialog maxWidth="sm" fullWidth open={isOpen} onClose={handleOpen}>
          <FormProvider {...updateStorePartnerForm}>
            <DialogContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h4">
                  {translate('page.title.update', {
                    model: `${translate('model.lowercase.information')} ${translate('model.lowercase.partner')}`,
                  })}
                </Typography>
                <IconButton onClick={handleOpen}>
                  <CloseIcon />
                </IconButton>
              </Stack>

              <Stack alignItems="center" pt={3} pb={1}>
                <Grid container columnSpacing={2}>
                  <Grid item md={3}>
                    <Stack alignItems="center" gap={1}>
                      <Avatar
                        src={storePartner?.partnerLogo}
                        alt={storePartner?.partnerName}
                        sx={{ height: 100, width: 100 }}
                      />
                      <Typography>{storePartner?.partnerName}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item md={9}>
                    <Stack width="100%" gap={2}>
                      <InputField
                        fullWidth
                        size="large"
                        name="userName"
                        label={translate('page.form.userName')}
                        type="text"
                      />
                      <InputField
                        fullWidth
                        size="large"
                        name="password"
                        label={translate('page.form.password')}
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </Stack>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3 }}>
              <Button variant="contained" disabled={isLoading} color="inherit" onClick={handleOpen}>
                {translate('button.cancel')}
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

export default UpdateStorePartnerModal;
