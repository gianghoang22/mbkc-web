import { useState } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { Box, Card, Paper, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
//redux
import { useAppSelector } from 'redux/configStore';
// section
import { ShiftTableRow, ShiftTableToolbar } from 'sections/shift';

//
import { OrderSort, ShiftTable } from 'common/@types';
import { CommonTableHead, EmptyTable, Page, SearchNotFound } from 'components';
import { useConfigHeadTable, useLocales, usePagination } from 'hooks';
import { PATH_CASHIER_APP } from 'routes/paths';

function ListShiftPage() {
  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { ShiftHeadCells } = useConfigHeadTable();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const { shifts } = useAppSelector((state) => state.shift);

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof ShiftTable>('cashierName');
  const [filterName, setFilterName] = useState<string>('');

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof ShiftTable) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value.trimStart());
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - shifts.length) : 0;

  const isNotFound = !shifts.length && !!filterName;

  return (
    <>
      <Page
        title={translate('page.title.list', { model: translate('model.lowercase.shifts') })}
        pathname={pathname}
        navigateDashboard={PATH_CASHIER_APP.root}
      >
        <Card>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <ShiftTableToolbar filterName={filterName} onFilterName={handleFilterByName} />
              <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                  <CommonTableHead<ShiftTable>
                    headCells={ShiftHeadCells}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                  />

                  <TableBody>
                    {shifts.map((shift, index) => {
                      return (
                        <ShiftTableRow key={index} index={index} page={page} rowsPerPage={rowsPerPage} shift={shift} />
                      );
                    })}
                    {emptyRows > 0 ||
                      (shifts.length === 0 && !filterName && (
                        <EmptyTable colNumber={ShiftHeadCells.length + 2} model={translate('model.lowercase.shifts')} />
                      ))}
                  </TableBody>

                  {isNotFound && <SearchNotFound colNumber={ShiftHeadCells.length + 2} searchQuery={filterName} />}
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={shifts.length}
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

export default ListShiftPage;
