import { useLocation, useNavigate } from 'react-router-dom';
//
import { CommonTableHead, EmptyTable, Page, SearchNotFound, Tabs } from 'components';
import { PATH_CASHIER_APP, PATH_KITCHEN_CENTER_APP } from 'routes/paths';
import { OrderTableRow, OrderTableToolbar } from 'sections/order';
import { Order, OrderSort, OrderTable } from '@types';
import { useConfigHeadTable, useLocales, usePagination } from 'hooks';
import { useMemo, useState } from 'react';
import { getComparator, stableSort } from 'utils';
import { useAppSelector } from 'redux/configStore';

// mui
import { Box, Card, Table, TableBody, TableContainer, TablePagination, Paper } from '@mui/material';

function ListOrdersPage() {
  const { pathname } = useLocation();
  const { translate } = useLocales();
  const navigate = useNavigate();
  const { OrderHeadCells } = useConfigHeadTable();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const { orders } = useAppSelector((state) => state.order);

  const [orderSortTable, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof OrderTable>('customerName');
  const [filterName, setFilterName] = useState<string>('');

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof OrderTable) => {
    const isAsc = orderBy === property && orderSortTable === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleNavigateDetail = (order: Order, orderId: number) => {
    console.log(order);
    navigate(PATH_KITCHEN_CENTER_APP.order.root + `/detail/${orderId}`);
  };

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orders.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(orders, getComparator(orderSortTable, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [orderSortTable, orderBy, page, rowsPerPage, orders]
  );

  const isNotFound = !visibleRows.length && !!filterName;

  return (
    <>
      <Page title="List Order" pathname={pathname} navigateDashboard={PATH_CASHIER_APP.root}>
        <Card>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2, paddingLeft: 2 }}>
              <Tabs />
            </Paper>
          </Box>
        </Card>
        <Card>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <OrderTableToolbar filterName={filterName} onFilterName={handleFilterByName} />
              <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                  <CommonTableHead<OrderTable>
                    headCells={OrderHeadCells}
                    order={orderSortTable}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                  />

                  <TableBody>
                    {visibleRows.map((order, index) => {
                      return (
                        <OrderTableRow
                          key={index}
                          index={index}
                          page={page}
                          rowsPerPage={rowsPerPage}
                          order={order}
                          handleNavigateDetail={handleNavigateDetail}
                        />
                      );
                    })}
                    {emptyRows > 0 ||
                      (orders.length === 0 && !filterName && (
                        <EmptyTable colNumber={orders.length} model={translate('model.lowercase.store')} />
                      ))}
                  </TableBody>

                  {isNotFound && <SearchNotFound colNumber={orders.length} searchQuery={filterName} />}
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={orders.length}
                rowsPerPage={rowsPerPage}
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
