import { useNavigate } from 'react-router-dom';
// @mui
import { Box, Button, Container, Typography } from '@mui/material';
//
import { Role } from 'common/enum';
import { Helmet } from 'components';
import { useLocales } from 'hooks';
import { useAppSelector } from 'redux/configStore';
import { PATH_ADMIN_APP, PATH_AUTH, PATH_BRAND_APP, PATH_CASHIER_APP, PATH_KITCHEN_CENTER_APP } from 'routes/paths';
import { StyledContent } from './styles';

// ----------------------------------------------------------------------

function Page404() {
  const navigate = useNavigate();
  const { translate } = useLocales();

  const { userAuth, isAuthenticated } = useAppSelector((state) => state.auth);

  const handleNavigate = () => {
    if (isAuthenticated) {
      if (userAuth?.roleName === Role.MBKC_ADMIN) {
        navigate(PATH_ADMIN_APP.root);
      } else if (userAuth?.roleName === Role.BRAND_MANAGER) {
        navigate(PATH_BRAND_APP.root);
      } else if (userAuth?.roleName === Role.KITCHEN_CENTER_MANAGER) {
        navigate(PATH_KITCHEN_CENTER_APP.root);
      } else if (userAuth?.roleName === Role.CASHIER) {
        navigate(PATH_CASHIER_APP.root);
      } else {
        navigate(PATH_AUTH.login);
      }
    }
  };

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

          <Button size="large" color="inherit" variant="contained" onClick={handleNavigate}>
            {translate('button.goHome')}
          </Button>
        </StyledContent>
      </Container>
    </>
  );
}

export default Page404;
