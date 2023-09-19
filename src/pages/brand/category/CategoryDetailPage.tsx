import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import DescriptionIcon from '@mui/icons-material/Description';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import {
  Avatar,
  Box,
  Card,
  Container,
  Grid,
  IconButton,
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
//
import { OrderSort, ProductTable } from '@types';
import { Color } from 'common/enum';
import { Breadcrumbs, Helmet, Label } from 'components';
import useResponsive from 'hooks/useResponsive';
import { useAppSelector } from 'redux/configStore';
import { PATH_BRAND_APP } from 'routes/paths';
import { ProductTableHead, ProductTableRow, ProductTableToolbar } from 'sections/product';
import { getComparator, stableSort } from 'utils';
import { productHeadCells } from '../headCells';

function CategoryDetailPage() {
  const { pathname } = useLocation();
  const mdUp = useResponsive('up', 'md', 'md');

  const { products } = useAppSelector((state) => state.product);
  const { productCategory } = useAppSelector((state) => state.productCategory);

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof ProductTable>('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterName, setFilterName] = useState<string>('');

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof ProductTable) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
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
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(products, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, products]
  );

  const isNotFound = !visibleRows.length && !!filterName;

  return (
    <>
      <Helmet title="Product Category Detail | MBKC" />

      <Container>
        <Stack mb={7}>
          <Typography variant="h4">Category Detail</Typography>
          <Breadcrumbs pathname={pathname} navigateDashboard={PATH_BRAND_APP.root} />
        </Stack>

        <Stack direction="row" alignItems="center" spacing={5} mb={7}>
          <Card>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={(theme) => ({
                px: 3,
                py: 0.5,
                bgcolor: theme.palette.grey[200],
              })}
            >
              <Stack direction="row" alignItems="center" gap={0.5}>
                <Typography variant="h6">General information</Typography>
                <DescriptionIcon fontSize="small" />
              </Stack>
              <IconButton>
                <EditRoundedIcon />
              </IconButton>
            </Stack>
            <Stack sx={{ px: 3, py: 3 }}>
              <Grid container columnSpacing={2}>
                <Grid item md={3} sm={12}>
                  <Stack width="100%" alignItems="center">
                    <Avatar
                      src={productCategory?.imageUrl}
                      alt={productCategory?.name}
                      sx={{ width: 150, height: 150 }}
                    />
                  </Stack>
                </Grid>
                <Grid item md={9} sm={12}>
                  <Stack gap={1}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Stack direction="row" alignItems="center" gap={0.5}>
                        <Typography variant="subtitle1">Code:</Typography>
                        <Typography variant="body1">{productCategory?.code}</Typography>
                      </Stack>
                      <Label color={(productCategory?.status === 'inactive' && Color.ERROR) || Color.SUCCESS}>
                        {productCategory?.status}
                      </Label>
                    </Stack>

                    <Stack direction="row" alignItems="center" gap={0.5}>
                      <Typography variant="subtitle1">Name:</Typography>
                      <Typography variant="body1">{productCategory?.name}</Typography>
                    </Stack>
                    <Box>
                      <Typography variant="subtitle1">Description:</Typography>
                      <Typography variant="body2" sx={{ textAlign: 'justify' }}>
                        {productCategory?.description}
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </Card>

          {mdUp && (
            <Box width={700}>
              <img src="/assets/illustrations/mbkc_cook.svg" alt="login" />
            </Box>
          )}
        </Stack>

        <Stack spacing={1}>
          <Stack direction="row" alignItems="center" gap={0.5}>
            <Typography variant="h6">Products in the category</Typography>
            <DescriptionIcon fontSize="small" />
          </Stack>

          <Card>
            <Box sx={{ width: '100%' }}>
              <Paper sx={{ width: '100%', mb: 2 }}>
                <ProductTableToolbar filterName={filterName} onFilterName={handleFilterByName} />
                <TableContainer>
                  <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                    <ProductTableHead
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
                  count={products.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </Box>
          </Card>
        </Stack>
      </Container>
    </>
  );
}

export default CategoryDetailPage;
