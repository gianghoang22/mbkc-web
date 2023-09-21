//react
import { useLocation, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';

// @mui
import {
  Box,
  Card,
  Container,
  Paper,
  Stack,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TablePagination,
  TableRow,
  TableCell,
} from '@mui/material';

//@mui Icons
import AddRoundedIcon from '@mui/icons-material/AddRounded';

//
import { Breadcrumbs, CommonTableHead, Helmet, Page, SearchNotFound } from 'components';
import { PATH_ADMIN_APP } from 'routes/paths';
import { Button } from '@mui/material';
import { BrandTableRow, BrandTableToolbar } from 'sections/brand';
import { Brand, BrandTable, OrderSort } from '@types';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { getBrandDetail } from 'redux/brand/brandSlice';
import { getComparator, stableSort } from 'utils';
import { brandHeadCells } from 'pages/common/headCells';

function ListBrandPage(props: any) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof BrandTable>('brandName');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterName, setFilterName] = useState<string>('');

  const { brands } = useAppSelector((state) => state.brand);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof BrandTable) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleNavigateDetail = (brand: Brand, brandId: number) => {
    navigate(PATH_ADMIN_APP.brand.root + `/detail/${brandId}`);
    dispatch(getBrandDetail(brand));
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
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - brands.length) : 0;

  const visibleRows = useMemo(
    () => stableSort(brands, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, brands]
  );

  const isNotFound = !visibleRows.length && !!filterName;

  return (
    <>
      <Page
        title="List Of Brand"
        pathname={pathname}
        navigateDashboard={PATH_ADMIN_APP.root}
        actions={() => [
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={() => navigate(PATH_ADMIN_APP.brand.newBrand)}
          >
            Create new Brand
          </Button>,
        ]}
      >
        <Card>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <BrandTableToolbar filterName={filterName} onFilterName={handleFilterByName} />
              <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                  <CommonTableHead<BrandTable>
                    headCells={brandHeadCells}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                  />
                  <TableBody>
                    {visibleRows.map((brand, index) => {
                      return <BrandTableRow index={index} brand={brand} handleNavigateDetail={handleNavigateDetail} />;
                    })}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: 53 * emptyRows,
                        }}
                      >
                        <TableCell colSpan={brandHeadCells.length} />
                      </TableRow>
                    )}
                  </TableBody>
                  {isNotFound && <SearchNotFound colNumber={brands.length} searchQuery={filterName} />}
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={brands.length}
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

ListBrandPage.propTypes = {};

export default ListBrandPage;
