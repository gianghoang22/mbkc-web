import { useLocation, useNavigate } from 'react-router-dom';

// mui
import { Box, Card, Paper, Stack, Grid } from '@mui/material';

import { Page } from 'components';
import { brand } from '../../mock/brand';
import { kitchenCenter } from '../../mock/kitchenCenter';
import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';
import ItemInformation from './ItemInformation';
import ProfileDetail from './ProfileDetail';
import { useAppSelector } from 'redux/configStore';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getKitchenCenterProfile } from 'redux/profile/profileSlice';

function ProfilePage() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profile } = useAppSelector((state) => state.profile);

  useEffect(() => {
    dispatch<any>(getKitchenCenterProfile(navigate));
  }, []);

  return (
    <>
      <Page title="Profile" pathname={pathname} navigateDashboard={PATH_KITCHEN_CENTER_APP.root}>
        <Card>
          <Box sx={{ width: '100%' }} paddingLeft={2} paddingRight={2}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <Stack borderRadius={2} width="100%" bgcolor="#000" flexDirection="row" justifyContent="center">
                <Box
                  marginTop={-1}
                  width={200}
                  component="img"
                  src="/assets/images/logos/logo_mbkc_no_background.png"
                />
              </Stack>

              <ProfileDetail
                logo={profile?.logo}
                address={profile?.address}
                managerEmail={profile?.kitchenCenterManagerEmail}
                name={profile?.name}
                status={profile?.status}
              />
            </Paper>
          </Box>
        </Card>

        <Grid container columnSpacing={5} rowSpacing={5} mt={0.1}>
          <Grid item xs={12} sm={6} md={6}>
            <ItemInformation isKitchenCenter={false} brand={brand} />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <ItemInformation isKitchenCenter kitchenCenter={kitchenCenter} />
          </Grid>
        </Grid>
      </Page>
    </>
  );
}

export default ProfilePage;
