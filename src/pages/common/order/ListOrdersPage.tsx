import { useState } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { Box, Card, Paper, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
// redux
import { useAppSelector } from 'redux/configStore';
// section
import { OrderTableRow } from 'sections/order';
//
import { ORDER_TYPE_TABS, OrderSort, OrderTable, OrderTypeEnum } from '@types';
import { CustomTableHead, CustomTableToolbar, CustomTabs, EmptyTable, Page, SearchNotFound } from 'components';
import { useConfigHeadTable, useLocales, usePagination } from 'hooks';
import { PATH_CASHIER_APP } from 'routes/paths';

function ListOrdersPage() {
  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { orderHeadCells } = useConfigHeadTable();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();
  const [selected, setSelected] = useState<readonly string[]>([]);

  const { orders, isLoading } = useAppSelector((state) => state.order);

  const [orderBy, setOrderBy] = useState<keyof OrderTable>('orderPartnerId');
  const [filterName, setFilterName] = useState<string>('');
  const [orderType, setOrderType] = useState<OrderTypeEnum>(OrderTypeEnum.ALL);
  const [order, setOrder] = useState<OrderSort>('asc');

  const handleChange = (event: React.SyntheticEvent, newValue: OrderTypeEnum) => {
    setOrderType(newValue);
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof OrderTable) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleReloadData = () => {};
  const numberItems = 20;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - numberItems) : 0;

  const isNotFound = !orders.length && !!filterName;

  return (
    <>
      <Page
        pathname={pathname}
        title={translate('page.title.list', { model: translate('model.lowercase.orders') })}
        navigateDashboard={PATH_CASHIER_APP.root}
      >
        <Card>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <CustomTabs<OrderTypeEnum>
                length={orders.length}
                isLoading={isLoading}
                value={orderType}
                handleChange={handleChange}
                options={ORDER_TYPE_TABS}
              />
              <CustomTableToolbar<OrderTable>
                model={translate('model.lowercase.orders')}
                selected={selected}
                setSelected={setSelected}
                headCells={orderHeadCells}
                filterName={filterName}
                onFilterName={handleFilterByName}
                handleReloadData={handleReloadData}
              />
              <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                  <CustomTableHead<OrderTable>
                    showAction
                    order={order}
                    orderBy={orderBy}
                    headCells={orderHeadCells}
                    onRequestSort={handleRequestSort}
                    selectedCol={selected}
                  />

                  <TableBody>
                    {orders.map((order, index) => {
                      return (
                        <OrderTableRow
                          key={index}
                          index={index}
                          order={order}
                          page={page}
                          rowsPerPage={rowsPerPage}
                          selected={selected}
                        />
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
