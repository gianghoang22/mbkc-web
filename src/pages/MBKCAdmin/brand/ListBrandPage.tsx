/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Box, Button, Card, Paper, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
//@mui Icons
import AddRoundedIcon from '@mui/icons-material/AddRounded';
// redux
import { getAllBrands, setAddBrand } from 'redux/brand/brandSlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
// section
import { BrandTableRow, BrandTableRowSkeleton, BrandTableToolbar } from 'sections/brand';
//
import { BrandTable, ListParams, OrderSort, OrderSortBy } from '@types';
import { CommonTableHead, EmptyTable, Page, SearchNotFound } from 'components';
import { useConfigHeadTable, useDebounce, useLocales, usePagination } from 'hooks';
import { PATH_ADMIN_APP } from 'routes/paths';

function ListBrandPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { translate } = useLocales();
  const { pathname } = useLocation();
  const { brandHeadCells } = useConfigHeadTable();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof BrandTable>(OrderSortBy.NAME);
  const [filterName, setFilterName] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  const { brands, isLoading, numberItems } = useAppSelector((state) => state.brand);

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
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - numberItems) : 0;

  const isNotFound = !brands.length && !!filterName;

  const debounceValue = useDebounce(filterName, 500);

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        keySearchName: debounceValue,
        keyStatusFilter: status,
        currentPage: page + 1,
        itemsPerPage: rowsPerPage,
        keySortName: orderBy === OrderSortBy.NAME ? order : '',
      },
      navigate,
    };
  }, [page, rowsPerPage, debounceValue, orderBy, order, status]);

  useEffect(() => {
    dispatch(getAllBrands(params));
  }, [params]);

  return (
    <>
      <Page
        pathname={pathname}
        title={translate('page.title.list', { model: translate('model.lowercase.brands') })}
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
              <BrandTableToolbar
                status={status}
                setStatus={setStatus}
                filterName={filterName}
                onFilterName={handleFilterByName}
              />
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
                    <BrandTableRowSkeleton length={brands.length} />
                  ) : (
                    <TableBody>
                      {brands.map((brand, index) => {
                        return (
                          <BrandTableRow
                            status={status}
                            key={index}
                            index={index}
                            brand={brand}
                            page={page}
                            rowsPerPage={rowsPerPage}
                          />
                        );
                      })}
                      {emptyRows > 0 ||
                        (brands.length === 0 && !filterName && (
                          <EmptyTable
                            colNumber={brandHeadCells.length + 2}
                            model={translate('model.lowercase.brand')}
                          />
                        ))}
                    </TableBody>
                  )}
                  {isNotFound && <SearchNotFound colNumber={brands.length + 2} searchQuery={filterName} />}
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={numberItems}
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

export default ListBrandPage;
