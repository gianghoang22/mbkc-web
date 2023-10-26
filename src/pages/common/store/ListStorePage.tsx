/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Box, Button, Card, Paper, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
// @mui icon
import AddRoundedIcon from '@mui/icons-material/AddRounded';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { setRoutesToBack } from 'redux/routes/routesSlice';
import { getAllStores, setAddStore } from 'redux/store/storeSlice';
// section
import { StoreTableRow, StoreTableRowSkeleton, StoreTableToolbar } from 'sections/store';
//
import { ListParams, OrderSort, OrderSortBy, StoreTable } from '@types';
import { Role } from 'common/enum';
import { CommonTableHead, EmptyTable, Page, SearchNotFound } from 'components';
import { useConfigHeadTable, useDebounce, useLocales, usePagination } from 'hooks';
import { PATH_ADMIN_APP, PATH_BRAND_APP } from 'routes/paths';
import { getComparator, stableSort } from 'utils';

// ----------------------------------------------------------------------

function ListStorePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { translate } = useLocales();
  const { pathname } = useLocation();
  const { storeHeadCells } = useConfigHeadTable();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const { userAuth } = useAppSelector((state) => state.auth);
  const { brandProfile } = useAppSelector((state) => state.profile);
  const { stores, numberItems, isLoading } = useAppSelector((state) => state.store);

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof StoreTable>(OrderSortBy.NAME);
  const [filterName, setFilterName] = useState<string>('');
  const [storeStatus, setStoreStatus] = useState<string>('');

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
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - numberItems) : 0;

  const visibleRows = useMemo(() => stableSort(stores, getComparator(order, orderBy)), [order, orderBy, stores]);

  const isNotFound = !visibleRows.length && !!filterName;

  const debounceValue = useDebounce(filterName, 500);

  const paramsAdminRole: ListParams = useMemo(() => {
    return {
      optionParams: {
        itemsPerPage: rowsPerPage,
        currentPage: page + 1,
        searchValue: debounceValue,
        status: storeStatus,
      },
      navigate,
    };
  }, [page, rowsPerPage, debounceValue, storeStatus]);

  const paramsBrandRole: ListParams = useMemo(() => {
    return {
      optionParams: {
        itemsPerPage: rowsPerPage,
        currentPage: page + 1,
        searchValue: debounceValue,
        status: storeStatus,
        idBrand: brandProfile?.brandId,
      },
      navigate,
    };
  }, [page, rowsPerPage, debounceValue, storeStatus]);

  useEffect(() => {
    if (userAuth?.roleName === Role.MBKC_ADMIN) {
      dispatch<any>(getAllStores(paramsAdminRole));
    } else {
      dispatch<any>(getAllStores(paramsBrandRole));
    }
  }, [paramsAdminRole, paramsBrandRole]);

  return (
    <>
      <Page
        pathname={pathname}
        title={translate('page.title.list', { model: translate('model.lowercase.stores') })}
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
              <StoreTableToolbar
                haveSelectStatus
                filterName={filterName}
                onFilterName={handleFilterByName}
                status={storeStatus}
                setStatus={setStoreStatus}
              />
              <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                  <CommonTableHead<StoreTable>
                    hideEmail={userAuth?.roleName === Role.MBKC_ADMIN}
                    showAction={userAuth?.roleName === Role.MBKC_ADMIN || userAuth?.roleName === Role.BRAND_MANAGER}
                    hideBrand={userAuth?.roleName === Role.BRAND_MANAGER}
                    hideKitchenCenter={userAuth?.roleName === Role.KITCHEN_CENTER_MANAGER}
                    headCells={storeHeadCells}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                  />
                  {isLoading ? (
                    <StoreTableRowSkeleton
                      showAction={userAuth?.roleName === Role.MBKC_ADMIN || userAuth?.roleName === Role.BRAND_MANAGER}
                      length={visibleRows.length}
                      haveBrand={
                        userAuth?.roleName === Role.MBKC_ADMIN || userAuth?.roleName === Role.KITCHEN_CENTER_MANAGER
                      }
                      haveKitchenCenter={
                        userAuth?.roleName === Role.MBKC_ADMIN || userAuth?.roleName === Role.BRAND_MANAGER
                      }
                      showEmail={
                        userAuth?.roleName === Role.BRAND_MANAGER || userAuth?.roleName === Role.KITCHEN_CENTER_MANAGER
                      }
                    />
                  ) : (
                    <TableBody>
                      {visibleRows.map((store, index) => {
                        return (
                          <StoreTableRow
                            key={store.storeId}
                            index={index}
                            store={store}
                            setPage={setPage}
                            page={page + 1}
                            rowsPerPage={rowsPerPage}
                            length={visibleRows.length}
                            haveBrand={
                              userAuth?.roleName === Role.MBKC_ADMIN ||
                              userAuth?.roleName === Role.KITCHEN_CENTER_MANAGER
                            }
                            haveKitchenCenter={
                              userAuth?.roleName === Role.MBKC_ADMIN || userAuth?.roleName === Role.BRAND_MANAGER
                            }
                            showAction={
                              userAuth?.roleName === Role.MBKC_ADMIN || userAuth?.roleName === Role.BRAND_MANAGER
                            }
                            showEmail={
                              userAuth?.roleName === Role.BRAND_MANAGER ||
                              userAuth?.roleName === Role.KITCHEN_CENTER_MANAGER
                            }
                          />
                        );
                      })}
                      {emptyRows > 0 ||
                        (stores.length === 0 && !filterName && (
                          <EmptyTable
                            colNumber={storeHeadCells.length + 2}
                            model={translate('model.lowercase.store')}
                          />
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
                labelRowsPerPage={translate('table.rowsPerPage')}
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
