import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Box, Paper, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
//
import { CategoryTable, CategoryType, OrderSort } from '@types';
import { CommonTableHead, EmptyTable, SearchNotFound } from 'components';
import { useConfigHeadTable, useLocales, useModal, usePagination } from 'hooks';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { CategoryTableRow, CategoryTableToolbar } from 'sections/category';
import { getComparator, stableSort } from 'utils';
import AddExtraToCategory from './AddExtraToCategoryModal';

function CategoryTableTab() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { translate } = useLocales();
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
                  />
                );
              })}
              {emptyRows > 0 && (
                <EmptyTable colNumber={categoryHeadCells.length} model={translate('model.lowercase.category')} />
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
