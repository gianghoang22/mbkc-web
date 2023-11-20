/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
// @mui icon
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import LanOutlinedIcon from '@mui/icons-material/LanOutlined';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import SummarizeIcon from '@mui/icons-material/Summarize';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { getDashboardBrand } from 'redux/dashboard/dashboardSlice';
import { getAllStores } from 'redux/store/storeSlice';
// section
import { AppCurrentIncomes, AppWidgetSummaryOutline, ListNewStores, ListProductStatistics } from 'sections/dashboard';
// interface
import { ListParams } from 'common/@types';
import { Color, Status } from 'common/enums';
import { Store } from 'common/models';
//
import { Helmet, LoadingScreen } from 'components';
import { useLocales } from 'hooks';

function BrandDashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const { translate } = useLocales();

  const { stores, isLoading: isLoadingStore } = useAppSelector((state) => state.store);
  const { brandDashboard, isLoading: isLoadingDashboard } = useAppSelector((state) => state.dashboard);

  const storeOptions = stores
    .filter((store) => store.status !== Status.BE_CONFIRMING && store.status !== Status.REJECTED)
    .map((store) => ({
      label: store.name,
      value: store.storeId,
    }));

  const [store, setStore] = useState<{ label: string; value: number } | null>(storeOptions[0]);

  const fetchAllStores = async () => {
    const params: ListParams = {
      optionParams: {
        isGetAll: true,
      },
      navigate,
    };
    await dispatch<any>(getAllStores(params));
    if (
      stores !== null &&
      stores !== undefined &&
      stores.filter((store) => store.status !== Status.BE_CONFIRMING && store.status !== Status.REJECTED).length > 0
    ) {
      const paramDashboard: ListParams = {
        optionParams: {
          idStore: store ? store?.value : storeOptions[0]?.value,
        },
        navigate,
      };
      dispatch<any>(getDashboardBrand(paramDashboard));
    }
  };

  useEffect(() => {
    setStore(storeOptions[0]);
  }, [storeOptions.length]);

  useEffect(() => {
    fetchAllStores();
  }, [store]);

  return (
    <>
      <Helmet title={translate('page.title.brandManagement')} />

      {isLoadingStore && (
        <Box sx={{ position: 'fixed', zIndex: 1300, top: 0, bottom: 0, left: 0, right: 0 }}>
          <LoadingScreen />
        </Box>
      )}

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          {translate('common.welcome')}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummaryOutline
              title={translate('page.dashboard.titleSummary', { model: translate('model.lowercase.stores') })}
              total={brandDashboard?.totalStores as number}
              isLoading={isLoadingDashboard}
              icon={<RestaurantMenuIcon fontSize="large" />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummaryOutline
              title={translate('page.dashboard.titleSummary', { model: translate('model.lowercase.normalCategories') })}
              total={brandDashboard?.totalNormalCategories as number}
              isLoading={isLoadingDashboard}
              color={Color.INFO}
              icon={<SummarizeIcon fontSize="large" />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummaryOutline
              title={translate('page.dashboard.titleSummary', { model: translate('model.lowercase.extraCategories') })}
              total={brandDashboard?.totalExtraCategories as number}
              isLoading={isLoadingDashboard}
              color={Color.WARNING}
              icon={<LanOutlinedIcon fontSize="large" />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummaryOutline
              title={translate('page.dashboard.titleSummary', { model: translate('model.lowercase.products') })}
              total={brandDashboard?.totalProducts as number}
              isLoading={isLoadingDashboard}
              color={Color.SUCCESS}
              icon={<DinnerDiningIcon fontSize="large" />}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} mt={3}>
          <Grid item xs={12} sm={12} md={12}>
            <AppCurrentIncomes
              store={store}
              setStore={setStore}
              title={translate('page.title.storeRevenue')}
              subheader={translate('page.content.storeRevenue')}
              chartLabels={[...(brandDashboard ? brandDashboard?.storeRevenues.revenues : [])].map((column) => {
                const date = column.date.split('+');
                return `${date[0]}.000Z`;
              })}
              chartData={[
                {
                  name: 'Amount',
                  type: 'area',
                  fill: 'gradient',
                  data: [...(brandDashboard ? brandDashboard?.storeRevenues.revenues : [])].map(
                    (column) => column.amount
                  ),
                },
              ]}
            />
          </Grid>
        </Grid>

        <Stack gap={5} mt={5}>
          <ListNewStores pathname={pathname} listStores={brandDashboard?.stores as Store[]} />
          <ListProductStatistics />
        </Stack>
      </Container>
    </>
  );
}

export default BrandDashboard;
