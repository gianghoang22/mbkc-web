import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import {
  Box,
  Button,
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@mui/material';
// @mui icon
import AddRoundedIcon from '@mui/icons-material/AddRounded';
//
import { CashierTable, OrderSort } from '@types';
import { CommonTableHead, Page, SearchNotFound } from 'components';
import { useConfigHeadTable, usePagination } from 'hooks';
import { setAddCashier } from 'redux/cashier/cashierSlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';
import { CashierTableRow, CashierTableToolbar } from 'sections/cashier';
import { getComparator, stableSort } from 'utils';

function ListCashierPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { cashierHeadCells } = useConfigHeadTable();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const { cashiers } = useAppSelector((state) => state.cashier);

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof CashierTable>('fullName');
  const [filterName, setFilterName] = useState<string>('');

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof CashierTable) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - cashiers.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(cashiers, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, cashiers]
  );

  const isNotFound = !visibleRows.length && !!filterName;

  return (
    <>
      <Page
        title="List Cashier"
        pathname={pathname}
        navigateDashboard={PATH_KITCHEN_CENTER_APP.root}
        actions={() => [
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={() => {
              navigate(PATH_KITCHEN_CENTER_APP.cashier.newCashier);
              dispatch(setAddCashier());
            }}
          >
            Add cashier
          </Button>,
        ]}
      >
        <Card>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <CashierTableToolbar filterName={filterName} onFilterName={handleFilterByName} />
              <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                  <CommonTableHead<CashierTable>
                    showAction
                    headCells={cashierHeadCells}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                  />
                  <TableBody>
                    {visibleRows.map((cashier, index) => {
                      return <CashierTableRow key={cashier.accountId} index={index} cashier={cashier} />;
                    })}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: 53 * emptyRows,
                        }}
                      >
                        <TableCell colSpan={cashierHeadCells.length} />
                      </TableRow>
                    )}
                  </TableBody>
                  {isNotFound && <SearchNotFound colNumber={cashierHeadCells.length} searchQuery={filterName} />}
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={cashiers.length}
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

export default ListCashierPage;
