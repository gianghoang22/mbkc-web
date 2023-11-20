/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Container, Grid, Stack, Typography } from '@mui/material';
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
//
import { Helmet } from 'components';
import { useLocales } from 'hooks';
import { fDate } from 'utils';

function BrandDashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const { translate } = useLocales();

  const { stores } = useAppSelector((state) => state.store);
  const { brandDashboard, isLoading: isLoadingDashboard } = useAppSelector((state) => state.dashboard);

  const storeOptions = stores
    .filter((store) => store.status !== Status.BE_CONFIRMING && store.status !== Status.REJECTED)
    .map((store) => ({
      label: store.name,
      value: store.storeId,
    }));

  const [store, setStore] = useState<{ label: string; value: number } | null>(storeOptions[0]);
  const [productDateFrom, setProductDateFrom] = useState<Date | null>(null);
  const [productDateTo, setProductDateTo] = useState<Date | null>(null);

  console.log(store);

  const paramDashboard: ListParams = useMemo(() => {
    return {
      optionParams: {
        idStore: store ? store?.value : storeOptions[0]?.value,
        searchDateFrom: productDateFrom === null ? '' : fDate(productDateFrom as Date),
        searchDateTo: productDateTo === null ? '' : fDate(productDateTo as Date),
      },
      navigate,
    };
  }, [store, productDateFrom, productDateTo]);

  const fetchAllStores = async () => {
    const params: ListParams = {
      optionParams: {
        isGetAll: true,
      },
      navigate,
    };
    await dispatch<any>(getAllStores(params));
  };

  useEffect(() => {
    fetchAllStores();
    if (
      stores !== null &&
      stores.filter((store) => store.status !== Status.BE_CONFIRMING && store.status !== Status.REJECTED).length > 0
    ) {
      dispatch<any>(getDashboardBrand(paramDashboard));
    }
  }, [stores.length]);

  return (
    <>
      <Helmet title={translate('page.title.brandManagement')} />

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
          <Grid item xs={12} sm={6} md={12}>
            <AppCurrentIncomes
              store={store}
              setStore={setStore}
              title={translate('page.title.storeRevenue')}
              subheader={translate('page.content.storeRevenue')}
              // chartData={[
              //   { label: 'Jan', value: 400 },
              //   { label: 'Feb', value: 430 },
              //   { label: 'Mar', value: 448 },
              //   { label: 'Apr', value: 470 },
              //   { label: 'May', value: 200 },
              //   { label: 'Jun', value: 580 },
              //   { label: 'July', value: 690 },
              //   { label: 'Aug', value: 1100 },
              //   { label: 'Sep', value: 1200 },
              //   { label: 'Oct', value: 1380 },
              //   { label: 'Nov', value: 1380 },
              //   { label: 'Dec', value: 2000 },
              // ]}
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
          <ListNewStores pathname={pathname} listStores={brandDashboard ? brandDashboard?.stores : []} />
          <ListProductStatistics
            productDateFrom={productDateFrom}
            setProductDateFrom={setProductDateFrom}
            productDateTo={productDateTo}
            setProductDateTo={setProductDateTo}
          />
        </Stack>
      </Container>
    </>
  );
}

export default BrandDashboard;
