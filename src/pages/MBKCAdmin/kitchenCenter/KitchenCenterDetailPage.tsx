/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Typography,
} from '@mui/material';
// @mui icon
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import {
  getKitchenCenterDetail,
  setEditKitchenCenter,
  setKitchenCenterToNull,
} from 'redux/kitchenCenter/kitchenCenterSlice';
import { getAllStores } from 'redux/store/storeSlice';
import { setRoutesToBack } from 'redux/routes/routesSlice';
//
import { ListParams, OrderSort, StoreTable } from '@types';
import { Color, Status } from 'common/enum';
import { CommonTableHead, ConfirmDialog, EmptyTable, Label, Page, Popover, SearchNotFound } from 'components';
import { useConfigHeadTable, useDebounce, useLocales, useModal, usePagination, usePopover } from 'hooks';
import { PATH_ADMIN_APP } from 'routes/paths';
import { StoreTableRow, StoreTableRowSkeleton, StoreTableToolbar } from 'sections/store';
import { getComparator, stableSort } from 'utils';
import { KitchenCenterDetailPageSkeleton } from '..';
import axios from 'axios';

function KitchenCenterDetailPage() {
  const { id: kitchenCenterId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { storeHeadCells } = useConfigHeadTable();
  const { translate } = useLocales();
  const { handleOpen: handleOpenModal, isOpen: isOpenModal } = useModal();
  const { open: openPopover, handleOpenMenu, handleCloseMenu } = usePopover();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const { kitchenCenter, isLoading } = useAppSelector((state) => state.kitchenCenter);
  const { stores, isLoading: isLoadingStores, numberItems } = useAppSelector((state) => state.store);

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
    () => stableSort(stores, getComparator(order, orderBy)),
    [order, orderBy, page, rowsPerPage, stores]
  );

  const isNotFound = !visibleRows.length && !!filterName;

  const handleDelete = () => {
    console.log('Handel delete clicked');
  };

  const debounceValue = useDebounce(filterName, 500);

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        itemsPerPage: rowsPerPage,
        currentPage: page + 1,
        searchValue: debounceValue,
        idKitchenCenter: kitchenCenterId,
      },
      navigate,
    };
  }, [page, rowsPerPage, debounceValue]);

  const paramsDetails = useMemo(() => {
    return {
      kitchenCenterId,
      navigate,
    };
  }, [kitchenCenterId, navigate]);

  useEffect(() => {
    dispatch<any>(getKitchenCenterDetail(paramsDetails));
    dispatch<any>(getAllStores(params));

    return () => {
      dispatch(setKitchenCenterToNull());
    };
  }, [params]);

  return (
    <>
      <Page
        title={translate('page.title.detail', {
          model: translate('model.lowercase.kitchenCenter'),
        })}
        pathname={pathname}
        navigateDashboard={PATH_ADMIN_APP.root}
        actions={() => [
          <Button
            color="inherit"
            onClick={handleOpenMenu}
            endIcon={<KeyboardArrowDownIcon />}
            style={{
              backgroundColor: '#000',
              color: '#fff',
            }}
            sx={{
              '.css-1dat9h6-MuiButtonBase-root-MuiButton-root:hover': {
                backgroundColor: 'rgba(145, 158, 171, 0.08)',
              },
            }}
          >
            {translate('button.menuAction')}
          </Button>,
        ]}
      >
        <Stack spacing={5} mb={7} width="100%">
          {isLoading ? (
            <KitchenCenterDetailPageSkeleton />
          ) : (
            <Card>
              <Stack sx={{ px: 3, py: 3 }}>
                <Grid container columnSpacing={2} alignItems="center">
                  <Grid item md={3} sm={12}>
                    <Stack width="100%" alignItems="center">
                      <Avatar src={kitchenCenter?.logo} alt={kitchenCenter?.name} sx={{ width: 150, height: 150 }} />
                    </Stack>
                  </Grid>
                  <Grid item md={9} sm={12}>
                    <Stack gap={1}>
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Stack direction="row" alignItems="center" gap={0.5}>
                          <Typography variant="h6">{kitchenCenter?.name}</Typography>
                        </Stack>
                        <Label color={(kitchenCenter?.status === Status.INACTIVE && Color.ERROR) || Color.SUCCESS}>
                          {kitchenCenter?.status === Status.INACTIVE
                            ? translate('status.inactive')
                            : translate('status.active')}
                        </Label>
                      </Stack>

                      <Stack direction="row" alignItems="center" justifyContent="space-between" gap={0.5}>
                        <Typography variant="subtitle1">{translate('table.address')}:</Typography>
                        <Typography variant="body1">{kitchenCenter?.address}</Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              </Stack>
            </Card>
          )}

          <Card>
            <Box sx={{ width: '100%' }}>
              <Paper sx={{ width: '100%', mb: 2 }}>
                <StoreTableToolbar filterName={filterName} onFilterName={handleFilterByName} />
                <TableContainer>
                  <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                    <CommonTableHead<StoreTable>
                      hideKitchenCenter
                      headCells={storeHeadCells}
                      order={order}
                      orderBy={orderBy}
                      onRequestSort={handleRequestSort}
                    />
                    {isLoadingStores ? (
                      <StoreTableRowSkeleton showEmail haveBrand={true} length={visibleRows.length} />
                    ) : (
                      <TableBody>
                        {visibleRows.map((store, index) => {
                          return (
                            <StoreTableRow
                              key={store.storeId}
                              store={store}
                              showAction={false}
                              index={index}
                              length={visibleRows.length}
                              haveBrand={true}
                              showEmail
                            />
                          );
                        })}
                        {emptyRows > 0 ||
                          (stores.length === 0 && !filterName && (
                            <EmptyTable colNumber={storeHeadCells.length} model={translate('model.lowercase.store')} />
                          ))}
                      </TableBody>
                    )}
                    {isNotFound && <SearchNotFound colNumber={storeHeadCells.length} searchQuery={filterName} />}
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={numberItems}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </Box>
          </Card>
        </Stack>
      </Page>

      <Popover
        open={openPopover}
        handleCloseMenu={handleCloseMenu}
        onDelete={handleOpenModal}
        onEdit={() => {
          navigate(PATH_ADMIN_APP.kitchenCenter.root + `/update/${kitchenCenterId}`);
          dispatch(setEditKitchenCenter(kitchenCenter));
          dispatch(setRoutesToBack(pathname));
        }}
      />

      {isOpenModal && (
        <ConfirmDialog
          open={isOpenModal}
          onAction={handleDelete}
          onClose={handleOpenModal}
          title={translate('dialog.confirmDeleteTitle', { model: translate('model.lowercase.kitchenCenter') })}
          description={translate('dialog.confirmDeleteContent', {
            model: translate('model.lowercase.kitchenCenter'),
          })}
        />
      )}
    </>
  );
}

export default KitchenCenterDetailPage;
