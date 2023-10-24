/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Box, Button, Card, Paper, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
// @mui icon
import AddRoundedIcon from '@mui/icons-material/AddRounded';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { getAllPartnerProducts } from 'redux/partnerProduct/partnerProductSlice';
import { getProductEmpty, setAddProduct } from 'redux/product/productSlice';
import { setRoutesToBack } from 'redux/routes/routesSlice';
// section
import {
  PartnerProductTableRow,
  PartnerProductTableRowSkeleton,
  PartnerProductTableToolbar,
} from 'sections/partnerProduct';
//
import { ListParams, OrderSort, OrderSortBy, PartnerProductTable } from '@types';
import { CommonTableHead, EmptyTable, Page, SearchNotFound } from 'components';
import { useConfigHeadTable, useDebounce, useLocales, usePagination } from 'hooks';
import { PATH_BRAND_APP } from 'routes/paths';

function ListPartnerProductPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { translate } = useLocales();
  const { pathname } = useLocation();
  const { partnerProductHeadCells } = useConfigHeadTable();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const { partnerProducts, isLoading, numberItems } = useAppSelector((state) => state.partnerProduct);

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof PartnerProductTable>(OrderSortBy.PRODUCT_NAME);
  const [filterName, setFilterName] = useState<string>('');

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof PartnerProductTable) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - partnerProducts.length) : 0;

  const isNotFound = !partnerProducts.length && !!filterName;

  const debounceValue = useDebounce(filterName, 500);

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        itemsPerPage: rowsPerPage,
        currentPage: page + 1,
        searchValue: debounceValue,
        sortBy: `${orderBy}_${order}`,
      },
      navigate,
    };
  }, [page, rowsPerPage, debounceValue, orderBy, order]);

  useEffect(() => {
    dispatch<any>(getAllPartnerProducts(params));
  }, [params]);

  return (
    <>
      <Page
        containerWidth="xl"
        title={translate('page.title.list', { model: translate('model.lowercase.partnerProduct') })}
        pathname={pathname}
        navigateDashboard={PATH_BRAND_APP.root}
        actions={() => [
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={() => {
              navigate(PATH_BRAND_APP.product.newProduct);
              dispatch(setRoutesToBack(pathname));
              dispatch(setAddProduct());
              dispatch(getProductEmpty());
            }}
          >
            {translate('button.add', { model: translate('model.lowercase.product') })}
          </Button>,
        ]}
      >
        <Card>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <PartnerProductTableToolbar filterName={filterName} onFilterName={handleFilterByName} />
              <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                  <CommonTableHead<PartnerProductTable>
                    showAction
                    headCells={partnerProductHeadCells}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                  />
                  {isLoading ? (
                    <PartnerProductTableRowSkeleton length={partnerProducts.length} />
                  ) : (
                    <TableBody>
                      {partnerProducts?.map((partnerProduct, index) => {
                        return (
                          <PartnerProductTableRow
                            key={partnerProduct.productId}
                            setPage={setPage}
                            page={page + 1}
                            rowsPerPage={rowsPerPage}
                            length={partnerProducts.length}
                            index={index}
                            partnerProduct={partnerProduct}
                          />
                        );
                      })}
                      {emptyRows > 0 ||
                        (partnerProducts.length === 0 && !filterName && (
                          <EmptyTable
                            colNumber={partnerProductHeadCells.length + 2}
                            model={translate('model.lowercase.product')}
                          />
                        ))}
                    </TableBody>
                  )}
                  {isNotFound && (
                    <SearchNotFound colNumber={partnerProductHeadCells.length + 2} searchQuery={filterName} />
                  )}
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

export default ListPartnerProductPage;
