import { useLocation, Link } from 'react-router-dom';
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
//
import { Label, Page } from 'components';
import { useLocales } from 'hooks';
import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';
import { Color } from 'common/enum';

function WalletPage() {
  const { pathname } = useLocation();
  const { translate } = useLocales();

  return (
    <>
      <Page
        pathname={pathname}
        title={translate('page.title.wallet', { model: translate('model.lowercase.kitchenCenter') })}
        navigateDashboard={PATH_KITCHEN_CENTER_APP.root}
      >
        <Grid container columnSpacing={2} mb={3}>
          <Grid item xs={12} sm={5} md={5}>
            <MainBalanceCard />
          </Grid>

          <Grid item xs={12} sm={3.5} md={3.5}>
            <TotalDaily
              color={Color.SUCCESS}
              date="27/8/2023"
              icon={<CurrencyExchangeOutlinedIcon fontSize="medium" />}
              title="Total daily money exchange"
              totalMoney="16.520.000"
            />
          </Grid>

          <Grid item xs={12} sm={3.5} md={3.5}>
            <TotalDaily
              color={Color.INFO}
              date="27/8/2023"
              icon={<AddchartIcon fontSize="medium" />}
              title="Total daily shipper payment"
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
                New money exchange
              </Typography>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>{translate('table.no')}</TableCell>
                      <TableCell>Sender</TableCell>
                      <TableCell>Receiver</TableCell>
                      <TableCell>Amount (đ)</TableCell>
                      <TableCell>Exchange type</TableCell>
                      <TableCell>{translate('table.status')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <>
                      {Array(5)
                        .fill(0)
                        .map((_, index) => (
                          <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                              {index + 1}
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">Le Hong Thanh</Typography>
                            </TableCell>

                            <TableCell>
                              <Typography variant="body2">Le Xuan Bach</Typography>
                            </TableCell>

                            <TableCell>
                              <Typography variant="body2">50.000</Typography>
                            </TableCell>

                            <TableCell>
                              <Typography variant="body2">Online payment</Typography>
                            </TableCell>
                            <TableCell>
                              <Label color={Color.SUCCESS}>Successful</Label>
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
                  to={PATH_KITCHEN_CENTER_APP.wallet.moneyExchanges}
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
                  New shipper payment
                </Typography>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>{translate('table.no')}</TableCell>
                        <TableCell>Order</TableCell>
                        <TableCell>Created date</TableCell>
                        <TableCell>Created by</TableCell>
                        <TableCell>Amount (đ)</TableCell>
                        <TableCell>Payment method</TableCell>
                        <TableCell>Banking account</TableCell>
                        <TableCell>{translate('table.status')}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <>
                        {Array(5)
                          .fill(0)
                          .map((_, index) => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              <TableCell component="th" scope="row">
                                {index + 1}
                              </TableCell>
                              <TableCell>
                                <Typography variant="body2">#MBKC1234</Typography>
                              </TableCell>

                              <TableCell>
                                <Typography variant="body2">27/8/2023</Typography>
                              </TableCell>

                              <TableCell>
                                <Typography variant="body2">Le Xuan Bach</Typography>
                              </TableCell>

                              <TableCell>
                                <Typography variant="body2">250.000</Typography>
                              </TableCell>

                              <TableCell>
                                <Typography variant="body2">Online payment</Typography>
                              </TableCell>

                              <TableCell>
                                <Typography variant="body2">MOMO</Typography>
                              </TableCell>

                              <TableCell>
                                <Label color={Color.SUCCESS}>Successful</Label>
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
                    to={PATH_KITCHEN_CENTER_APP.wallet.shipperPayments}
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
