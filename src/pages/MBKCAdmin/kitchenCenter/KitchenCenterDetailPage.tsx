/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';
import { useNavigate, useParams } from 'react-router-dom';
//
import { ListParams, OrderSort, StoreTable } from '@types';
import { Color, PopoverType } from 'common/enum';
import { CommonTableHead, ConfirmDialog, EmptyTable, Label, Page, Popover, SearchNotFound } from 'components';
import { useConfigHeadTable, useDebounce, useLocales, useModal, usePagination, usePopover } from 'hooks';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { setEditKitchenCenter } from 'redux/kitchenCenter/kitchenCenterSlice';
import { PATH_ADMIN_APP } from 'routes/paths';
import { StoreTableRow, StoreTableRowSkeleton, StoreTableToolbar } from 'sections/store';
import { getComparator, stableSort } from 'utils';
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
import { getAllStores } from 'redux/store/storeSlice';
import { KitchenCenterDetailPageSkeleton } from '..';

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
  const { stores, isLoading: isLoadingStores } = useAppSelector((state) => state.store);

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
    () => stableSort(stores, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
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
        idKitchenCenter: kitchenCenterId, // Must edit to fix brand login
      },
      navigate,
    };
  }, [page, rowsPerPage, debounceValue]);

  useEffect(() => {
    dispatch<any>(getAllStores(params));
  }, [params]);

  return (
    <>
      <Page
        title="Kitchen Center Detail"
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
              width: 140,
              height: 32,
            }}
            sx={{
              '.css-1dat9h6-MuiButtonBase-root-MuiButton-root:hover': {
                backgroundColor: 'rgba(145, 158, 171, 0.08)',
              },
            }}
          >
            <Typography>Menu Actions</Typography>
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
                          {/* <Typography variant="body1">{kitchenCenter?.title}</Typography> */}
                          <Typography variant="h6">{kitchenCenter?.name}</Typography>
                        </Stack>
                        <Label color={(kitchenCenter?.status === 'inactive' && Color.ERROR) || Color.SUCCESS}>
                          {kitchenCenter?.status}
                        </Label>
                      </Stack>

                      <Stack direction="row" alignItems="center" justifyContent="space-between" gap={0.5}>
                        <Typography variant="subtitle1">Address:</Typography>
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
                  count={stores.length}
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
        type={PopoverType.ALL}
        open={openPopover}
        handleCloseMenu={handleCloseMenu}
        onDelete={handleOpenModal}
        onEdit={() => {
          navigate(PATH_ADMIN_APP.kitchenCenter.newKitchenCenter);
          dispatch(setEditKitchenCenter(kitchenCenter));
        }}
      />

      {isOpenModal && (
        <ConfirmDialog
          open={isOpenModal}
          onClose={handleOpenModal}
          onAction={handleDelete}
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
