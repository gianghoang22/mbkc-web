import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Box, Card, Paper, Table, TableBody, TableContainer, TablePagination } from '@mui/material';

import { OrderSort, ShipperPayment, ShipperPaymentTable } from '@types';
import { CommonTableHead, EmptyTable, Page, SearchNotFound } from 'components';
import { useConfigHeadTable, useLocales, usePagination } from 'hooks';
import { useAppSelector } from 'redux/configStore';

import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';

import { getComparator, stableSort } from 'utils';
import ShipperPaymentTableRow from 'sections/shipperPayment/ShipperPaymentTableRow';
import ShipperPaymentTableToolbar from 'sections/shipperPayment/ShipperPaymentTableToolbar';

function ListShipperPaymentPage(props: any) {
  const navigate = useNavigate();
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

  const handleNavigateDetail = (shipperPayment: ShipperPayment, paymentId: number) => {
    navigate(PATH_KITCHEN_CENTER_APP.wallet.root + `/${paymentId}`);
  };

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - shipperPayments.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(shipperPayments, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, shipperPayments]
  );

  const isNotFound = !visibleRows.length && !!filterName;

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
                    {visibleRows.map((shipperPayment, index) => {
                      return (
                        <ShipperPaymentTableRow
                          key={index}
                          index={index}
                          page={page}
                          rowsPerPage={rowsPerPage}
                          shipperPayment={shipperPayment}
                          handleNavigateDetail={handleNavigateDetail}
                        />
                      );
                    })}
                    {emptyRows > 0 ||
                      (shipperPayments.length === 0 && !filterName && (
                        <EmptyTable
                          colNumber={ShipperPaymentHeadCells.length + 2}
                          model={translate('model.lowercase.store')}
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
