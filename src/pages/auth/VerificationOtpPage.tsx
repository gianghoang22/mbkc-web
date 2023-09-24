import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
// @mui
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Box, Button, Card, Link as MuiLink, Stack, Typography } from '@mui/material';
//
import { VerificationForm } from '@types';
import { Helmet, InputField, Logo } from 'components';
import { forgotPassword, verifyOtp } from 'redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { PATH_AUTH } from 'routes/paths';
import { StyledContent, StyledRoot } from './styles';

const schema = yup.object({
  email: yup.string().required('Please enter Email').email('Email format is not correct'),
  otpCode: yup.string().required('Please enter OTP code').min(6, 'OTP Code is required 6 digits'),
});

function VerificationOtpPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { email } = useAppSelector((state) => state.auth);

  const verificationForm = useForm<VerificationForm>({
    defaultValues: {
      email: email ? email : '',
    },
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = verificationForm;

  const handleVerify = (values: VerificationForm) => {
    const params = {
      data: { ...values },
      navigate,
    };
    dispatch(verifyOtp(params));
  };

  const handleResentCode = () => {
    const params = {
      data: { email },
      navigate,
    };
    dispatch(forgotPassword(params));
  };

  return (
    <>
      <Helmet title="Verification OTP" />

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        <StyledContent>
          <Card sx={{ p: 3.5, width: 520 }}>
            <FormProvider {...verificationForm}>
              <Stack direction="column" alignItems="center" justifyContent="center" gap={5}>
                <Stack direction="column" alignItems="center" textAlign="center" gap={1}>
                  <Box px={18}>
                    <img src="/assets/illustrations/illustration_otp.svg" alt="email" />
                  </Box>
                  <Typography variant="h3">Please check your email!</Typography>
                  <Typography variant="body2">
                    We have emailed a 6-digit confirmation code to {email}, please enter the code in below box to verify
                    your email.
                  </Typography>
                </Stack>

                <Stack width="100%" alignItems="center" gap={2}>
                  <InputField fullWidth size="large" name="email" label="Email" />
                  <InputField fullWidth size="large" name="otpCode" label="OTP Code" />
                </Stack>

                <Stack width="100%" alignItems="center" gap={4} px={3}>
                  <Stack alignItems="center" width="100%" gap={1.5}>
                    <Button fullWidth variant="contained" type="submit" onClick={handleSubmit(handleVerify)}>
                      Verify
                    </Button>

                    <Typography variant="body2">
                      Don’t have a code?{' '}
                      <Link to="" style={{ textDecoration: 'none' }} onClick={handleResentCode}>
                        <MuiLink variant="subtitle2" underline="hover" sx={{ cursor: 'pointer' }}>
                          Resend code
                        </MuiLink>
                      </Link>
                    </Typography>
                  </Stack>

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

export default VerificationOtpPage;
