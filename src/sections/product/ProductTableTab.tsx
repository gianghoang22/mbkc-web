import { useMemo, useState } from 'react';
// @mui
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from '@mui/material';
//
import { OrderSort, ProductTable } from '@types';
import { CommonTableHead, SearchNotFound } from 'components';
import { useConfigHeadTable, usePagination } from 'hooks';
import { useAppSelector } from 'redux/configStore';
import { getComparator, stableSort } from 'utils';
import ProductTableRow from './ProductTableRow';
import ProductTableToolbar from './ProductTableToolbar';

function ProductTableTab() {
  const { productHeadCells } = useConfigHeadTable();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const { products } = useAppSelector((state) => state.product);

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof ProductTable>('name');

  const [filterName, setFilterName] = useState<string>('');

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof ProductTable) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(products, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, products]
  );

  const isNotFound = !visibleRows.length && !!filterName;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <ProductTableToolbar filterName={filterName} onFilterName={handleFilterByName} />
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
            <CommonTableHead<ProductTable>
              showAction
              headCells={productHeadCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((product, index) => {
                return <ProductTableRow index={index} product={product} />;
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={productHeadCells.length} />
                </TableRow>
              )}
            </TableBody>
            {isNotFound && <SearchNotFound colNumber={productHeadCells.length} searchQuery={filterName} />}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export default ProductTableTab;
