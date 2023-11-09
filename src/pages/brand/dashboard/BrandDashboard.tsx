/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Container, Grid, Typography } from '@mui/material';

// @mui icon
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
//
import { Color } from 'common/enums';
import { Helmet } from 'components';
import { useAppDispatch } from 'redux/configStore';
import { getBrandProfile } from 'redux/profile/profileSlice';
import { AppWidgetSummary } from 'sections/dashboard';
import { useLocales } from 'hooks';

function BrandDashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { translate } = useLocales();

  useEffect(() => {
    dispatch<any>(getBrandProfile(navigate));
  }, []);

  return (
    <>
      <Helmet title="Brand Management" />

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          {translate('common.welcome')}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Total Kitchen Staff" total={20} icon={<ManageAccountsIcon fontSize="large" />} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title="Total Kitchen"
              total={20}
              color={Color.SECONDARY}
              icon={<RestaurantMenuIcon fontSize="large" />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title="Total Product"
              total={20}
              color={Color.SUCCESS}
              icon={<DinnerDiningIcon fontSize="large" />}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default BrandDashboard;
