/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// @mui icon
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import AddchartIcon from '@mui/icons-material/Addchart';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
// @mui
import {
  Box,
  Card,
  Grid,
  Link as MUILink,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from '@mui/material';
// section
import { MoneyExchangeTableRow, MoneyExchangeTableRowSkeleton } from 'sections/moneyExchanges';
import { ShipperPaymentTableRow, ShipperPaymentTableRowSkeleton } from 'sections/shipperPayment';
import { TotalDaily, WalletCardSkeleton } from 'sections/wallet';
//redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { getAllMoneyExchange, getAllShipperPayment, getWalletInformation } from 'redux/wallet/walletSlice';
// interface
import { ListParams, MoneyExchangeTable, OrderSortBy, ShipperPaymentTable } from 'common/@types';
import { Color, Role } from 'common/enums';
//
import { CommonTableHead, EmptyTable, Page } from 'components';
import { useConfigHeadTable, useLocales } from 'hooks';
import { PATH_CASHIER_APP, PATH_KITCHEN_CENTER_APP } from 'routes/paths';
import { fDate } from 'utils';

function WalletPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { shipperPaymentHeadCells, MoneyExchangeHeadCells } = useConfigHeadTable();

  const { userAuth } = useAppSelector((state) => state.auth);
  const { moneyExchanges, shipperPayments, isLoading, walletInformation } = useAppSelector((state) => state.wallet);

  const paramMoneyExchange: ListParams = useMemo(() => {
    return {
      optionParams: {
        itemsPerPage: 5,
        currentPage: 1,
        searchDateFrom: fDate(new Date()),
        searchDateTo: fDate(new Date()),
      },
      navigate,
    };
  }, [navigate]);

  const paramShipperPayments: ListParams = useMemo(() => {
    return {
      optionParams: {
        itemsPerPage: 5,
        currentPage: 1,
        searchDateFrom: fDate(new Date()),
        searchDateTo: fDate(new Date()),
        sortBy: `${OrderSortBy.CREATE_DATE}_desc`,
      },
      navigate,
    };
  }, [navigate]);

  useEffect(() => {
    if (userAuth?.roleName === Role.CASHIER) {
      dispatch<any>(getAllShipperPayment(paramShipperPayments));
    }
    dispatch<any>(getAllMoneyExchange(paramMoneyExchange));
    dispatch<any>(getWalletInformation(navigate));
  }, [paramMoneyExchange, paramShipperPayments]);

  return (
    <Page
      containerWidth="xl"
      pathname={pathname}
      title={
        userAuth?.roleName === Role.KITCHEN_CENTER_MANAGER
          ? translate('page.title.wallet', { model: translate('model.lowercase.kitchenCenter') })
          : translate('page.title.wallet', { model: translate('model.lowercase.cashier') })
      }
      navigateDashboard={
        userAuth?.roleName === Role.KITCHEN_CENTER_MANAGER ? PATH_KITCHEN_CENTER_APP.root : PATH_CASHIER_APP.root
      }
    >
      {isLoading ? (
        <WalletCardSkeleton />
      ) : (
        <>
          <Typography variant="h6" mb={3}>
            {translate('page.content.date')}:{' '}
            <Typography component="span" fontSize="1.125rem">
              {fDate(new Date())}
            </Typography>
          </Typography>
          <Grid container rowSpacing={3} columnSpacing={3} mb={5}>
            <Grid item xs={12} sm={12} md={4}>
              <TotalDaily
                color={Color.PRIMARY}
                icon={<AccountBalanceWalletOutlinedIcon fontSize="large" />}
                title={translate('page.content.mainBalance')}
                totalMoney={walletInformation?.balance as number}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TotalDaily
                color={Color.SUCCESS}
                icon={<CurrencyExchangeOutlinedIcon fontSize="large" />}
                title={translate('page.title.totalDaily', { model: translate('model.lowercase.transactions') })}
                totalMoney={walletInformation?.totalDailyMoneyExchange as number}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TotalDaily
                color={Color.INFO}
                icon={<AddchartIcon fontSize="large" />}
                title={translate('page.title.totalDaily', { model: translate('model.lowercase.shipperPayments') })}
                totalMoney={walletInformation?.totalDailyShipperPayment as number}
              />
            </Grid>
          </Grid>
        </>
      )}

      <Stack gap={5}>
        {userAuth?.roleName === Role.CASHIER && (
          <Card>
            <Box sx={{ width: '100%' }} p={2}>
              <Paper sx={{ width: '100%' }}>
                <Typography variant="subtitle1" color="#2B3674" letterSpacing={0.6} lineHeight={1.75} mb={1}>
                  {translate('page.title.payOrderToday')}
                </Typography>
                <TableContainer>
                  <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                    <CommonTableHead<ShipperPaymentTable>
                      headCells={shipperPaymentHeadCells}
                      onRequestSort={() => {}}
                    />
                    {isLoading ? (
                      <ShipperPaymentTableRowSkeleton />
                    ) : (
                      <TableBody>
                        {shipperPayments.map((shipperPayment, index) => {
                          return <ShipperPaymentTableRow key={index} index={index} shipperPayment={shipperPayment} />;
                        })}

                        {shipperPayments.length === 0 && (
                          <EmptyTable
                            colNumber={shipperPaymentHeadCells.length + 2}
                            model={translate('model.lowercase.shipperPayments')}
                          />
                        )}
                      </TableBody>
                    )}
                  </Table>

                  <Stack alignItems="end" mt={2}>
                    <Link
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                        color: '#000',
                      }}
                      to={PATH_CASHIER_APP.wallet.shipperPayments}
                    >
                      <MUILink underline="hover" variant="subtitle2" color="#000">
                        {translate('page.content.viewAll')}
                      </MUILink>
                      <KeyboardArrowRightIcon fontSize="small" />
                    </Link>
                  </Stack>
                </TableContainer>
              </Paper>
            </Box>
          </Card>
        )}

        <Card>
          <Box sx={{ width: '100%' }} p={2}>
            <Paper sx={{ width: '100%' }}>
              <Typography variant="subtitle1" color="#2B3674" letterSpacing={0.6} lineHeight={1.75} mb={1}>
                {translate('page.title.transactionToday')}
              </Typography>
              <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                  <CommonTableHead<MoneyExchangeTable> headCells={MoneyExchangeHeadCells} onRequestSort={() => {}} />

                  {isLoading ? (
                    <MoneyExchangeTableRowSkeleton />
                  ) : (
                    <TableBody>
                      {moneyExchanges.map((moneyExchange, index) => {
                        return <MoneyExchangeTableRow key={index} index={index} moneyExchange={moneyExchange} />;
                      })}

                      {moneyExchanges.length === 0 && (
                        <EmptyTable
                          colNumber={MoneyExchangeHeadCells.length + 2}
                          model={translate('model.lowercase.moneyExchanges')}
                        />
                      )}
                    </TableBody>
                  )}
                </Table>
              </TableContainer>

              <Stack alignItems="end" mt={2}>
                <Link
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    color: '#000',
                  }}
                  to={
                    userAuth?.roleName === Role.KITCHEN_CENTER_MANAGER
                      ? PATH_KITCHEN_CENTER_APP.wallet.moneyExchanges
                      : PATH_CASHIER_APP.wallet.moneyExchanges
                  }
                >
                  <MUILink underline="hover" variant="subtitle2" color="#000">
                    {translate('page.content.viewAll')}
                  </MUILink>
                  <KeyboardArrowRightIcon fontSize="small" />
                </Link>
              </Stack>
            </Paper>
          </Box>
        </Card>
      </Stack>
    </Page>
  );
}

export default WalletPage;
