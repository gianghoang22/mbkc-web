import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';
import { Helmet } from 'components';
import { useLocales } from 'hooks';

// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

function Page500() {
  const { translate } = useLocales();

  return (
    <>
      <Helmet title="500 Page Not Found" />

      <Container>
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            {translate('error.serverTitle')}
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>{translate('error.serverContent')}</Typography>

          <Box
            component="img"
            src="/assets/illustrations/illustration_500.svg"
            sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
          />

          <Button to="/" size="large" color="inherit" variant="contained" component={RouterLink}>
            {translate('button.goHome')}
          </Button>
        </StyledContent>
      </Container>
    </>
  );
}

export default Page500;
