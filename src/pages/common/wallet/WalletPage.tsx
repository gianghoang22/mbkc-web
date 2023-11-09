import { useLocation, Link, useNavigate } from 'react-router-dom';
// @mui
import {
  Grid,
  Card,
  Box,
  Paper,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import AddchartIcon from '@mui/icons-material/Addchart';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
// section
import { MainBalanceCard, TotalDaily } from 'sections/wallet';
//redux
import { useAppSelector } from 'redux/configStore';
//
import { Label, Page } from 'components';
import { useLocales } from 'hooks';
import { PATH_CASHIER_APP, PATH_KITCHEN_CENTER_APP } from 'routes/paths';
import { Color, ExchangeType, FilterStatus, Language, PaymentMethod, Role } from 'common/enums';
import { useEffect, useMemo } from 'react';
import { ListParams } from 'common/@types';
import { getAllMoneyExchange, getAllShipperPayment } from 'redux/wallet/walletSlice';
import { useDispatch } from 'react-redux';
import { fDateTime, formatCurrency } from 'utils';

function WalletPage() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { translate, currentLang } = useLocales();
  const { userAuth } = useAppSelector((state) => state.auth);
  const { moneyExchanges, isLoading, numberItems, shipperPayments } = useAppSelector((state) => state.wallet);

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
        <Grid container columnSpacing={3} mb={3}>
          <Grid item xs={12} sm={5} md={5}>
            <MainBalanceCard />
          </Grid>

          <Grid item xs={12} sm={3.5} md={3.2}>
            <TotalDaily
              color={Color.SUCCESS}
              date="27/8/2023"
              icon={<CurrencyExchangeOutlinedIcon fontSize="medium" />}
              title={translate('page.title.totalDaily', { model: translate('model.lowercase.moneyExchanges') })}
              totalMoney="16.520.000"
            />
          </Grid>

          <Grid item xs={12} sm={3.5} md={3.8}>
            <TotalDaily
              color={Color.INFO}
              date="27/8/2023"
              icon={<AddchartIcon fontSize="medium" />}
              title={translate('page.title.totalDaily', { model: translate('model.lowercase.shipperPayments') })}
              totalMoney="16.520.000"
            />
          </Grid>
        </Grid>

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
                  : translate('page.title.new', { model: translate('model.capitalizeOne.moneyExchange') })}
              </Typography>
              <TableContainer component={Paper}>
                <Table aria-label="simple table" size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>{translate('table.no')}</TableCell>
                      <TableCell>{translate('table.sender')}</TableCell>
                      <TableCell>{translate('table.receiver')}</TableCell>
                      <TableCell>{translate('page.form.amount')}</TableCell>
                      <TableCell>{translate('table.exchangeType')}</TableCell>
                      <TableCell>{translate('table.status')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <>
                      {moneyExchanges?.map((moneyExchange, index) => (
                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell component="th" scope="row">
                            {index + 1}
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">{moneyExchange.senderName}</Typography>
                          </TableCell>

                          <TableCell>
                            <Typography variant="body2">{moneyExchange.receiveName}</Typography>
                          </TableCell>

                          <TableCell>
                            <Typography variant="body2">{formatCurrency(moneyExchange.amount)}</Typography>
                          </TableCell>

                          <TableCell>
                            <Typography variant="body2">
                              {moneyExchange.exchangeType === ExchangeType.RECEIVE
                                ? translate('table.receive')
                                : moneyExchange.exchangeType === ExchangeType.SEND
                                ? translate('table.send')
                                : translate('table.withdraw')}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Label color={Color.SUCCESS}>
                              {moneyExchange.status === FilterStatus.SUCCESS
                                ? translate('status.success')
                                : translate('status.fail')}
                            </Label>
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  </TableBody>
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
                    ? translate('page.title.new', { model: translate('model.lowercase.shipperPayments') })
                    : translate('page.title.new', { model: translate('model.capitalizeOne.shipperPayment') })}
                </Typography>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table" size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>{translate('table.no')}</TableCell>
                        <TableCell>{translate('table.cashierCreated')}</TableCell>
                        <TableCell>{translate('table.createdDate')}</TableCell>
                        <TableCell>{translate('page.form.amount')} </TableCell>
                        <TableCell>{translate('page.content.paymentMethod')}</TableCell>
                        <TableCell>{translate('model.capitalizeOne.bankingAccount')}</TableCell>
                        <TableCell>{translate('table.status')}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <>
                        {shipperPayments?.map((shipperPayment, index) => (
                          <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                              {index + 1}
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">{shipperPayment.cashierCreated}</Typography>
                            </TableCell>

                            <TableCell>
                              <Typography variant="body2">{fDateTime(shipperPayment.createDate)}</Typography>
                            </TableCell>

                            <TableCell>
                              <Typography variant="body2">{formatCurrency(shipperPayment.amount)}</Typography>
                            </TableCell>

                            <TableCell>
                              <Typography variant="body2">
                                {shipperPayment.paymentMethod === PaymentMethod.CASH
                                  ? translate('page.content.cash')
                                  : translate('page.content.cashless')}
                              </Typography>
                            </TableCell>

                            <TableCell>
                              <Typography variant="body2">{shipperPayment.kcBankingAccountName}</Typography>
                            </TableCell>

                            <TableCell>
                              <Label color={Color.SUCCESS}>
                                {shipperPayment.status === FilterStatus.SUCCESS
                                  ? translate('status.success')
                                  : translate('status.fail')}
                              </Label>
                            </TableCell>
                          </TableRow>
                        ))}
                      </>
                    </TableBody>
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
        </Box>
      </Page>
    </>
  );
}

export default WalletPage;
