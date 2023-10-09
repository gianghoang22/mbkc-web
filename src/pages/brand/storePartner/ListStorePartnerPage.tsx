/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Box, Button, Card, Paper, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
// @mui icon
import AddRoundedIcon from '@mui/icons-material/AddRounded';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { setRoutesToBack } from 'redux/routes/routesSlice';
import { getAllStorePartners, setAddStorePartner } from 'redux/storePartner/storePartnerSlice';
//
import { ListParams, OrderSort, StorePartnerTable } from '@types';
import { CommonTableHead, EmptyTable, Page, SearchNotFound } from 'components';
import { useConfigHeadTable, useDebounce, useLocales, usePagination } from 'hooks';
import { PATH_BRAND_APP } from 'routes/paths';
import { StoreTableToolbar } from 'sections/store';
import { StorePartnerTableRow, StorePartnerTableRowSkeleton } from 'sections/storePartner';
import { getComparator, stableSort } from 'utils';

function ListStorePartnerPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { storePartnerHeadCells } = useConfigHeadTable();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const { userAuth } = useAppSelector((state) => state.auth);
  const { storePartners, numberItems, isLoading } = useAppSelector((state) => state.storePartner);

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof StorePartnerTable>('storeName');
  const [filterName, setFilterName] = useState<string>('');

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof StorePartnerTable) => {
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

  const visibleRows = useMemo(
    () => stableSort(storePartners, getComparator(order, orderBy)),
    [order, orderBy, storePartners]
  );

  const isNotFound = !visibleRows.length && !!filterName;

  const debounceValue = useDebounce(filterName, 500);

  const paramsBrandRole: ListParams = useMemo(() => {
    return {
      optionParams: {
        itemsPerPage: rowsPerPage,
        currentPage: page + 1,
        searchName: debounceValue,
      },
      navigate,
    };
  }, [page, rowsPerPage, debounceValue]);

  useEffect(() => {
    dispatch<any>(getAllStorePartners(paramsBrandRole));
  }, [paramsBrandRole]);

  return (
    <>
      <Page
        pathname={pathname}
        title={translate('page.title.list', { model: translate('model.lowercase.storePartner') })}
        navigateDashboard={PATH_BRAND_APP.root}
        actions={() => [
          <Button
            variant="contained"
            onClick={() => {
              navigate(PATH_BRAND_APP.storePartner.newStorePartner);
              dispatch(setRoutesToBack(pathname));
              dispatch(setAddStorePartner());
            }}
            startIcon={<AddRoundedIcon />}
          >
            {translate('button.add', { model: translate('model.lowercase.storePartner') })}
          </Button>,
        ]}
      >
        <Card>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <StoreTableToolbar filterName={filterName} onFilterName={handleFilterByName} />
              <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                  <CommonTableHead<StorePartnerTable>
                    showAction
                    headCells={storePartnerHeadCells}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                  />
                  {isLoading ? (
                    <StorePartnerTableRowSkeleton />
                  ) : (
                    <TableBody>
                      {visibleRows.map((storePartner, index) => {
                        return (
                          <StorePartnerTableRow
                            key={storePartner.partnerId}
                            index={index}
                            storePartner={storePartner}
                          />
                        );
                      })}
                      {emptyRows > 0 ||
                        (storePartners.length === 0 && !filterName && (
                          <EmptyTable
                            colNumber={storePartnerHeadCells.length + 2}
                            model={translate('model.lowercase.storePartner')}
                          />
                        ))}
                    </TableBody>
                  )}

                  {isNotFound && (
                    <SearchNotFound colNumber={storePartnerHeadCells.length + 2} searchQuery={filterName} />
                  )}
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

export default ListStorePartnerPage;
