import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import {
  Box,
  Button,
  Card,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
// @mui icon
import AddRoundedIcon from '@mui/icons-material/AddRounded';
//
import { OrderSort, ProductCategory, ProductCategoryTable } from '@types';
import { Breadcrumbs, Helmet } from 'components';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { getCategoryDetail } from 'redux/productCategory/productCategorySlice';
import { PATH_BRAND_APP } from 'routes/paths';

import { getComparator, stableSort } from 'utils';
import { productCateHeadCells } from '../headCells';
import { CategoryTableHead, CategoryTableRow, CategoryTableToolbar, CreateCategoryModal } from 'sections/category';
import { useModal } from 'hooks';

function ListCategoryPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();

  const { productCategories } = useAppSelector((state) => state.productCategory);

  const { handleOpen, isOpen } = useModal();

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof ProductCategoryTable>('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterName, setFilterName] = useState<string>('');

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof ProductCategoryTable) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleNavigateDetail = (category: ProductCategory, categoryId: number) => {
    navigate(PATH_BRAND_APP.category.root + `/detail/${categoryId}`);
    dispatch(getCategoryDetail(category));
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - productCategories.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(productCategories, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, productCategories]
  );

  const isNotFound = !visibleRows.length && !!filterName;

  return (
    <>
      <Helmet title="List Product Category | MBKC" />

      <Container>
        <Stack direction="row" alignItems="start" justifyContent="space-between" mb={5}>
          <Stack>
            <Typography variant="h4">List Category</Typography>
            <Breadcrumbs pathname={pathname} navigateDashboard={PATH_BRAND_APP.root} />
          </Stack>

          <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={handleOpen}>
            Create product category
          </Button>
        </Stack>

        <Card>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <CategoryTableToolbar filterName={filterName} onFilterName={handleFilterByName} />
              <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                  <CategoryTableHead
                    headCells={productCateHeadCells}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                  />
                  <TableBody>
                    {visibleRows.map((category, index) => {
                      return (
                        <CategoryTableRow
                          index={index}
                          category={category}
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
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  {isNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={9} sx={{ py: 3 }}>
                          <Paper
                            sx={{
                              textAlign: 'center',
                            }}
                          >
                            <Typography variant="h6" paragraph>
                              Not found
                            </Typography>

                            <Typography variant="body2">
                              No results found for &nbsp;
                              <strong>&quot;{filterName}&quot;</strong>.
                              <br /> Try checking for typos or using complete words.
                            </Typography>
                          </Paper>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={productCategories.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Box>
        </Card>
      </Container>

      {isOpen && <CreateCategoryModal isOpen={isOpen} handleOpen={handleOpen} />}
    </>
  );
}

export default ListCategoryPage;
