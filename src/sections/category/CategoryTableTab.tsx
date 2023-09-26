import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from '@mui/material';
//
import { Category, CategoryTable, CategoryType, OrderSort } from '@types';
import { CommonTableHead, SearchNotFound } from 'components';
import { useConfigHeadTable, useModal, usePagination } from 'hooks';
import { getCategoryDetail_local } from 'redux/category/categorySlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { PATH_BRAND_APP } from 'routes/paths';
import { CategoryTableRow, CategoryTableToolbar } from 'sections/category';
import { getComparator, stableSort } from 'utils';
import AddExtraToCategory from './AddExtraToCategory';

function CategoryTableTab() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { handleOpen, isOpen } = useModal();
  const { categoryHeadCells } = useConfigHeadTable();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const { categories } = useAppSelector((state) => state.category);

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof CategoryTable>('name');

  const [filterName, setFilterName] = useState<string>('');

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof CategoryTable) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleNavigateDetail = (category: Category, categoryId: number) => {
    navigate(PATH_BRAND_APP.category.root + `/detail/${categoryId}`);
    dispatch(getCategoryDetail_local(category));
  };

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - categories.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(categories, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, categories]
  );

  const isNotFound = !visibleRows.length && !!filterName;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <CategoryTableToolbar
          filterName={filterName}
          onFilterName={handleFilterByName}
          addAction
          onAction={handleOpen}
        />

        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
            <CommonTableHead<CategoryTable>
              showAction
              headCells={categoryHeadCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((category, index) => {
                return (
                  <CategoryTableRow
                    key={category.categoryId}
                    index={index}
                    category={category}
                    categoryType={CategoryType.NORMAL}
                    handleNavigateDetail={handleNavigateDetail}
                  />
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={categoryHeadCells.length} />
                </TableRow>
              )}
            </TableBody>
            {isNotFound && <SearchNotFound colNumber={categoryHeadCells.length} searchQuery={filterName} />}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={categories.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {isOpen && <AddExtraToCategory isOpen={isOpen} handleOpen={handleOpen} />}
    </Box>
  );
}

export default CategoryTableTab;
