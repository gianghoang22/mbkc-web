import { useState } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { Box, Card, Paper, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
// redux
import { useAppSelector } from 'redux/configStore';
// section
import { ShipperPaymentTableRow, ShipperPaymentTableToolbar } from 'sections/shipperPayment';
//
import { OrderSort, ShipperPaymentTable } from 'common/@types';
import { CommonTableHead, EmptyTable, Page, SearchNotFound } from 'components';
import { useConfigHeadTable, useLocales, usePagination } from 'hooks';
import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';

function ListShipperPaymentPage() {
  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { ShipperPaymentHeadCells } = useConfigHeadTable();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof ShipperPaymentTable>('KCBankingAccount');
  const [filterName, setFilterName] = useState<string>('');

  const { shipperPayments } = useAppSelector((state) => state.wallet);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof ShipperPaymentTable) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value.trimStart());
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - shipperPayments.length) : 0;

  const isNotFound = !shipperPayments.length && !!filterName;

  return (
    <>
      <Page title="List Of Shipper Payments" pathname={pathname} navigateDashboard={PATH_KITCHEN_CENTER_APP.root}>
        <Card>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <ShipperPaymentTableToolbar filterName={filterName} onFilterName={handleFilterByName} />
              <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                  <CommonTableHead<ShipperPaymentTable>
                    headCells={ShipperPaymentHeadCells}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                  />

                  <TableBody>
                    {shipperPayments.map((shipperPayment, index) => {
                      return (
                        <ShipperPaymentTableRow
                          key={index}
                          index={index}
                          page={page}
                          rowsPerPage={rowsPerPage}
                          shipperPayment={shipperPayment}
                        />
                      );
                    })}
                    {emptyRows > 0 ||
                      (shipperPayments.length === 0 && !filterName && (
                        <EmptyTable
                          colNumber={ShipperPaymentHeadCells.length + 2}
                          model={translate('model.lowercase.shipperPayment')}
                        />
                      ))}
                  </TableBody>

                  {isNotFound && (
                    <SearchNotFound colNumber={ShipperPaymentHeadCells.length + 2} searchQuery={filterName} />
                  )}
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={shipperPayments.length}
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

export default ListShipperPaymentPage;
