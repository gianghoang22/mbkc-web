import { useEffect, useMemo } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
// @mui
import { Grid, Card, Box, Paper, Typography, TableContainer, Table, TableBody } from '@mui/material';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import AddchartIcon from '@mui/icons-material/Addchart';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
// section
import { MainBalanceCard, TotalDaily, WalletCardSkeleton } from 'sections/wallet';
import { ShipperPaymentTableRow, ShipperPaymentTableRowSkeleton } from 'sections/shipperPayment';
import { MoneyExchangeTableRow, MoneyExchangeTableRowSkeleton } from 'sections/moneyExchanges';
//redux
import { useAppSelector } from 'redux/configStore';
import { getAllMoneyExchange, getAllShipperPayment, getWalletInformation } from 'redux/wallet/walletSlice';
import { useDispatch } from 'react-redux';
//
import { CommonTableHead, EmptyTable, Page } from 'components';
import { useConfigHeadTable, useLocales } from 'hooks';
import { PATH_CASHIER_APP, PATH_KITCHEN_CENTER_APP } from 'routes/paths';
import { Color, Language, Role } from 'common/enums';
import { ListParams, MoneyExchangeTable, ShipperPaymentTable } from 'common/@types';
import { formatCurrency } from 'utils';

function WalletPage() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { translate, currentLang } = useLocales();
  const { ShipperPaymentHeadCells, MoneyExchangeHeadCells } = useConfigHeadTable();

  const { userAuth } = useAppSelector((state) => state.auth);
  const { moneyExchanges, shipperPayments, isLoading, walletInformation } = useAppSelector((state) => state.wallet);

  const newShipperPayments = shipperPayments.slice(0, 5);
  const newMoneyExchanges = moneyExchanges.slice(0, 5);

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        itemsPerPage: 5,
        currentPage: 1,
      },
      navigate,
    };
  }, [navigate]);

  useEffect(() => {
    dispatch<any>(getAllShipperPayment(params));
  }, [dispatch, params]);

  useEffect(() => {
    dispatch<any>(getAllMoneyExchange(params));
  }, [dispatch, params]);

  useEffect(() => {
    dispatch<any>(getWalletInformation(navigate));
  }, []);

  return (
    <>
      <Page
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
          <Grid container columnSpacing={3} mb={3}>
            <Grid item xs={12} sm={5} md={5}>
              <MainBalanceCard balance={walletInformation?.balance as number} />
            </Grid>

            <Grid item xs={12} sm={3.5} md={3.2}>
              <TotalDaily
                color={Color.SUCCESS}
                date={new Date()}
                icon={<CurrencyExchangeOutlinedIcon fontSize="medium" />}
                title={translate('page.title.totalDaily', { model: translate('model.lowercase.moneyExchanges') })}
                totalMoney={formatCurrency(walletInformation?.totalDailyMoneyExchange as number)}
              />
            </Grid>

            <Grid item xs={12} sm={3.5} md={3.8}>
              <TotalDaily
                color={Color.INFO}
                date={new Date()}
                icon={<AddchartIcon fontSize="medium" />}
                title={translate('page.title.totalDaily', { model: translate('model.lowercase.shipperPayments') })}
                totalMoney={formatCurrency(walletInformation?.totalDailyShipperPayment as number)}
              />
            </Grid>
          </Grid>
        )}

        <Card>
          <Box sx={{ width: '100%' }} padding={2}>
            <Paper sx={{ width: '100%' }}>
              <Typography
                color="#2B3674"
                style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  marginBottom: 10,
                  lineHeight: '28px',
                  letterSpacing: '0.6px',
                }}
              >
                {currentLang.value === Language.ENGLISH
                  ? translate('page.title.new', { model: translate('model.lowercase.shipperPayments') })
                  : translate('page.title.new', { model: translate('model.capitalizeOne.shipperPayments') })}
              </Typography>
              <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                  <CommonTableHead<ShipperPaymentTable> headCells={ShipperPaymentHeadCells} onRequestSort={() => {}} />

                  {isLoading ? (
                    <ShipperPaymentTableRowSkeleton length={5} />
                  ) : (
                    <TableBody>
                      {newShipperPayments.map((shipperPayment, index) => {
                        return (
                          <ShipperPaymentTableRow
                            key={index}
                            index={index}
                            page={1}
                            rowsPerPage={5}
                            shipperPayment={shipperPayment}
                          />
                        );
                      })}

                      {newShipperPayments.length === 0 && (
                        <EmptyTable
                          colNumber={ShipperPaymentHeadCells.length + 2}
                          model={translate('model.lowercase.shipperPayments')}
                        />
                      )}
                    </TableBody>
                  )}
                </Table>

                <Link
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    textDecoration: 'none',
                    color: '#000',
                    fontSize: '16px',
                    fontWeight: 400,
                    letterSpacing: '0.4px',
                    alignItems: 'center',
                    marginTop: 8,
                  }}
                  to={
                    userAuth?.roleName === Role.KITCHEN_CENTER_MANAGER
                      ? PATH_KITCHEN_CENTER_APP.wallet.shipperPayments
                      : PATH_CASHIER_APP.wallet.shipperPayments
                  }
                >
                  <Typography>{translate('page.content.viewAll')}</Typography>
                  <KeyboardArrowRightIcon style={{ fontSize: '18px' }} />
                </Link>
              </TableContainer>
            </Paper>
          </Box>
        </Card>

        <Box mt={3}>
          <Card>
            <Box sx={{ width: '100%' }} padding={2}>
              <Paper sx={{ width: '100%' }}>
                <Typography
                  color="#2B3674"
                  style={{
                    fontSize: '14px',
                    fontWeight: 700,
                    marginBottom: 10,
                    lineHeight: '28px',
                    letterSpacing: '0.6px',
                  }}
                >
                  {currentLang.value === Language.ENGLISH
                    ? translate('page.title.new', { model: translate('model.lowercase.moneyExchanges') })
                    : translate('page.title.new', { model: translate('model.capitalizeOne.moneyExchanges') })}
                </Typography>
                <TableContainer>
                  <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                    <CommonTableHead<MoneyExchangeTable> headCells={MoneyExchangeHeadCells} onRequestSort={() => {}} />

                    {isLoading ? (
                      <MoneyExchangeTableRowSkeleton length={5} />
                    ) : (
                      <TableBody>
                        {newMoneyExchanges.map((moneyExchange, index) => {
                          return (
                            <MoneyExchangeTableRow
                              key={index}
                              index={index}
                              page={1}
                              rowsPerPage={5}
                              moneyExchange={moneyExchange}
                            />
                          );
                        })}

                        {newMoneyExchanges.length === 0 && (
                          <EmptyTable
                            colNumber={MoneyExchangeHeadCells.length + 2}
                            model={translate('model.lowercase.moneyExchanges')}
                          />
                        )}
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
                <Link
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    textDecoration: 'none',
                    color: '#000',
                    fontSize: '16px',
                    fontWeight: 400,
                    letterSpacing: '0.4px',
                    alignItems: 'center',
                    marginTop: 8,
                  }}
                  to={
                    userAuth?.roleName === Role.KITCHEN_CENTER_MANAGER
                      ? PATH_KITCHEN_CENTER_APP.wallet.moneyExchanges
                      : PATH_CASHIER_APP.wallet.moneyExchanges
                  }
                >
                  <Typography>{translate('page.content.viewAll')}</Typography>
                  <KeyboardArrowRightIcon style={{ fontSize: '18px' }} />
                </Link>
              </Paper>
            </Box>
          </Card>
        </Box>
      </Page>
    </>
  );
}

export default WalletPage;
