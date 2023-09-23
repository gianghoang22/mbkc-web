import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, IconButton, InputAdornment, Link as MuiLink, Stack } from '@mui/material';

// @mui icon
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
//
import { UserLogin } from '@types';
import { InputField } from 'components';
import { login } from 'redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { PATH_AUTH } from 'routes/paths';
import { hashPasswordMD5 } from 'utils';

const schema = yup.object({
  email: yup.string().required('Please enter Email').email('Email format is not correct'),
  password: yup.string().required('Please enter Password'),
});

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isLoading } = useAppSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const loginForm = useForm<UserLogin>({
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = loginForm;

  const handleLogin = (values: UserLogin) => {
    const hashPassword = hashPasswordMD5(values.password);
    const params = {
      user: { ...values, password: hashPassword },
      navigate,
    };
    dispatch(login(params));
  };

  return (
    <>
      <FormProvider {...loginForm}>
        <Stack spacing={3}>
          <InputField fullWidth size="large" name="email" label="Email address" />

          <InputField
            fullWidth
            size="large"
            name="password"
            label="Password"
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

        <Stack direction="row" alignItems="center" justifyContent="end" sx={{ mt: 2, mb: 7 }}>
          <Box onClick={() => navigate(PATH_AUTH.forgotPassword)} sx={{ cursor: 'pointer' }}>
            <MuiLink variant="subtitle2" underline="hover">
              Forgot password?
            </MuiLink>
          </Box>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isLoading}
          onClick={handleSubmit(handleLogin)}
        >
          Login
        </LoadingButton>
      </FormProvider>
    </>
  );
}

export default LoginForm;
