/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Box, Button, Card, Paper, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
// @mui icon
import AddRoundedIcon from '@mui/icons-material/AddRounded';
//
import { CategoryTable, CategoryType, ListParams, OrderSort } from '@types';
import { CommonTableHead, EmptyTable, Page, SearchNotFound } from 'components';
import { useConfigHeadTable, useDebounce, useLocales, usePagination } from 'hooks';
import { getAllCategories, setAddCategory, setCategoryType } from 'redux/category/categorySlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { PATH_BRAND_APP } from 'routes/paths';
import { CategoryTableRow, CategoryTableRowSkeleton, CategoryTableToolbar } from 'sections/category';
import { getComparator, stableSort } from 'utils';
import { setRoutesToBack } from 'redux/routes/routesSlice';

function ListExtraCategoryPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { translate } = useLocales();
  const { pathname } = useLocation();
  const { categoryHeadCells } = useConfigHeadTable();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const { categories, isLoading } = useAppSelector((state) => state.category);

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
    () => stableSort(categories, getComparator(order, orderBy)),
    [order, orderBy, categories]
  );

  const isNotFound = !visibleRows.length && !!filterName;

  const debounceValue = useDebounce(filterName, 500);

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        type: CategoryType.EXTRA,
        pageSize: rowsPerPage,
        pageNumber: page + 1,
        keySearchName: debounceValue,
      },
      navigate,
    };
  }, [page, rowsPerPage, debounceValue]);

  useEffect(() => {
    dispatch<any>(getAllCategories(params));
  }, [params]);

  return (
    <>
      <Page
        pathname={pathname}
        title={translate('page.title.list', { model: translate('model.lowercase.extraCategory') })}
        navigateDashboard={PATH_BRAND_APP.root}
        actions={() => [
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={() => {
              navigate(PATH_BRAND_APP.category.newCategory);
              dispatch(setCategoryType(CategoryType.EXTRA));
              dispatch(setRoutesToBack(pathname));
              dispatch(setAddCategory());
            }}
          >
            {translate('button.add', { model: translate('model.lowercase.extraCategory') })}
          </Button>,
        ]}
      >
        <Card>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <CategoryTableToolbar filterName={filterName} onFilterName={handleFilterByName} />
              <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                  <CommonTableHead<CategoryTable>
                    showAction
                    headCells={categoryHeadCells}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                  />
                  {isLoading ? (
                    <CategoryTableRowSkeleton length={visibleRows.length} />
                  ) : (
                    <TableBody>
                      {visibleRows.map((extraCategory, index) => {
                        return (
                          <CategoryTableRow
                            key={extraCategory.categoryId}
                            index={index}
                            category={extraCategory}
                            categoryType={CategoryType.EXTRA}
                            length={visibleRows.length}
                            setPage={setPage}
                          />
                        );
                      })}
                      {emptyRows > 0 ||
                        (categories.length === 0 && !filterName && (
                          <EmptyTable
                            colNumber={categoryHeadCells.length}
                            model={translate('model.lowercase.extraCategory')}
                          />
                        ))}
                    </TableBody>
                  )}
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
          </Box>
        </Card>
      </Page>
    </>
  );
}

export default ListExtraCategoryPage;
