import { Box, Container, Typography } from '@mui/material';
// hooks
import useResponsive from 'hooks/useResponsive';
// // components
import { Helmet, Logo } from 'components';
// sections
import { LoginForm } from 'sections/auth';
//style
import { StyledContent, StyledRootLogin, StyledSection } from './styles';

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md', 'md');

  return (
    <>
      <Helmet title="Login" />

      <StyledRootLogin>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <Box sx={{ px: 5 }}>
              <img src="/assets/images/kitchen/kitchen_login.png" alt="login" />
            </Box>
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in to MBKC
            </Typography>

            <Typography variant="body2" sx={{ mb: 7 }}>
              MBKC will help you manager effectively!
            </Typography>

            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRootLogin>
    </>
  );
}
