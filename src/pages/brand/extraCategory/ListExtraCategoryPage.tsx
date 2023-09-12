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
import { OrderSort, ProductCateHeadCell, ProductCategoryTable } from '@types';
import { RoutesPageKey } from 'common/enum';
import { Breadcrumbs, Helmet } from 'components';
import RoutesDynamicKeys from 'constants/RoutesDynamicKeys';
import { useModal } from 'hooks/useModal';
import productCategories from 'mock/productCategory';
import {
  CreateProductCategoryModal,
  ProductCateTableHead,
  ProductCateTableRow,
  ProductCateTableToolbar,
} from 'sections/brand';
import { getComparator, stableSort } from 'utils';

const headCells: ProductCateHeadCell[] = [
  {
    id: 'imageUrl',
    numeric: false,
    disablePadding: true,
    label: 'Image',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Category name',
  },
  {
    id: 'code',
    numeric: false,
    disablePadding: false,
    label: 'Category code',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
];

function ListExtraCategoryPage(props: any) {
  const navigate = useNavigate();

  const { pathname } = useLocation();

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

  const handleNavigateDetail = (categoryId: number) => {
    navigate(RoutesDynamicKeys.EXTRA_CATEGORY_DETAIL + `/${categoryId}`);
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
    [order, orderBy, page, rowsPerPage]
  );

  const isNotFound = !visibleRows.length && !!filterName;

  return (
    <>
      <Helmet title="List Extra Category | MBKC" />

      <Container>
        <Stack direction="row" alignItems="start" justifyContent="space-between" mb={5}>
          <Stack>
            <Typography variant="h4">List Extra Category</Typography>
            <Breadcrumbs model="Extra Category" pathname={pathname} navigateDashboard={RoutesPageKey.BRAND_DASHBOARD} />
          </Stack>

          <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={handleOpen}>
            Create product category
          </Button>
        </Stack>

        <Card>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <ProductCateTableToolbar filterName={filterName} onFilterName={handleFilterByName} />
              <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                  <ProductCateTableHead
                    headCells={headCells}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                  />
                  <TableBody>
                    {visibleRows.map((productCategory, index) => {
                      return (
                        <ProductCateTableRow
                          index={index}
                          productCategory={productCategory}
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

      {isOpen && <CreateProductCategoryModal isOpen={isOpen} handleOpen={handleOpen} />}
    </>
  );
}

export default ListExtraCategoryPage;
