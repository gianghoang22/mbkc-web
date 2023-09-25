import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Button, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
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

function Page404() {
  const { translate } = useLocales();

  return (
    <>
      <Helmet title="404 Page Not Found" />

      <Container>
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            {translate('error.notFoundTitle')}
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>{translate('error.notFoundContent')}</Typography>

          <Box
            component="img"
            src="/assets/illustrations/illustration_404.svg"
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

export default Page404;
