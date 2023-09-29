/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import {
  Box,
  Button,
  Card,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@mui/material';
// @mui icon
import AddRoundedIcon from '@mui/icons-material/AddRounded';
//
import { ListParams, OrderSort, Store, StoreTable } from '@types';
import { Role } from 'common/enum';
import { CommonTableHead, Page, SearchNotFound } from 'components';
import { useConfigHeadTable, useDebounce, useLocales, usePagination } from 'hooks';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { getAllStores, setAddStore } from 'redux/store/storeSlice';
import { PATH_ADMIN_APP, PATH_BRAND_APP } from 'routes/paths';
import { StoreTableRow, StoreTableRowSkeleton, StoreTableToolbar } from 'sections/store';
import { getComparator, stableSort } from 'utils';
import { Typography } from '@mui/material';

// ----------------------------------------------------------------------

function ListStorePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { translate } = useLocales();
  const { pathname } = useLocation();
  const { storeHeadCells } = useConfigHeadTable();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const { stores, numberItems, isLoading } = useAppSelector((state) => state.store);
  const { userAuth } = useAppSelector((state) => state.auth);

  console.log(stores);

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

  const isNotFound = !visibleRows.length && !!filterName;

  const debounceValue = useDebounce(filterName, 500);

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        itemsPerPage: rowsPerPage,
        currentPage: page + 1,
        searchValue: debounceValue,
      },
      navigate,
    };
  }, [page, rowsPerPage, debounceValue]);

  useEffect(() => {
    dispatch(getAllStores(params));
  }, [params]);

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
                      navigate(PATH_ADMIN_APP.store.newStore);
                      dispatch(setAddStore());
                    }}
                    startIcon={<AddRoundedIcon />}
                  >
                    {translate('button.add', { model: translate('model.lowercase.store') })}
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
                    showAction={userAuth?.roleName === Role.MBKC_ADMIN}
                    headCells={storeHeadCells}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                  />
                  {isLoading ? (
                    <StoreTableRowSkeleton haveBrand haveKitchenCenter length={visibleRows.length} />
                  ) : (
                    <TableBody>
                      {visibleRows.map((store, index) => {
                        return (
                          <StoreTableRow
                            key={store.storeId}
                            index={index}
                            store={store}
                            haveBrand
                            haveKitchenCenter
                            length={visibleRows.length}
                            showAction={userAuth?.roleName === Role.MBKC_ADMIN}
                          />
                        );
                      })}
                      {emptyRows > 0 && (
                        <TableRow>
                          <TableCell colSpan={storeHeadCells.length + 2} height={365}>
                            <Stack direction="column" alignItems="center" gap={2}>
                              <img src="/assets/illustrations/illustration_empty_content.svg" alt="empty" />
                              <Typography variant="h6">{translate('page.content.empty')}</Typography>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      )}
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
