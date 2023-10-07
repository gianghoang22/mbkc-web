/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Box, Card, Paper, Stack } from '@mui/material';
// redux
import { useAppSelector } from 'redux/configStore';
import { getBrandProfile, getKitchenCenterProfile } from 'redux/profile/profileSlice';
//
import { Role } from 'common/enum';
import { Page } from 'components';
import { useLocales } from 'hooks';
import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';
import { InformationDetail, InformationDetailSkeleton } from 'sections/information';

function InformationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { translate } = useLocales();

  const { userAuth } = useAppSelector((state) => state.auth);
  const { brandProfile, kitchenCenterProfile, isLoading } = useAppSelector((state) => state.profile);

  useEffect(() => {
    if (userAuth?.roleName === Role.BRAND_MANAGER) {
      dispatch<any>(getBrandProfile(navigate));
    } else {
      dispatch<any>(getKitchenCenterProfile(navigate));
    }
  }, [userAuth?.roleName]);

  return (
    <>
      <Page
        title={
          translate('breadcrumb.information') +
          ` ${
            userAuth?.roleName === Role.BRAND_MANAGER
              ? translate('model.lowercase.brand')
              : translate('model.lowercase.kitchenCenter')
          }`
        }
        pathname={pathname}
        navigateDashboard={PATH_KITCHEN_CENTER_APP.root}
      >
        {isLoading ? (
          <InformationDetailSkeleton />
        ) : (
          <Card>
            <Box width="100%" px={2} pt={2} pb={0.5}>
              <Paper sx={{ width: '100%', mb: 2 }}>
                <Stack width="100%" direction="row" justifyContent="center" bgcolor="#000" borderRadius={2} p={2}>
                  <Box width={200} component="img" src="/assets/images/logos/logo_mbkc_no_background.png" />
                </Stack>

                <Box mt={-10}>
                  {userAuth?.roleName === Role.BRAND_MANAGER ? (
                    <InformationDetail
                      logo={brandProfile?.logo}
                      name={brandProfile?.name}
                      status={brandProfile?.status}
                      address={brandProfile?.address}
                      managerEmail={brandProfile?.brandManagerEmail}
                    />
                  ) : (
                    <InformationDetail
                      logo={kitchenCenterProfile?.logo}
                      name={kitchenCenterProfile?.name}
                      status={kitchenCenterProfile?.status}
                      address={kitchenCenterProfile?.address}
                      managerEmail={kitchenCenterProfile?.kitchenCenterManagerEmail}
                    />
                  )}
                </Box>
              </Paper>
            </Box>
          </Card>
        )}
        {/* <Grid container columnSpacing={5} rowSpacing={5} mt={0.1}>
          <Grid item xs={12} sm={6} md={6}>
            <ItemInformation isKitchenCenter={false} brand={brand} />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <ItemInformation isKitchenCenter kitchenCenter={kitchenCenter} />
          </Grid>
        </Grid> */}
      </Page>
    </>
  );
}

export default InformationPage;
