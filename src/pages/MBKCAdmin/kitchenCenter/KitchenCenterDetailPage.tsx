import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumbs, Helmet, Label } from 'components';
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { PATH_ADMIN_APP } from 'routes/paths';
import usePopover from 'hooks/usePopover';

// @mui
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { MenuItem, Popover as MUIPopover } from '@mui/material';

// @mui icon
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { useAppSelector } from 'redux/configStore';
import { Color } from 'common/enum';
import { KitchenTableHead, KitchenTableRow, KitchenTableToolbar } from 'sections/kitchen';
import { Table } from '@mui/material';
import { KitchenTable, OrderSort } from '@types';
import { getComparator, stableSort } from 'utils';
import { kitchenHeadCells } from '../headCells';

function KitchenCenterDetailPage(props: any) {
  const { pathname } = useLocation();
  const { open: openPopover, handleOpenMenu, handleCloseMenu } = usePopover();
  const { kitchenCenter } = useAppSelector((state) => state.kitchenCenter);
  const [open, setOpen] = useState(false);
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Helmet title="Kitchen Center Detail | MBKC" />

      <Container>
        <Stack mb={7}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h4">Kitchen Center Detail</Typography>
            <Button
              color="inherit"
              onClick={handleOpenMenu}
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
              <KeyboardArrowDownIcon />
            </Button>
            <MUIPopover
              open={Boolean(openPopover)}
              anchorEl={openPopover}
              onClose={handleCloseMenu}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              PaperProps={{
                sx: {
                  p: 1,
                  width: 140,
                  '& .MuiMenuItem-root': {
                    px: 1,
                    typography: 'body2',
                  },
                },
              }}
            >
              <MenuItem sx={{ color: 'error.main' }}>
                <Button onClick={handleClickOpen}>
                  <DeleteRoundedIcon fontSize="small" sx={{ mr: 2 }} />
                  Delete
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">Are you sure to delete this kitchen center?</DialogTitle>
                  <DialogActions>
                    <Button onClick={handleClose} style={{ color: '#2196F3' }}>
                      Cancel
                    </Button>
                    <Button onClick={handleClose} autoFocus>
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
              </MenuItem>
            </MUIPopover>
          </Stack>
          <Breadcrumbs pathname={pathname} navigateDashboard={PATH_ADMIN_APP.root} />
        </Stack>

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
              <Grid container columnSpacing={2}>
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

                    <Stack direction="row" alignItems="center" justifyContent="space-between" gap={0.5}>
                      <Typography variant="subtitle1">Number of Kitchens:</Typography>
                      <Typography variant="body1">{kitchenCenter?.numberOfKitchens}</Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" justifyContent="space-between" gap={0.5}>
                      <Typography variant="subtitle1">Manager:</Typography>
                      <Typography variant="body1">Vo Khai Hung</Typography>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </Card>
        </Stack>

        <Stack spacing={1}>
          <Stack direction="row" alignItems="center" gap={0.5}>
            <Typography
              variant="h6"
              style={{
                paddingLeft: '24px',
              }}
            >
              Kitchens in Kitchen Center
            </Typography>
          </Stack>

          <Card sx={{ marginTop: 2 }}>
            <Box sx={{ width: '100%' }}>
              <Paper sx={{ width: '100%', mb: 2 }}>
                <KitchenTableToolbar filterName={filterName} onFilterName={handleFilterByName} />
                <TableContainer>
                  <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                    <KitchenTableHead
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
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                    {isNotFound && (
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" colSpan={9} sx={{ py: 3 }}>
                            <Paper
                              sx={{
                                textAlign: 'center',
                              }}
                            >
                              <Typography variant="h6" paragraph>
                                Not found
                              </Typography>

                              <Typography variant="body2">
                                No results found for &nbsp;
                                <strong>&quot;{filterName}&quot;</strong>.
                                <br /> Try checking for typos or using complete words.
                              </Typography>
                            </Paper>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
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
      </Container>
    </>
  );
}

KitchenCenterDetailPage.propTypes = {};

export default KitchenCenterDetailPage;
