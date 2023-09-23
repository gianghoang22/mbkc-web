import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
// @mui
import { Box, Button, Card, Link as MuiLink, Stack, Typography } from '@mui/material';
//
import { UserVerification } from '@types';
import { Helmet, InputField, Logo } from 'components';
import { useAppDispatch } from 'redux/configStore';
import { PATH_AUTH } from 'routes/paths';
import { StyledRoot } from './styles';

const schema = yup.object({
  email: yup.string().required('Please enter Email').email('Email format is not correct'),
  otpCode: yup.string().required('Please enter OTP code'),
});

function VerificationOtpPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const verificationForm = useForm<UserVerification>({
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = verificationForm;

  const handleVerification = (values: UserVerification) => {
    const params = {
      user: { ...values },
      navigate,
    };
    console.log(params);
    // dispatch(login(params));
  };
  return (
    <>
      <Helmet title="Forgot password" />

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        <Card sx={{ p: 3.5, width: 500 }}>
          <FormProvider {...verificationForm}>
            <Stack direction="column" alignItems="center" justifyContent="center" gap={5}>
              <Stack direction="column" alignItems="center" textAlign="center" gap={2} px={5}>
                <Box px={10}>
                  <img src="/assets/illustrations/illustration_otp.svg" alt="email" />
                </Box>
                <Typography variant="body2">
                  Enter the OTP code received from email to confirm. <strong>Check your email!</strong>
                </Typography>
              </Stack>

              <Stack width="100%" alignItems="center" gap={2}>
                <InputField fullWidth size="large" name="email" label="Email address" />
                <InputField fullWidth size="large" name="otpCode" label="OTP Code" />
              </Stack>

              <Stack width="100%" alignItems="center" gap={4} px={3}>
                <Button fullWidth variant="contained" type="submit" onClick={handleSubmit(handleVerification)}>
                  Confirmation
                </Button>

                <Typography variant="body2">
                  Back {''}
                  <RouterLink to={PATH_AUTH.login} style={{ textDecoration: 'none' }}>
                    <MuiLink variant="subtitle2">Login</MuiLink>
                  </RouterLink>
                </Typography>
              </Stack>
            </Stack>
          </FormProvider>
        </Card>
      </StyledRoot>
    </>
  );
}

export default VerificationOtpPage;
