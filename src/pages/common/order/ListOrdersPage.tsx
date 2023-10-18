import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { Box, Card, Paper, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
// redux
import { useAppSelector } from 'redux/configStore';
//
import { ORDER_TYPE_TABS, OrderSort, OrderTable, OrderTypeEnum } from '@types';
import { CommonTableHead, CustomTabs, EmptyTable, Page, SearchNotFound } from 'components';
import { useConfigHeadTable, useLocales, usePagination } from 'hooks';
import { PATH_CASHIER_APP } from 'routes/paths';
import { OrderTableRow, OrderTableToolbar } from 'sections/order';
import { getComparator, stableSort } from 'utils';

function ListOrdersPage() {
  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { OrderHeadCells } = useConfigHeadTable();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const { orders, isLoading } = useAppSelector((state) => state.order);

  const [orderSortTable, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof OrderTable>('customerName');
  const [filterName, setFilterName] = useState<string>('');
  const [orderType, setOrderType] = useState<OrderTypeEnum>(OrderTypeEnum.ALL);

  const handleChange = (event: React.SyntheticEvent, newValue: OrderTypeEnum) => {
    setOrderType(newValue);
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof OrderTable) => {
    const isAsc = orderBy === property && orderSortTable === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
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
      <Page
        pathname={pathname}
        title={translate('page.title.list', { model: translate('model.lowercase.order') })}
        navigateDashboard={PATH_CASHIER_APP.root}
      >
        <Card>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <CustomTabs<OrderTypeEnum>
                length={visibleRows.length}
                isLoading={isLoading}
                value={orderType}
                handleChange={handleChange}
                options={ORDER_TYPE_TABS}
              />
              <OrderTableToolbar filterName={filterName} onFilterName={handleFilterByName} />
              <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                  <CommonTableHead<OrderTable>
                    showAction
                    headCells={OrderHeadCells}
                    order={orderSortTable}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                  />

                  <TableBody>
                    {visibleRows.map((order, index) => {
                      return (
                        <OrderTableRow key={index} index={index} page={page} rowsPerPage={rowsPerPage} order={order} />
                      );
                    })}
                    {emptyRows > 0 ||
                      (orders.length === 0 && !filterName && (
                        <EmptyTable colNumber={orders.length + 2} model={translate('model.lowercase.order')} />
                      ))}
                  </TableBody>

                  {isNotFound && <SearchNotFound colNumber={orders.length + 2} searchQuery={filterName} />}
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
