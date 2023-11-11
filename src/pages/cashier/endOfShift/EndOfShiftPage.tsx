import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
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
} from '@mui/material';
// redux
import { sendMoneyToKitchenCenter } from 'redux/wallet/walletSlice';
import { useAppSelector } from 'redux/configStore';
import { getCashierReportShift } from 'redux/cashier/cashierSlice';
import { getAllOrders } from 'redux/order/orderSlice';
//sections
import { OrderTableRow, OrderTableRowSkeleton } from 'sections/order';
import { CashierReportSkeleton } from 'sections/cashier';
//
import { PATH_CASHIER_APP } from 'routes/paths';
import { useConfigHeadTable, useDebounce, useLocales, useModal, usePagination } from 'hooks';
import { CustomTableHead, CustomTableToolbar, EmptyTable, Page, SearchNotFound } from 'components';
import { fDate, formatCurrency } from 'utils';
import { ListParams, OptionSelect, OrderSort, OrderTable } from 'common/@types';
import { PARTNER_ORDER_STATUS, SYSTEM_STATUS_OPTIONS } from 'common/models';

function EndOfShiftPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { orderHeadCells } = useConfigHeadTable();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();
  const { isOpen, handleOpen } = useModal();

  const { isLoading: isLoadingOrder, orders, numberItems } = useAppSelector((state) => state.order);
  const { shiftReport, isLoading: isLoadingShift } = useAppSelector((state) => state.cashier);

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof OrderTable>('finalTotalPrice');
  const [filterName, setFilterName] = useState<string>('');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [systemStatus, setSystemStatus] = useState<OptionSelect | null>({ value: '', label: '', id: '' });
  const [partnerOrderStatus, setPartnerOrderStatus] = useState<OptionSelect | null>({ value: '', label: '', id: '' });

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

  const handleChangeSystemStatus = (status: OptionSelect | null) => {
    setSystemStatus(status);
  };

  const handleChangePartnerOrderStatus = (status: OptionSelect | null) => {
    setPartnerOrderStatus(status);
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
        systemStatus: systemStatus?.value,
        partnerOrderStatus: partnerOrderStatus?.value,
        searchDateFrom: today,
        searchDateTo: today,
      },
      navigate,
    };
  }, [
    page,
    rowsPerPage,
    debounceValue,
    orderBy,
    order,
    today,
    systemStatus?.value,
    partnerOrderStatus?.value,
    navigate,
  ]);

  useEffect(() => {
    dispatch<any>(getCashierReportShift(navigate));
    dispatch<any>(getAllOrders(params));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <Page title={translate('breadcrumb.endOfShift')} pathname={pathname} navigateDashboard={PATH_CASHIER_APP.root}>
      {isLoadingShift ? (
        <CashierReportSkeleton />
      ) : (
        <Stack alignItems="center" width="100%">
          <Box sx={{ width: '100%' }}>
            <Card>
              <Paper sx={{ width: '100%', mb: 4, mt: 4 }}>
                <Stack justifyContent="center" direction="row">
                  <Avatar src={shiftReport?.cashierImage} sx={{ width: 150, height: 150 }} />
                </Stack>
                <Stack direction="row" justifyContent="center" m={2}>
                  <Typography variant="h4">{shiftReport?.cashierName}</Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between" ml={20} mr={20} mt={4}>
                  <Typography variant="h6" color={(theme) => theme.palette.grey[500]}>
                    {translate('model.capitalize.kitchenCenter')}
                  </Typography>
                  <Typography variant="h6">{shiftReport?.kitchenCenterName}</Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between" ml={20} mr={20} mt={3}>
                  <Typography variant="h6" color={(theme) => theme.palette.grey[500]}>
                    {translate('page.content.totalOrdersOfToday')}
                  </Typography>

                  <Typography variant="h6">{shiftReport?.totalOrderToday}</Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between" ml={20} mr={20} mt={3}>
                  <Typography variant="h6" color={(theme) => theme.palette.grey[500]}>
                    {translate('page.content.totalRevenueOfToday')}
                  </Typography>
                  <Typography variant="h6">{formatCurrency(shiftReport?.totalMoneyToday as number)}</Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between" ml={20} mr={20} mt={3}>
                  <Typography variant="h6" color={(theme) => theme.palette.grey[500]}>
                    {translate('page.content.balance')}
                  </Typography>
                  <Typography variant="h6">{formatCurrency(shiftReport?.balance as number)}</Typography>
                </Stack>

                <Stack mt={4} justifyContent="center" direction="row" gap={2}>
                  <Button variant="outlined" onClick={handleOpen}>
                    {translate('page.title.listOfToday', { model: translate('model.lowercase.orders') })}
                  </Button>
                  <Button onClick={handleEndOfShift} variant="contained" disabled={isLoadingShift}>
                    {translate('button.confirmEndOfShift')}
                  </Button>
                </Stack>
              </Paper>
            </Card>
          </Box>
        </Stack>
      )}
      <Box width="100%" mt={4} hidden={!isOpen}>
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
            {translate('page.title.listOfToday', { model: translate('model.lowercase.orders') })}
          </Typography>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <CustomTableToolbar<OrderTable>
                selected={selected}
                headCells={orderHeadCells}
                filterName={filterName}
                options={SYSTEM_STATUS_OPTIONS}
                secondOptions={PARTNER_ORDER_STATUS}
                model={translate('model.lowercase.store')}
                setSelected={setSelected}
                onFilterName={handleFilterByName}
                handleReloadData={handleReloadData}
                haveSelectSystemStatus
                haveSelectPartnerOrderStatus
                handleChangeSystemStatus={handleChangeSystemStatus}
                handleChangePartnerOrderStatus={handleChangePartnerOrderStatus}
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
  );
}

export default EndOfShiftPage;
