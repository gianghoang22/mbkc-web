/* eslint-disable react-hooks/exhaustive-deps */
import moment from 'moment';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// @mui
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Container,
  Grid,
  Link as MUILink,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
// @mui icon
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ListAltIcon from '@mui/icons-material/ListAlt';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { getDashboardKitchenCenter } from 'redux/dashboard/dashboardSlice';
// interface
import { Color, Gender, Language, Status } from 'common/enums';
// section
import { BrandTableRowDashboardSkeleton } from 'sections/brand';
import { AppAmountInWallet, AppWidgetSummaryOutline, ListNewStores } from 'sections/dashboard';
//
import { EmptyTable, Helmet, Label } from 'components';
import { useLocales } from 'hooks';
import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';

function KitchenCenterDashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const { translate, currentLang } = useLocales();

  const { kitchenCenterDashboard, isLoading: isLoadingDashboard } = useAppSelector((state) => state.dashboard);

  const columnDate = [...(kitchenCenterDashboard ? kitchenCenterDashboard?.columnChartMoneyExchanges : [])].map(
    (column) => column.date
  );

  useEffect(() => {
    dispatch<any>(getDashboardKitchenCenter(navigate));
  }, []);

  return (
    <>
      <Helmet title={translate('page.title.kitchenCenterManagement')} />

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          {translate('common.welcome')}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummaryOutline
              isPrice
              title={translate('page.dashboard.totalAmountInWallet')}
              total={kitchenCenterDashboard?.totalBalancesDaily as number}
              isLoading={isLoadingDashboard}
              icon={<ListAltIcon fontSize="large" />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummaryOutline
              title={translate('page.dashboard.titleSummary', { model: translate('model.lowercase.stores') })}
              color={Color.SECONDARY}
              total={kitchenCenterDashboard?.totalStores as number}
              isLoading={isLoadingDashboard}
              icon={<RestaurantMenuIcon fontSize="large" />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummaryOutline
              title={translate('page.dashboard.titleSummary', { model: translate('model.lowercase.cashiers') })}
              color={Color.SUCCESS}
              total={kitchenCenterDashboard?.totalCashiers as number}
              isLoading={isLoadingDashboard}
              icon={<AssignmentIndIcon fontSize="large" />}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} mt={3}>
          <Grid item xs={12} sm={12} md={12}>
            <AppAmountInWallet
              title={translate('page.dashboard.kitchenCenterChartTitle')}
              subheader={`${moment(columnDate[columnDate.length - 1]).format('DD/MM/YYYY')} - ${moment(
                columnDate[0]
              ).format('DD/MM/YYYY')}`}
              chartLabels={[...(kitchenCenterDashboard ? kitchenCenterDashboard?.columnChartMoneyExchanges : [])].map(
                (column) => {
                  const date = column.date.split('+');
                  return `${date[0]}.000Z`;
                }
              )}
              chartData={[
                {
                  name: 'Amount',
                  type: 'area',
                  fill: 'gradient',
                  data: [...(kitchenCenterDashboard ? kitchenCenterDashboard?.columnChartMoneyExchanges : [])].map(
                    (column) => column.amount
                  ),
                },
              ]}
            />
          </Grid>
        </Grid>

        <Stack gap={5} mt={5}>
          <ListNewStores
            pathname={pathname}
            listStores={kitchenCenterDashboard ? kitchenCenterDashboard?.stores : []}
          />

          <Card>
            <CardHeader
              title={
                currentLang.value === Language.ENGLISH
                  ? translate('page.title.new', { model: translate('model.lowercase.brands') })
                  : translate('page.title.new', { model: translate('model.capitalizeOne.brands') })
              }
            />
            <Box p={2}>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>{translate('table.no')}</TableCell>
                      <TableCell>Logo</TableCell>
                      <TableCell>{translate('table.fullName')}</TableCell>
                      <TableCell>{translate('table.email')}</TableCell>
                      <TableCell>{translate('table.gender')}</TableCell>
                      <TableCell>{translate('table.status')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {isLoadingDashboard ? (
                      <BrandTableRowDashboardSkeleton />
                    ) : (
                      <>
                        {kitchenCenterDashboard?.cashiers.map((cashier, index) => (
                          <TableRow
                            key={index}
                            sx={{ cursor: 'pointer' }}
                            onClick={() => navigate(PATH_KITCHEN_CENTER_APP.cashier.root + `/${cashier.accountId}`)}
                          >
                            <TableCell width={60} align="center">
                              {index + 1}
                            </TableCell>
                            <TableCell width={80}>
                              <Avatar src={cashier.avatar} alt="logo" />
                            </TableCell>
                            <TableCell>{cashier.fullName}</TableCell>
                            <TableCell width={600}>{cashier.email}</TableCell>
                            <TableCell align="left">
                              {cashier.gender.toLowerCase() === Gender.MALE
                                ? translate('gender.male')
                                : translate('gender.female')}
                            </TableCell>
                            <TableCell>
                              <Label
                                color={
                                  cashier?.status === Status.ACTIVE
                                    ? Color.SUCCESS
                                    : cashier?.status === Status.INACTIVE
                                    ? Color.WARNING
                                    : Color.ERROR
                                }
                              >
                                {cashier?.status === Status.INACTIVE
                                  ? translate('status.inactive')
                                  : cashier?.status === Status.ACTIVE
                                  ? translate('status.active')
                                  : translate('status.deActive')}
                              </Label>
                            </TableCell>
                          </TableRow>
                        ))}
                      </>
                    )}
                    {kitchenCenterDashboard?.cashiers?.length === 0 && (
                      <EmptyTable colNumber={6} model={translate('model.lowercase.cashier')} />
                    )}
                  </TableBody>
                </Table>

                <Stack alignItems="end" mt={2}>
                  <Link
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      textDecoration: 'none',
                      color: '#000',
                    }}
                    to={PATH_KITCHEN_CENTER_APP.cashier.list}
                  >
                    <MUILink underline="hover" variant="subtitle2" color="#000">
                      {translate('page.content.viewAll')}
                    </MUILink>
                    <KeyboardArrowRightIcon fontSize="small" />
                  </Link>
                </Stack>
              </TableContainer>
            </Box>
          </Card>
        </Stack>
      </Container>
    </>
  );
}

export default KitchenCenterDashboard;
