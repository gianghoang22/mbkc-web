import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import {
  Box,
  Card,
  Container,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Typography,
} from '@mui/material';
// redux
import { getCashierReportShift } from 'redux/cashier/cashierSlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { getAllOrders } from 'redux/order/orderSlice';
// sections
import { AppWidgetSummaryOutline } from 'sections/dashboard';
import { OrderTableRow, OrderTableRowSkeleton } from 'sections/order';
// interface
import { ListParams, OrderSort, OrderTable } from 'common/@types';
import { Color, PartnerOrderStatus, SystemStatus } from 'common/enums';
//
import { CustomTableHead, CustomTableToolbar, EmptyTable, Helmet } from 'components';
import { useConfigHeadTable, useLocales, usePagination } from 'hooks';
import { fDate } from 'utils';

function CashierDashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { translate } = useLocales();
  const { orderHeadCells } = useConfigHeadTable();
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

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
              isPrice
              isLoading={isLoadingShift}
              icon={<PaidOutlinedIcon fontSize="large" />}
              total={shiftReport?.totalMoneyToday as number}
              title={translate('page.dashboard.titleSummary', { model: translate('model.lowercase.revenueOfToday') })}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <AppWidgetSummaryOutline
              color={Color.INFO}
              isLoading={isLoadingShift}
              total={shiftReport?.totalOrderToday as number}
              icon={<DescriptionOutlinedIcon fontSize="large" />}
              title={translate('page.dashboard.titleSummary', { model: translate('model.lowercase.ordersOfToday') })}
            />
          </Grid>
        </Grid>

        <Box width="100%" mt={4}>
          <Card>
            <Stack
              gap={1}
              direction="row"
              alignItems="center"
              px={3}
              py={2}
              sx={{
                color: '#2B3674',
                borderBottom: 1,
                borderColor: (theme) => theme.palette.grey[400],
              }}
            >
              <Typography variant="subtitle1">
                {translate('page.title.list', { model: translate('model.lowercase.ordersSuccess') })}
              </Typography>
            </Stack>

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
