/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Container, Grid, Typography } from '@mui/material';
// @mui icon
import ListAltIcon from '@mui/icons-material/ListAlt';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
// redux
import { getAllBankingAccounts } from 'redux/bankingAccount/bankingAccountSlice';
import { getAllCashiers } from 'redux/cashier/cashierSlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { getAllStores } from 'redux/store/storeSlice';
// interface
import { ListParams } from 'common/@types';
import { Color } from 'common/enums';
// section
import { AppCurrentIncomes, AppWidgetSummaryOutline } from 'sections/dashboard';
//
import { Helmet } from 'components';
import { useLocales } from 'hooks';

function KitchenCenterDashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { translate } = useLocales();

  const { numberItems: totalStoreItems, isLoading: isLoadingStore } = useAppSelector((state) => state.store);
  const { numberItems: totalCashierItems, isLoading: isLoadingCashier } = useAppSelector((state) => state.cashier);
  const { numberItems: totalBankingAccountItems, isLoading: isLoadingBankingAccount } = useAppSelector(
    (state) => state.bankingAccount
  );

  const params: ListParams = {
    optionParams: {
      itemsPerPage: 5,
      currentPage: 1,
    },
    navigate,
  };

  useEffect(() => {
    dispatch<any>(getAllStores(params));
    dispatch<any>(getAllCashiers(params));
    dispatch<any>(getAllBankingAccounts(params));
  }, []);

  return (
    <>
      <Helmet title={translate('page.title.kitchenCenterManagement')} />

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          {translate('common.welcome')}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummaryOutline
              title={translate('page.dashboard.titleSummary', { model: translate('model.lowercase.stores') })}
              total={totalStoreItems}
              isLoading={isLoadingStore}
              icon={<ListAltIcon fontSize="large" />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummaryOutline
              title={translate('page.dashboard.titleSummary', { model: translate('model.lowercase.stores') })}
              color={Color.SECONDARY}
              total={totalStoreItems}
              isLoading={isLoadingStore}
              icon={<RestaurantMenuIcon fontSize="large" />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummaryOutline
              title={translate('page.dashboard.titleSummary', { model: translate('model.lowercase.cashiers') })}
              color={Color.SUCCESS}
              total={totalCashierItems}
              isLoading={isLoadingCashier}
              icon={<AssignmentIndIcon fontSize="large" />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummaryOutline
              title={translate('page.dashboard.titleSummary', { model: translate('model.lowercase.bankingAccounts') })}
              color={Color.WARNING}
              total={totalBankingAccountItems}
              isLoading={isLoadingBankingAccount}
              icon={<AccountBalanceOutlinedIcon fontSize="large" />}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} mt={3}>
          <Grid item xs={12} sm={6} md={12}>
            <AppCurrentIncomes
              title="Thu nhập trong năm 2023 của cửa hàng"
              subheader="Chi tiết số liệu thu nhập trong từng tháng"
              chartData={[
                { label: 'Jan', value: 400 },
                { label: 'Feb', value: 430 },
                { label: 'Mar', value: 448 },
                { label: 'Apr', value: 470 },
                { label: 'May', value: 200 },
                { label: 'Jun', value: 580 },
                { label: 'July', value: 690 },
                { label: 'Aug', value: 1100 },
                { label: 'Sep', value: 1200 },
                { label: 'Oct', value: 1380 },
                { label: 'Nov', value: 1380 },
                { label: 'Dec', value: 2000 },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default KitchenCenterDashboard;
