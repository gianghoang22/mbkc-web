import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Box, Button, Card, Paper, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
// @mui icon
import AddRoundedIcon from '@mui/icons-material/AddRounded';
//
import { CashierTable, ListParams, OrderSort } from '@types';
import { CommonTableHead, EmptyTable, Page, SearchNotFound } from 'components';
import { useConfigHeadTable, useDebounce, useLocales, usePagination } from 'hooks';
import { getAllCashiers, setAddCashier } from 'redux/cashier/cashierSlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';
import { CashierTableRow, CashierTableRowSkeleton, CashierTableToolbar } from 'sections/cashier';
import { getComparator, stableSort } from 'utils';

function ListCashierPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { cashierHeadCells } = useConfigHeadTable();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const { cashiers, isLoading } = useAppSelector((state) => state.cashier);

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

  const debounceValue = useDebounce(filterName, 500);

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        searchValue: debounceValue,
        itemsPerPage: rowsPerPage,
        currentPage: page + 1,
      },
      navigate,
    };
  }, [page, rowsPerPage, debounceValue, navigate]);

  useEffect(() => {
    dispatch(getAllCashiers(params));
  }, [dispatch, navigate, params]);

  return (
    <>
      <Page
        title={translate('page.title.list', { model: translate('model.lowercase.cashiers') })}
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
            {translate('button.add', { model: translate('model.lowercase.cashier') })}
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
                  {isLoading ? (
                    <CashierTableRowSkeleton length={visibleRows.length} />
                  ) : (
                    <TableBody>
                      {visibleRows.map((cashier, index) => {
                        return (
                          <CashierTableRow
                            key={cashier.accountId}
                            index={index}
                            cashier={cashier}
                            page={page}
                            rowsPerPage={rowsPerPage}
                          />
                        );
                      })}
                      {emptyRows > 0 ||
                        (cashiers.length === 0 && !filterName && (
                          <EmptyTable
                            colNumber={cashierHeadCells.length + 2}
                            model={translate('model.lowercase.cashier')}
                          />
                        ))}
                    </TableBody>
                  )}
                  {isNotFound && <SearchNotFound colNumber={cashierHeadCells.length + 2} searchQuery={filterName} />}
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={cashiers.length}
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

export default ListCashierPage;
