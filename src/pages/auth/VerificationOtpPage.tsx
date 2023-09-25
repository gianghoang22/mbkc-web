import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
// @mui
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Box, Button, Card, LinearProgress, Link as MuiLink, Stack, Typography } from '@mui/material';
//
import { VerificationForm } from '@types';
import { Helmet, InputField, Logo } from 'components';
import { forgotPassword, verifyOtp } from 'redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { PATH_AUTH } from 'routes/paths';
import { StyledContent, StyledRoot } from './styles';
import { useLocales } from 'hooks';

function VerificationOtpPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { translate } = useLocales();

  const { isLoading, email } = useAppSelector((state) => state.auth);

  const verificationForm = useForm<VerificationForm>({
    defaultValues: {
      email: email ? email : '',
    },
    resolver: yupResolver(
      yup.object({
        email: yup
          .string()
          .required(translate('validation.required', { name: 'Email' }))
          .email(translate('validation.emailFormat')),
        otpCode: yup
          .string()
          .required(translate('validation.required', { name: translate('form.otpCode') }))
          .min(6, translate('validation.otpAlLeast'))
          .max(6, translate('validation.otpMax'))
          .matches(/^[0-9]+$/, translate('validation.otpMatches')),
      })
    ),
  });

  const { handleSubmit } = verificationForm;

  const handleVerify = (values: VerificationForm) => {
    const params = {
      data: { ...values },
      navigate,
    };
    console.log(params);
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

      {isLoading && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}

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
                  <Typography variant="h3">{translate('auth.verify.title')}</Typography>
                  <Typography variant="body2">{translate('auth.verify.content', { email })}</Typography>
                </Stack>

                <Stack width="100%" alignItems="center" gap={2}>
                  <InputField
                    fullWidth
                    size="large"
                    name="email"
                    disabled={email ? true : false}
                    label={translate('form.email')}
                  />
                  <InputField fullWidth size="large" name="otpCode" label={translate('form.otpCode')} />
                </Stack>

                <Stack width="100%" alignItems="center" gap={4} px={3}>
                  <Stack alignItems="center" width="100%" gap={1.5}>
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      disabled={isLoading}
                      onClick={handleSubmit(handleVerify)}
                    >
                      {translate('button.verify')}
                    </Button>

                    <Typography variant="body2">
                      {translate('auth.verify.noAccount')}{' '}
                      <Link to="" style={{ textDecoration: 'none' }} onClick={handleResentCode}>
                        <MuiLink variant="subtitle2" underline="hover" sx={{ cursor: 'pointer' }}>
                          {translate('auth.verify.resend')}
                        </MuiLink>
                      </Link>
                    </Typography>
                  </Stack>

                  <Box onClick={() => navigate(PATH_AUTH.login)} sx={{ cursor: 'pointer' }}>
                    <Stack direction="row" alignItems="center">
                      <KeyboardArrowLeftIcon fontSize="small" />
                      <MuiLink variant="subtitle2" underline="hover">
                        {translate('auth.backLogin')}
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
