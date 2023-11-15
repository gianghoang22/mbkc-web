import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import DoneAllIcon from '@mui/icons-material/DoneAll';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import TaskIcon from '@mui/icons-material/Task';
import {
  Box,
  Card,
  Paper,
  Stack,
  Typography,
  Avatar,
  Button,
  TableContainer,
  Table,
  TableBody,
  TablePagination,
  Grid,
} from '@mui/material';
// redux
import { sendMoneyToKitchenCenter } from 'redux/moneyExchange/moneyExchangeSlice';
import { useAppSelector } from 'redux/configStore';
import { getCashierReportShift } from 'redux/cashier/cashierSlice';
import { getAllOrders } from 'redux/order/orderSlice';
//sections
import { OrderTableRow, OrderTableRowSkeleton } from 'sections/order';
import { CashierReportSkeleton } from 'sections/cashier';
//
import { PATH_CASHIER_APP } from 'routes/paths';
import { useConfigHeadTable, useDebounce, useLocales, useModal, usePagination } from 'hooks';
import { ConfirmDialog, CustomTableHead, CustomTableToolbar, EmptyTable, Page, SearchNotFound } from 'components';
import { fDate, formatCurrency } from 'utils';
import { ListParams, OrderSort, OrderSortBy, OrderTable } from 'common/@types';
import { Color, PartnerOrderStatus, SystemStatus } from 'common/enums';
import { Link } from '@mui/material';

function EndOfShiftPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { isOpen, handleOpen } = useModal();
  const { orderHeadCells } = useConfigHeadTable();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();
  const { handleOpen: handleOpenModalEndOfShift, isOpen: isOpenModalEndOfShift } = useModal();

  const { isLoading: isLoadingWallet } = useAppSelector((state) => state.wallet);
  const { shiftReport, isLoading: isLoadingShift } = useAppSelector((state) => state.cashier);
  const { isLoading: isLoadingOrder, orders, numberItems } = useAppSelector((state) => state.order);

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof OrderTable>('finalTotalPrice');
  const [filterName, setFilterName] = useState<string>('');
  const [selected, setSelected] = useState<readonly string[]>([]);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - numberItems) : 0;

  const isNotFound = !orders.length && !!filterName;

  const debounceValue = useDebounce(filterName, 500);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof OrderTable) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value.trimStart());
  };

  const handleReloadData = () => {
    dispatch<any>(getAllOrders(params));
  };

  const handleEndOfShift = () => {
    dispatch<any>(sendMoneyToKitchenCenter(navigate));
  };

  let today = fDate(new Date());

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        searchValue: debounceValue,
        itemsPerPage: rowsPerPage,
        currentPage: page + 1,
        sortBy: `${orderBy}_${order}`,
        systemStatus: SystemStatus.COMPLETED,
        partnerOrderStatus: PartnerOrderStatus.COMPLETED,
        searchDateFrom: today,
        searchDateTo: today,
      },
      navigate,
    };
  }, [page, rowsPerPage, debounceValue, orderBy, order, today, navigate]);

  useEffect(() => {
    dispatch<any>(getCashierReportShift(navigate));
    dispatch<any>(getAllOrders(params));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <>
      <Page title={translate('breadcrumb.endOfShift')} pathname={pathname} navigateDashboard={PATH_CASHIER_APP.root}>
        {isLoadingShift ? (
          <CashierReportSkeleton />
        ) : (
          <Stack alignItems="center" width="100%">
            <Box sx={{ width: '100%' }}>
              <Card>
                <Stack
                  gap={1}
                  direction="row"
                  alignItems="center"
                  px={3}
                  py={2}
                  sx={{
                    borderBottom: 1,
                    borderColor: (theme) => theme.palette.grey[400],
                  }}
                >
                  <DoneAllIcon />
                  <Typography variant="h6">{translate('page.title.summaryWorkShift')}</Typography>
                </Stack>
                <Stack p={4} pb={2}>
                  <Grid container columnSpacing={4} rowSpacing={3}>
                    <Grid item xs={12} md={4}>
                      <Stack
                        gap={2}
                        pr={3}
                        sx={{
                          height: '100%',
                          borderRight: 1,
                          borderColor: (theme) => theme.palette.grey[400],
                        }}
                      >
                        <Typography variant="subtitle1">{translate('model.capitalizeOne.cashier')}</Typography>

                        <Stack direction="column" alignItems="center" gap={1}>
                          <Avatar src={shiftReport?.cashier.avatar} sx={{ width: 100, height: 100 }} />

                          <Stack direction="row" alignItems="center" gap={1}>
                            <PersonIcon color="primary" />
                            <Typography component="span" color="black">
                              {shiftReport?.cashier.fullName}
                            </Typography>
                          </Stack>
                          <Stack direction="row" alignItems="center" gap={1}>
                            <EmailIcon color="primary" />
                            <Typography component="span" color="black">
                              {shiftReport?.cashier.email}
                            </Typography>
                          </Stack>
                        </Stack>

                        <Typography variant="subtitle1">
                          {translate('page.content.dayWorks')}:{' '}
                          <Typography component="span">{fDate(new Date())}</Typography>
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Stack gap={2}>
                        <Stack direction="column" gap={1.5}>
                          <Typography variant="subtitle1">{translate('model.capitalize.kitchenCenter')}</Typography>
                          <Stack direction="row" gap={2}>
                            <img
                              src={shiftReport?.cashier.kitchenCenter.logo}
                              alt={shiftReport?.cashier.kitchenCenter.name}
                              style={{ height: 100, width: 100 }}
                            />
                            <Stack>
                              <Typography>
                                {translate('table.name')}:{' '}
                                <Typography component="span" variant="subtitle1">
                                  {shiftReport?.cashier.kitchenCenter.name}
                                </Typography>
                              </Typography>
                              <Typography>
                                {translate('table.address')}:{' '}
                                <Typography component="span" variant="subtitle1">
                                  {shiftReport?.cashier.kitchenCenter.address}
                                </Typography>
                              </Typography>
                              <Typography>
                                {translate('table.manageEmail')}:{' '}
                                <Typography component="span" variant="subtitle1">
                                  {shiftReport?.cashier.kitchenCenter.kitchenCenterManagerEmail}
                                </Typography>
                              </Typography>
                            </Stack>
                          </Stack>
                        </Stack>

                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                          <Typography>
                            {translate('page.content.totalOrdersOfToday')} (
                            <Link fontWeight={700} onClick={handleOpen} sx={{ cursor: 'pointer' }}>
                              {translate('breadcrumb.detail')}
                            </Link>
                            )
                          </Typography>

                          <Typography variant="h6">{shiftReport?.totalOrderToday}</Typography>
                        </Stack>

                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                          <Typography>{translate('page.content.totalRevenueOfToday')}</Typography>
                          <Typography variant="h6">{formatCurrency(shiftReport?.totalMoneyToday as number)}</Typography>
                        </Stack>

                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                          <Typography>{translate('page.content.balance')}</Typography>
                          <Typography variant="h6">{formatCurrency(shiftReport?.balance as number)}</Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                  <Stack
                    direction="row"
                    justifyContent="right"
                    mt={4}
                    sx={{
                      pt: 2,
                      borderTop: 1,
                      borderColor: (theme) => theme.palette.grey[400],
                    }}
                  >
                    <Button onClick={handleOpenModalEndOfShift} variant="outlined" disabled={isLoadingWallet}>
                      {translate('button.confirmEndOfShift')}
                    </Button>
                  </Stack>
                </Stack>
              </Card>
            </Box>
          </Stack>
        )}
        <Box width="100%" mt={4} hidden={!isOpen}>
          <Card>
            <Stack
              gap={1}
              direction="row"
              alignItems="center"
              px={3}
              py={2}
              sx={{
                borderBottom: 1,
                borderColor: (theme) => theme.palette.grey[400],
              }}
            >
              <TaskIcon />
              <Typography variant="h6">
                {translate('page.title.listOfToday', { model: translate('model.lowercase.orders') })}
              </Typography>
            </Stack>
            <Box sx={{ width: '100%' }}>
              <Paper sx={{ width: '100%', mb: 2 }}>
                <CustomTableToolbar<OrderTable>
                  selected={selected}
                  headCells={orderHeadCells.filter((col) => col.id !== OrderSortBy.CREATE_DATE)}
                  filterName={filterName}
                  model={translate('table.lowercase.partnerOrderId')}
                  setSelected={setSelected}
                  onFilterName={handleFilterByName}
                  handleReloadData={handleReloadData}
                />
                <TableContainer>
                  <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                    <CustomTableHead<OrderTable>
                      showAction
                      headCells={orderHeadCells.filter((col) => col.id !== OrderSortBy.CREATE_DATE)}
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
                          (orders.length === 0 && !filterName && (
                            <EmptyTable
                              colNumber={orderHeadCells.length + 2}
                              model={translate('model.lowercase.orders')}
                            />
                          ))}
                      </TableBody>
                    )}

                    {isNotFound && <SearchNotFound colNumber={orderHeadCells.length + 2} searchQuery={filterName} />}
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
      </Page>

      {isOpenModalEndOfShift && (
        <ConfirmDialog
          open={isOpenModalEndOfShift}
          onClose={handleOpenModalEndOfShift}
          onAction={handleEndOfShift}
          isOrder
          color={Color.SUCCESS}
          title={translate('dialog.confirmOrderEndOfShift')}
          description={translate('dialog.contentOrderEndOfShift')}
        />
      )}
    </>
  );
}

export default EndOfShiftPage;
