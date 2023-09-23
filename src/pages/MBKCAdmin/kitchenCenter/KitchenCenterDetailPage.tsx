import React, { useMemo, useState } from 'react';
import { useLocation } from 'react-router';
//
import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  IconButton,
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
import { useNavigate } from 'react-router-dom';
import { PATH_ADMIN_APP } from 'routes/paths';

// @mui
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { MenuItem, Popover as MUIPopover } from '@mui/material';

// @mui icon
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { useAppSelector } from 'redux/configStore';
import { KitchenTable, OrderSort } from '@types';
import { Color, PopoverType } from 'common/enum';
import { CommonTableHead, ConfirmDialog, Label, Page, Popover, SearchNotFound } from 'components';
import { useConfigHeadTable, useModal, usePopover } from 'hooks';
import { KitchenTableRow, KitchenTableToolbar } from 'sections/kitchen';
import { getComparator, stableSort } from 'utils';

function KitchenCenterDetailPage(props: any) {
  const { pathname } = useLocation();
  const { kitchenHeadCells } = useConfigHeadTable();
  const { handleOpen: handleOpenModal, isOpen: isOpenModal } = useModal();
  const { open: openPopover, handleOpenMenu, handleCloseMenu } = usePopover();

  const { kitchenCenter } = useAppSelector((state) => state.kitchenCenter);

  const navigate = useNavigate();

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof KitchenTable>('kitchenName');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterName, setFilterName] = useState<string>('');

  const { kitchens } = useAppSelector((state) => state.kitchen);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof KitchenTable) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // const handleNavigateDetail = (kitchen: Kitchen, kitchenCenterId: number) => {
  //   navigate(PATH_ADMIN_APP.kitchenCenter.root + `/detail/${kitchenCenterId}`);
  //   dispatch(getKitchenCenterDetail(kitchenCenter));
  // };

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
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - kitchens.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(kitchens, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, kitchens]
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
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={(theme) => ({
                px: 3,
                py: 0.5,
                bgcolor: theme.palette.grey[200],
              })}
            >
              <Stack direction="row" alignItems="center" gap={0.5}>
                <Typography variant="h6">General information</Typography>
              </Stack>
              <IconButton onClick={() => navigate(PATH_ADMIN_APP.kitchenCenter.editById)}>
                <EditRoundedIcon />
              </IconButton>
            </Stack>
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
        </Stack>

        <Stack spacing={1}>
          <Stack direction="row" alignItems="center" gap={0.5}>
            <Typography variant="h6">Kitchens in Kitchen Center</Typography>
          </Stack>

          <Card sx={{ marginTop: 2 }}>
            <Box sx={{ width: '100%' }}>
              <Paper sx={{ width: '100%', mb: 2 }}>
                <KitchenTableToolbar filterName={filterName} onFilterName={handleFilterByName} />
                <TableContainer>
                  <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                    <CommonTableHead<KitchenTable>
                      headCells={kitchenHeadCells}
                      order={order}
                      orderBy={orderBy}
                      onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                      {visibleRows.map((kitchen, index) => {
                        return (
                          <KitchenTableRow
                            index={index}
                            kitchen={kitchen}
                            // handleNavigateDetail={handleNavigateDetail}
                          />
                        );
                      })}
                      {emptyRows > 0 && (
                        <TableRow
                          style={{
                            height: 53 * emptyRows,
                          }}
                        >
                          <TableCell colSpan={kitchenHeadCells.length} />
                        </TableRow>
                      )}
                    </TableBody>
                    {isNotFound && <SearchNotFound colNumber={kitchenHeadCells.length} searchQuery={filterName} />}
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={kitchens.length}
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
        type={PopoverType.DELETE}
        open={openPopover}
        handleCloseMenu={handleCloseMenu}
        onDelete={handleOpenModal}
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
