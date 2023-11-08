/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Box, Card, Paper, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { getAllOrders } from 'redux/order/orderSlice';
// section
import { OrderTableRow, OrderTableRowSkeleton } from 'sections/order';
//
import { ListParams, OptionSelect, OrderSort, OrderTable, PARTNER_ORDER_STATUS, SYSTEM_STATUS_OPTIONS } from '@types';
import { CustomTableHead, CustomTableToolbar, EmptyTable, Page, SearchNotFound } from 'components';
import { useConfigHeadTable, useDebounce, useLocales, usePagination } from 'hooks';
import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';

function ListOrdersPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { orderHeadCells } = useConfigHeadTable();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const { orders, isLoading, numberItems } = useAppSelector((state) => state.order);

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof OrderTable>('partnerName');
  const [filterName, setFilterName] = useState<string>('');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [systemStatus, setSystemStatus] = useState<OptionSelect | null>({ value: '', label: '', id: '' });
  const [partnerOrderStatus, setPartnerOrderStatus] = useState<OptionSelect | null>({ value: '', label: '', id: '' });

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof OrderTable) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value.trimStart());
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - numberItems) : 0;

  const isNotFound = !orders.length && !!filterName;

  const debounceValue = useDebounce(filterName, 500);

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        searchValue: debounceValue,
        itemsPerPage: rowsPerPage,
        currentPage: page + 1,
        // sortBy: `${orderBy}_${order}`,
        systemStatus: systemStatus?.value,
        partnerOrderStatus: partnerOrderStatus?.value,
      },
      navigate,
    };
  }, [page, rowsPerPage, debounceValue, orderBy, order, systemStatus?.value, partnerOrderStatus?.value]);

  useEffect(() => {
    dispatch(getAllOrders(params));
  }, [params]);

  const handleReloadData = () => {
    dispatch<any>(getAllOrders(params));
  };

  const handleChangeSystemStatus = (status: OptionSelect | null) => {
    setSystemStatus(status);
  };

  const handleChangePartnerOrderStatus = (status: OptionSelect | null) => {
    setPartnerOrderStatus(status);
  };

  return (
    <>
      <Page
        title={translate('page.title.list', { model: translate('model.lowercase.orders') })}
        pathname={pathname}
        navigateDashboard={PATH_KITCHEN_CENTER_APP.root}
      >
        <Card>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <CustomTableToolbar<OrderTable>
                model={translate('model.lowercase.store')}
                selected={selected}
                setSelected={setSelected}
                headCells={orderHeadCells}
                filterName={filterName}
                options={SYSTEM_STATUS_OPTIONS}
                secondOptions={PARTNER_ORDER_STATUS}
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
                  {isLoading ? (
                    <OrderTableRowSkeleton length={orders.length} />
                  ) : (
                    <TableBody>
                      {orders.map((order, index) => {
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
                count={numberItems}
                rowsPerPage={rowsPerPage}
                labelRowsPerPage={translate('table.rowsPerPage')}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Box>
        </Card>
      </Page>
    </>
  );
}

export default ListOrdersPage;
