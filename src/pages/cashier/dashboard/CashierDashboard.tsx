import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
//mui
import { Container, Typography, Grid, Card, Paper, TableContainer, TableBody, TablePagination } from '@mui/material';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { Box } from '@mui/material';
import { Table } from '@mui/material';
//redux
import { useAppSelector } from 'redux/configStore';
import { useDispatch } from 'react-redux';
import { getCashierReportShift } from 'redux/cashier/cashierSlice';
import { getAllOrders } from 'redux/order/orderSlice';
//sections
import { OrderTableRow, OrderTableRowSkeleton } from 'sections/order';
import { AppWidgetSummaryOutline } from 'sections/dashboard';
//
import { CustomTableHead, CustomTableToolbar, EmptyTable, Helmet } from 'components';
import { useConfigHeadTable, useLocales, usePagination } from 'hooks';
import { Color, PartnerOrderStatus, SystemStatus } from 'common/enums';
import { ListParams, OrderSort, OrderTable } from 'common/@types';
import { fDate } from 'utils';

function CashierDashboard() {
  const { translate } = useLocales();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();
  const { orderHeadCells } = useConfigHeadTable();

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof OrderTable>('finalTotalPrice');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [searchDateFrom, setSearchDateFrom] = useState<Date | null>(null);
  const [searchDateTo, setSearchDateTo] = useState<Date | null>(null);

  const { shiftReport, isLoading: isLoadingShift } = useAppSelector((state) => state.cashier);
  const { isLoading: isLoadingOrder, orders, numberItems } = useAppSelector((state) => state.order);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - numberItems) : 0;

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof OrderTable) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangeSearchDateFrom = (date: Date | null) => {
    setSearchDateFrom(date);
  };

  const handleChangeSearchDateTo = (date: Date | null) => {
    setSearchDateTo(date);
  };

  const handleReloadData = () => {
    dispatch<any>(getAllOrders(params));
  };

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        itemsPerPage: rowsPerPage,
        currentPage: page + 1,
        sortBy: `${orderBy}_${order}`,
        systemStatus: SystemStatus.COMPLETED,
        partnerOrderStatus: PartnerOrderStatus.COMPLETED,
        searchDateFrom: searchDateFrom === null ? '' : fDate(searchDateFrom as Date),
        searchDateTo: searchDateTo === null ? '' : fDate(searchDateTo as Date),
      },
      navigate,
    };
  }, [page, rowsPerPage, orderBy, order, navigate, searchDateFrom, searchDateTo]);

  useEffect(() => {
    dispatch<any>(getCashierReportShift(navigate));
    dispatch<any>(getAllOrders(params));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <>
      <Helmet title={translate('model.capitalizeOne.cashier')} />

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          {translate('common.welcome')}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
            <AppWidgetSummaryOutline
              title={translate('page.dashboard.titleSummary', { model: translate('model.lowercase.revenueOfToday') })}
              total={shiftReport?.totalMoneyToday as number}
              isLoading={isLoadingShift}
              icon={<PaidOutlinedIcon fontSize="large" />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <AppWidgetSummaryOutline
              title={translate('page.dashboard.titleSummary', { model: translate('model.lowercase.ordersOfToday') })}
              total={shiftReport?.totalOrderToday as number}
              isLoading={isLoadingShift}
              color={Color.INFO}
              icon={<DescriptionOutlinedIcon fontSize="large" />}
            />
          </Grid>
        </Grid>

        <Box width="100%" mt={4}>
          <Card>
            <Typography
              color="#2B3674"
              style={{
                letterSpacing: '0.6px',
                marginLeft: 28,
                marginTop: 20,
              }}
              variant="subtitle1"
            >
              {translate('page.title.list', { model: translate('model.lowercase.ordersSuccess') })}
            </Typography>
            <Box sx={{ width: '100%' }}>
              <Paper sx={{ width: '100%', mb: 2 }}>
                <CustomTableToolbar<OrderTable>
                  selected={selected}
                  headCells={orderHeadCells}
                  model={translate('model.lowercase.store')}
                  setSelected={setSelected}
                  handleReloadData={handleReloadData}
                  handleChangeSearchDateFrom={handleChangeSearchDateFrom}
                  handleChangeSearchDateTo={handleChangeSearchDateTo}
                  haveSelectSearchDateFrom
                  haveSelectSearchDateTo
                />
                <TableContainer>
                  <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                    <CustomTableHead<OrderTable>
                      showAction
                      headCells={orderHeadCells}
                      order={order}
                      orderBy={orderBy}
                      onRequestSort={handleRequestSort}
                      selectedCol={selected}
                    />
                    {isLoadingOrder ? (
                      <OrderTableRowSkeleton length={orders.length} />
                    ) : (
                      <TableBody>
                        {orders?.map((order, index) => {
                          return <OrderTableRow key={order.id} index={index} order={order} selected={selected} />;
                        })}
                        {emptyRows > 0 ||
                          (orders.length === 0 && (
                            <EmptyTable
                              colNumber={orderHeadCells.length + 2}
                              model={translate('model.lowercase.orders')}
                            />
                          ))}
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  page={page}
                  count={numberItems}
                  rowsPerPage={rowsPerPage}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  labelRowsPerPage={translate('table.rowsPerPage')}
                />
              </Paper>
            </Box>
          </Card>
        </Box>
      </Container>
    </>
  );
}

export default CashierDashboard;
