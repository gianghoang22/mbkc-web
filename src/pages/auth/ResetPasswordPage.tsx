import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { ref } from 'yup';
// @mui
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Box, Button, Card, Link as MuiLink, Stack, Typography } from '@mui/material';
//
import { ResetForm } from '@types';
import { Helmet, InputField, Logo } from 'components';
import { useAppDispatch } from 'redux/configStore';
import { PATH_AUTH } from 'routes/paths';
import { StyledContent, StyledRoot } from './styles';
import { resetPassword } from 'redux/auth/authSlice';

const schema = yup.object({
  email: yup.string().required('Please enter Email').email('Email format is not correct'),
  newPassword: yup.string().required('Please enter new password'),
  confirmPassword: yup
    .string()
    .required('Please enter confirm password')
    .oneOf([ref('newPassword')], 'Passwords does not match'),
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const resetPasswordForm = useForm<ResetForm>({
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = resetPasswordForm;

  const handleResetPassword = (values: ResetForm) => {
    const params = {
      data: { email: values.email, newPassword: values.newPassword },
      navigate,
    };
    console.log(params);
    dispatch(resetPassword(params));
  };

  return (
    <>
      <Helmet title="Reset Password" />

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        <StyledContent>
          <Card sx={{ p: 3.5, width: 500 }}>
            <FormProvider {...resetPasswordForm}>
              <Stack direction="column" alignItems="center" justifyContent="center" gap={5}>
                <Stack direction="column" alignItems="center" textAlign="center" gap={1} px={5}>
                  <Box px={14}>
                    <img src="/assets/illustrations/illustration_otp.svg" alt="email" />
                  </Box>
                  <Typography variant="h3">Update password</Typography>
                  <Typography variant="body2">Enter your new password to reset.</Typography>
                </Stack>

                <Stack width="100%" alignItems="center" gap={2}>
                  <InputField fullWidth size="large" name="email" label="Email" />
                  <InputField fullWidth size="large" name="newPassword" label="New password" />
                  <InputField fullWidth size="large" name="confirmPassword" label="Confirm password" />
                </Stack>

                <Stack width="100%" alignItems="center" gap={4} px={3}>
                  <Button fullWidth variant="contained" type="submit" onClick={handleSubmit(handleResetPassword)}>
                    Update password
                  </Button>

                  <Box onClick={() => navigate(PATH_AUTH.login)} sx={{ cursor: 'pointer' }}>
                    <Stack direction="row" alignItems="center">
                      <KeyboardArrowLeftIcon fontSize="small" />
                      <MuiLink variant="subtitle2" underline="hover">
                        Return to login
                      </MuiLink>
                    </Stack>
                  </Box>
                </Stack>
              </Stack>
            </FormProvider>
          </Card>
        </StyledContent>
      </StyledRoot>
    </>
  );
}

export default ResetPasswordPage;
