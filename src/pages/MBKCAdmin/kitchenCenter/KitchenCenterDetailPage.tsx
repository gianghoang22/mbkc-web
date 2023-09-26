import React, { useMemo, useState } from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
//
import { OrderSort, Store, StoreTable } from '@types';
import { Color, PopoverType } from 'common/enum';
import { CommonTableHead, ConfirmDialog, Label, Page, Popover, SearchNotFound } from 'components';
import { useConfigHeadTable, useModal, usePopover } from 'hooks';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { setEditKitchenCenter } from 'redux/kitchenCenter/kitchenCenterSlice';
import { getStoreDetail_local } from 'redux/store/storeSlice';
import { PATH_ADMIN_APP, PATH_BRAND_APP } from 'routes/paths';
import { StoreTableRow, StoreTableToolbar } from 'sections/store';
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
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';

// @mui icon
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function KitchenCenterDetailPage(props: any) {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { handleOpen: handleOpenModal, isOpen: isOpenModal } = useModal();
  const { open: openPopover, handleOpenMenu, handleCloseMenu } = usePopover();
  const { storeHeadCells } = useConfigHeadTable();

  const { kitchenCenter } = useAppSelector((state) => state.kitchenCenter);
  const { stores } = useAppSelector((state) => state.store);

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof StoreTable>('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterName, setFilterName] = useState<string>('');

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof StoreTable) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleNavigateDetail = (store: Store, accountId: number) => {
    navigate(PATH_BRAND_APP.store.root + `/detail/${accountId}`);
    dispatch(getStoreDetail_local(store));
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
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - stores.length) : 0;

  const visibleRows = useMemo(
    () => stableSort(stores, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, stores]
  );

  const isNotFound = !visibleRows.length && !!filterName;

  const handleDelete = () => {
    console.log('Handel delete clicked');
  };

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
          <Card>
            <Stack sx={{ px: 3, py: 3 }}>
              <Grid container columnSpacing={2} alignItems="center">
                <Grid item md={3} sm={12}>
                  <Stack width="100%" alignItems="center">
                    <Avatar src={kitchenCenter?.imageUrl} alt={kitchenCenter?.title} sx={{ width: 150, height: 150 }} />
                  </Stack>
                </Grid>
                <Grid item md={9} sm={12}>
                  <Stack gap={1}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Stack direction="row" alignItems="center" gap={0.5}>
                        {/* <Typography variant="body1">{kitchenCenter?.title}</Typography> */}
                        <Typography variant="h6">Kitchen Center DK #1</Typography>
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
                    <TableBody>
                      {visibleRows.map((store, index) => {
                        return (
                          <StoreTableRow
                            showAction={false}
                            key={store.storeId}
                            index={index}
                            haveKitchenCenter={false}
                            haveBrand={true}
                            store={store}
                            handleNavigateDetail={handleNavigateDetail}
                          />
                        );
                      })}
                      {emptyRows > 0 && (
                        <TableRow
                          style={{
                            height: 53 * emptyRows,
                          }}
                        >
                          <TableCell colSpan={storeHeadCells.length} />
                        </TableRow>
                      )}
                    </TableBody>
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
          title={'Confirm Delete Kitchen Center'}
          description={'Are you sure to delete this kitchen center?'}
        />
      )}
    </>
  );
}

export default KitchenCenterDetailPage;
