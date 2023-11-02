import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { Box, Card, Paper, Table, TableBody, TableContainer, TablePagination, Button } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
//redux
import { useAppSelector } from 'redux/configStore';
// section
import { MoneyExchangeTableRow, MoneyExchangeTableToolbar } from 'sections/moneyExchanges';
//
import { MoneyExchangeTable, OrderSort } from '@types';
import { CommonTableHead, EmptyTable, Page, SearchNotFound } from 'components';
import { useConfigHeadTable, useLocales, useModal, usePagination } from 'hooks';
import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';
import { getComparator, stableSort } from 'utils';
import { CreatePaymentForStoreModal } from 'sections/paymentForStores';
import MoneyExchangeDetailModal from 'sections/moneyExchanges/MoneyExchangeDetailModal';

function ListOfPaymentForStoresPage() {
  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { MoneyExchangeHeadCells } = useConfigHeadTable();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();
  const { handleOpen, isOpen } = useModal();
  const { handleOpen: handleOpenModalDetail, isOpen: isOpenModalDetail } = useModal();

  const { moneyExchanges } = useAppSelector((state) => state.wallet);

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof MoneyExchangeTable>('sender');
  const [filterName, setFilterName] = useState<string>('');

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof MoneyExchangeTable) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - moneyExchanges.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(moneyExchanges, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, moneyExchanges]
  );

  const isNotFound = !visibleRows.length && !!filterName;

  return (
    <>
      <Page
        title={translate('page.title.list', { model: translate('model.lowercase.paymentForStores') })}
        pathname={pathname}
        navigateDashboard={PATH_KITCHEN_CENTER_APP.root}
        actions={() => [
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={() => {
              handleOpen();
            }}
          >
            {translate('button.add', { model: translate('model.lowercase.paymentForStore') })}
          </Button>,
        ]}
      >
        <Card>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <MoneyExchangeTableToolbar filterName={filterName} onFilterName={handleFilterByName} />
              <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                  <CommonTableHead<MoneyExchangeTable>
                    headCells={MoneyExchangeHeadCells}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                  />

                  <TableBody>
                    {visibleRows.map((moneyExchange, index) => {
                      return (
                        <MoneyExchangeTableRow
                          key={index}
                          index={index}
                          page={page}
                          rowsPerPage={rowsPerPage}
                          moneyExchange={moneyExchange}
                        />
                      );
                    })}
                    {emptyRows > 0 ||
                      (moneyExchanges.length === 0 && !filterName && (
                        <EmptyTable
                          colNumber={MoneyExchangeHeadCells.length + 2}
                          model={translate('model.lowercase.store')}
                        />
                      ))}
                  </TableBody>

                  {isNotFound && (
                    <SearchNotFound colNumber={MoneyExchangeHeadCells.length + 2} searchQuery={filterName} />
                  )}
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={moneyExchanges.length}
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

      {isOpen && (
        <CreatePaymentForStoreModal isOpen={isOpen} handleOpen={handleOpen} page={page} rowsPerPage={rowsPerPage} />
      )}

      {isOpenModalDetail && <MoneyExchangeDetailModal isOpen={isOpenModalDetail} handleOpen={handleOpenModalDetail} />}
    </>
  );
}

export default ListOfPaymentForStoresPage;
