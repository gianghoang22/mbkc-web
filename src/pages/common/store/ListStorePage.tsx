/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Box, Button, Card, Paper, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
// @mui icon
import AddRoundedIcon from '@mui/icons-material/AddRounded';
//
import { ListParams, OrderSort, Store, StoreTable } from '@types';
import { Role } from 'common/enum';
import { CommonTableHead, EmptyTable, Page, SearchNotFound } from 'components';
import { useConfigHeadTable, useDebounce, useLocales, usePagination } from 'hooks';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { getAllStores, setAddStore } from 'redux/store/storeSlice';
import { PATH_ADMIN_APP, PATH_BRAND_APP } from 'routes/paths';
import { StoreTableRow, StoreTableRowSkeleton, StoreTableToolbar } from 'sections/store';
import { getComparator, stableSort } from 'utils';
import { setRoutesToBack } from 'redux/routes/routesSlice';

// ----------------------------------------------------------------------

function ListStorePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { translate } = useLocales();
  const { pathname } = useLocation();
  const { storeHeadCells } = useConfigHeadTable();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const { userAuth } = useAppSelector((state) => state.auth);
  const { stores, numberItems, isLoading } = useAppSelector((state) => state.store);

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof StoreTable>('name');
  const [filterName, setFilterName] = useState<string>('');

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof StoreTable) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - stores.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort<Store>(stores, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, stores]
  );

  console.log(page);
  console.log(rowsPerPage);
  console.log(visibleRows);

  const isNotFound = !visibleRows.length && !!filterName;

  const debounceValue = useDebounce(filterName, 500);

  const paramsAdminRole: ListParams = useMemo(() => {
    return {
      optionParams: {
        itemsPerPage: rowsPerPage,
        currentPage: page + 1,
        searchValue: debounceValue,
      },
      navigate,
    };
  }, [page, rowsPerPage, debounceValue]);

  const paramsBrandRole: ListParams = useMemo(() => {
    return {
      optionParams: {
        itemsPerPage: rowsPerPage,
        currentPage: page + 1,
        searchValue: debounceValue,
        idBrand: 1, // Must edit to fix brand login
      },
      navigate,
    };
  }, [page, rowsPerPage, debounceValue]);

  useEffect(() => {
    dispatch<any>(getAllStores(userAuth?.roleName === Role.MBKC_ADMIN ? paramsAdminRole : paramsBrandRole));
  }, [paramsAdminRole, paramsBrandRole]);

  return (
    <>
      <Page
        pathname={pathname}
        title={translate('page.title.list', { model: translate('model.lowercase.store') })}
        navigateDashboard={userAuth?.roleName === Role.BRAND_MANAGER ? PATH_BRAND_APP.root : PATH_ADMIN_APP.root}
        actions={() => {
          const listAction: ReactNode[] =
            userAuth?.roleName === Role.BRAND_MANAGER
              ? [
                  <Button
                    variant="contained"
                    onClick={() => {
                      navigate(PATH_BRAND_APP.store.newStore);
                      dispatch(setRoutesToBack(pathname));
                      dispatch(setAddStore());
                    }}
                    startIcon={<AddRoundedIcon />}
                  >
                    {translate('button.register', { model: translate('model.lowercase.store') })}
                  </Button>,
                ]
              : [];
          return listAction;
        }}
      >
        <Card>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <StoreTableToolbar filterName={filterName} onFilterName={handleFilterByName} />
              <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                  <CommonTableHead<StoreTable>
                    hideEmail={userAuth?.roleName === Role.MBKC_ADMIN}
                    showAction={userAuth?.roleName === Role.MBKC_ADMIN || userAuth?.roleName === Role.BRAND_MANAGER}
                    hideBrand={userAuth?.roleName === Role.BRAND_MANAGER}
                    headCells={storeHeadCells}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                  />
                  {isLoading ? (
                    <StoreTableRowSkeleton
                      length={visibleRows.length}
                      haveBrand={userAuth?.roleName === Role.MBKC_ADMIN}
                      haveKitchenCenter={
                        userAuth?.roleName === Role.MBKC_ADMIN || userAuth?.roleName === Role.BRAND_MANAGER
                      }
                      showEmail={userAuth?.roleName === Role.BRAND_MANAGER}
                    />
                  ) : (
                    <TableBody>
                      {visibleRows.map((store, index) => {
                        return (
                          <StoreTableRow
                            key={store.storeId}
                            index={index}
                            store={store}
                            page={page + 1}
                            rowsPerPage={rowsPerPage}
                            length={visibleRows.length}
                            haveBrand={userAuth?.roleName === Role.MBKC_ADMIN}
                            haveKitchenCenter={
                              userAuth?.roleName === Role.MBKC_ADMIN || userAuth?.roleName === Role.BRAND_MANAGER
                            }
                            showAction={
                              userAuth?.roleName === Role.MBKC_ADMIN || userAuth?.roleName === Role.BRAND_MANAGER
                            }
                            showEmail={userAuth?.roleName === Role.BRAND_MANAGER}
                          />
                        );
                      })}
                      {emptyRows > 0 ||
                        (stores.length === 0 && (
                          <EmptyTable colNumber={storeHeadCells.length} model={translate('model.lowercase.store')} />
                        ))}
                    </TableBody>
                  )}

                  {isNotFound && <SearchNotFound colNumber={storeHeadCells.length + 2} searchQuery={filterName} />}
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={numberItems}
                page={page}
                rowsPerPage={rowsPerPage}
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

export default ListStorePage;
