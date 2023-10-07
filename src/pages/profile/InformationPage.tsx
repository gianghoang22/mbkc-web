import { useNavigate } from 'react-router-dom';

// mui
import { Box, Card, Paper, Stack, Grid } from '@mui/material';

import { brand } from '../../mock/brand';
import { kitchenCenter } from '../../mock/kitchenCenter';
import ItemInformation from './ItemInformation';
import { useAppSelector } from 'redux/configStore';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getBrandProfile, getKitchenCenterProfile } from 'redux/profile/profileSlice';
import { InformationPageDetail, InformationPageDetailSkeleton } from '.';
import { Role } from 'common/enum';

function InformationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profile, isLoading } = useAppSelector((state) => state.profile);
  const { userAuth } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (userAuth?.roleName === Role.BRAND_MANAGER) {
      dispatch<any>(getBrandProfile(navigate));
    }

    if (userAuth?.roleName === Role.KITCHEN_CENTER_MANAGER) {
      dispatch<any>(getKitchenCenterProfile(navigate));
    }
  }, [userAuth.roleName, dispatch, navigate]);

  return (
    <>
      <Card>
        <Box sx={{ width: '100%' }} paddingLeft={2} paddingRight={2}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <Stack borderRadius={2} width="100%" bgcolor="#000" flexDirection="row" justifyContent="center">
              <Box marginTop={-1} width={200} component="img" src="/assets/images/logos/logo_mbkc_no_background.png" />
            </Stack>

            {isLoading ? (
              <InformationPageDetailSkeleton />
            ) : (
              <InformationPageDetail
                logo={profile?.logo}
                address={profile?.address}
                managerEmail={profile?.kitchenCenterManagerEmail}
                name={profile?.name}
                status={profile?.status}
              />
            )}
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
    </>
  );
}

export default InformationPage;
