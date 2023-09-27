import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import {
  Box,
  Button,
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@mui/material';
//@mui Icons
import AddRoundedIcon from '@mui/icons-material/AddRounded';
//
import { BrandTable, OrderSort } from '@types';
import { CommonTableHead, Page, SearchNotFound } from 'components';
import { useConfigHeadTable, useLocales, usePagination } from 'hooks';
import { getAllBrands, setAddBrand } from 'redux/brand/brandSlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { PATH_ADMIN_APP } from 'routes/paths';
import { BrandTableRow, BrandTableRowSkeleton, BrandTableToolbar } from 'sections/brand';
import { getComparator, stableSort } from 'utils';

function ListBrandPage(props: any) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { translate } = useLocales();
  const { pathname } = useLocation();
  const { brandHeadCells } = useConfigHeadTable();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof BrandTable>('name');
  const [filterName, setFilterName] = useState<string>('');

  const { brands, isLoading } = useAppSelector((state) => state.brand);

  useEffect(() => {
    dispatch(getAllBrands(navigate));
  }, [dispatch, navigate]);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof BrandTable) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
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

  const options = {
    searchKey: filterName,
    status: 'active',
    pageNumber: page + 1,
    pageSize: rowsPerPage,
  };

  const params = {
    options,
    navigate,
  };

  useEffect(() => {
    dispatch(getAllBrands(params));
  }, [filterName, page, rowsPerPage]);

  console.log(brands);

  return (
    <>
      <Page
        pathname={pathname}
        title={translate('page.title.list', { model: translate('model.lowercase.brand') })}
        navigateDashboard={PATH_ADMIN_APP.root}
        actions={() => [
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={() => {
              navigate(PATH_ADMIN_APP.brand.newBrand);
              dispatch(setAddBrand());
            }}
          >
            {translate('button.add', { model: translate('model.lowercase.brand') })}
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
                    showAction
                    headCells={brandHeadCells}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                  />
                  {isLoading ? (
                    <BrandTableRowSkeleton length={visibleRows.length} />
                  ) : (
                    <TableBody>
                      {visibleRows.map((brand, index) => {
                        return <BrandTableRow index={index} brand={brand} page={page} rowsPerPage={rowsPerPage} />;
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
                  )}
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

export default ListBrandPage;
