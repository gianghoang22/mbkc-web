import { Helmet as ReactHelmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import ReplayIcon from '@mui/icons-material/Replay';
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  IconButton,
  Popover as MUIPopover,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Tooltip,
  Typography,
} from '@mui/material';
// section
import { OrderHistoryTableRow, OrderItem } from 'sections/order';
//
import { OrderHistoryTable, OrderSort, OrderStatusActions } from '@types';
import { Color, Role } from 'common/enum';
import { CustomTableHead, EmptyTable, Label, SearchNotFound } from 'components';
import { useConfigHeadTable, useLocales, useModal, usePagination, usePopover } from 'hooks';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'redux/configStore';
import { getOrderDetail } from 'redux/order/orderSlice';
import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';
import { formatCurrency } from 'utils';

function OrderDetailPage() {
  const { translate } = useLocales();
  const { id: orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    open: openConfirm,
    handleOpenMenu: handleOpenMenuConfirm,
    handleCloseMenu: handleCloseMenuConfirm,
  } = usePopover();
  const { handleOpen: handleOpenConfirm, isOpen: isOpenConfirm } = useModal();
  const { orderHistoryHeadCells } = useConfigHeadTable();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const [status, setStatus] = useState<string>(OrderStatusActions.COMPLETED);
  const [orderSort, setOrderSort] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof OrderHistoryTable>('createdDate');
  const [filterName, setFilterName] = useState<string>('');
  const [selected, setSelected] = useState<readonly string[]>([]);

  const { userAuth } = useAppSelector((state) => state.auth);
  const { order } = useAppSelector((state) => state.order);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof OrderHistoryTable) => {
    const isAsc = orderBy === property && orderSort === 'asc';
    setOrderSort(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value.trimStart());
  };

  const handleReloadData = () => {};

  const orderHistories = [
    {
      orderHistoryId: 1,
      image: '',
      createdDate: '2023-11-03T00:00:00',
      systemStatus: 'IN_STORE',
      partnerOrderStatus: 'PREPARING',
    },
  ];

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orderHistories.length) : 0;

  const isNotFound = !orderHistories.length && !!filterName;

  const paramsDetails = useMemo(() => {
    return {
      orderId,
      navigate,
    };
  }, [orderId, navigate]);

  useEffect(() => {
    dispatch<any>(getOrderDetail(paramsDetails));
  }, [paramsDetails, dispatch]);

  return (
    <>
      <Box>
        <ReactHelmet>
          <title>Order Detail | MBKC</title>
        </ReactHelmet>

        <Container maxWidth="lg">
          <Stack mb={4} direction="row" justifyContent="space-between">
            <Stack direction="row" alignItems="center">
              <IconButton onClick={() => navigate(PATH_KITCHEN_CENTER_APP.order.list)}>
                <KeyboardArrowLeftOutlinedIcon fontSize="medium" color="disabled" />
              </IconButton>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="h4">
                  Order #{order?.orderPartnerId} | {order?.partner.name}
                </Typography>
                <Label color={Color.PRIMARY}>{order?.partnerOrderStatus}</Label>
                <Label>{order?.systemStatus}</Label>
              </Stack>
            </Stack>

            {userAuth?.roleName === Role.CASHIER && (
              <Stack>
                <Button
                  color="inherit"
                  endIcon={<KeyboardArrowDownIcon />}
                  style={{
                    backgroundColor: '#fff',
                    color: '#000',
                    border: '1px solid rgba(145, 158, 171, 0.32)',
                    paddingLeft: 12,
                    paddingRight: 12,
                    width: 142,
                  }}
                  onClick={handleOpenMenuConfirm}
                >
                  {translate('button.menuAction')}
                </Button>
              </Stack>
            )}
          </Stack>
          <Grid container columnSpacing={5} rowSpacing={5}>
            <Grid item xs={12} sm={12} md={8}>
              <Card>
                <Box sx={{ width: '100%' }} padding={2} paddingTop={2} minHeight={460}>
                  <Paper sx={{ width: '100%', mb: 2 }}>
                    <Stack alignContent="space-between">
                      <Stack direction="row" alignItems="center" mb={1}>
                        <Typography variant="subtitle1" mr={1}>
                          Store:
                        </Typography>
                        <Typography variant="body1">{order?.store.name}</Typography>
                      </Stack>

                      {order?.orderDetails.map((order) => {
                        return (
                          <OrderItem
                            paddingTop={2}
                            divider
                            logoUrl={order.product.image}
                            name={order.product.name}
                            category={order.product.categoryName}
                            quantity={order.quantity}
                            price={order.product.sellingPrice}
                            noteContent={order.note}
                            note
                          />
                        );
                      })}

                      <Stack direction="row" alignItems="center" mt={1} mb={1}>
                        <Typography variant="subtitle1" mr={1}>
                          Note:
                        </Typography>
                        <Typography variant="body1">{order?.note}</Typography>
                      </Stack>

                      <Stack>
                        <Stack direction="row" justifyContent="flex-end" alignItems="center" textAlign="right" mt={1}>
                          <Typography variant="body2" sx={{ color: '#919EAB;' }}>
                            Sub total price
                          </Typography>
                          <Typography width={100} variant="body2">
                            {formatCurrency(order?.subTotalPrice as number)}
                          </Typography>
                        </Stack>

                        <Stack direction="row" justifyContent="flex-end" alignItems="center" textAlign="right" mt={1}>
                          <Typography variant="body2" sx={{ color: '#919EAB;' }}>
                            Delivery fee
                          </Typography>
                          <Typography width={100} variant="body2">
                            {formatCurrency(order?.deliveryFee as number)}
                          </Typography>
                        </Stack>

                        <Stack direction="row" justifyContent="flex-end" alignItems="center" textAlign="right" mt={1}>
                          <Typography variant="body2" sx={{ color: '#919EAB;' }}>
                            Total discount
                          </Typography>
                          <Typography width={100} variant="body2">
                            {formatCurrency(order?.totalDiscount as number)}
                          </Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="flex-end" alignItems="center" textAlign="right" mt={1}>
                          <Typography variant="subtitle1">Final total price</Typography>
                          <Typography width={100} variant="subtitle2">
                            {formatCurrency(order?.finalTotalPrice as number)}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Paper>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Stack gap={3}>
                <Card>
                  <Box sx={{ width: '100%' }} padding={2} minHeight={460}>
                    <Paper sx={{ width: '100%', mb: 2 }}>
                      <Stack>
                        <Typography variant="subtitle1">Customer</Typography>
                        <Stack direction="row" alignItems="center" spacing={2} mt={2} mb={2}>
                          <Stack direction="row" spacing={1} mt={1} alignItems="center">
                            <Typography color={(theme) => theme.palette.grey[500]}>Name:</Typography>
                            <Typography variant="body2">{order?.shipperName}</Typography>
                          </Stack>
                        </Stack>
                      </Stack>
                      <Divider />

                      <Stack>
                        <Typography variant="subtitle1" mt={2}>
                          Delivery
                        </Typography>
                        <Stack direction="row" spacing={1.5} mt={1} alignItems="center">
                          <Typography color={(theme) => theme.palette.grey[500]}>Shipper name:</Typography>
                          <Typography variant="body2">{order?.shipperName}</Typography>
                        </Stack>

                        <Stack direction="row" alignItems="center" spacing={1} mt={1} mb={2}>
                          <Typography color={(theme) => theme.palette.grey[500]}>Shipper phone:</Typography>
                          <Typography variant="body2">{order?.shipperPhone}</Typography>
                        </Stack>
                      </Stack>
                      <Divider />

                      <Stack>
                        <Typography variant="subtitle1" mt={2}>
                          Shipping
                        </Typography>
                        <Stack direction="row" spacing={2} mt={1}>
                          <Typography sx={{ color: '#919EAB;' }}>Address:</Typography>
                          <Typography variant="body2">{order?.address}</Typography>
                        </Stack>

                        <Stack direction="row" alignItems="center" spacing={3.5} mt={1} mb={2}>
                          <Typography sx={{ color: '#919EAB;' }}>Phone:</Typography>
                          <Typography variant="body2">{order?.customerPhone}</Typography>
                        </Stack>
                      </Stack>
                      <Divider />

                      <Typography variant="subtitle2" mt={2}>
                        Payment
                      </Typography>
                      <Stack rowGap={2} mt={1}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                          <Typography>Paid py</Typography>
                          <Label color={Color.INFO}>{order?.paymentMethod}</Label>
                        </Stack>
                      </Stack>
                    </Paper>
                  </Box>
                </Card>
              </Stack>
            </Grid>
          </Grid>

          <Box mt={4}>
            <Card>
              <Box sx={{ width: '100%' }} padding={2}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                  <Stack direction="row" justifyContent="space-between" p={1}>
                    <Typography variant="subtitle1" mb={2}>
                      Order history
                    </Typography>
                    <Tooltip title={translate('button.reload')}>
                      <IconButton onClick={handleReloadData}>
                        <ReplayIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>

                  <TableContainer>
                    <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                      <CustomTableHead<OrderHistoryTable>
                        showAction
                        headCells={orderHistoryHeadCells}
                        order={orderSort}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        selectedCol={selected}
                      />

                      <TableBody>
                        {orderHistories.map((orderHistory, index) => {
                          return (
                            <OrderHistoryTableRow
                              key={orderHistory.orderHistoryId}
                              index={index}
                              orderHistory={orderHistory}
                              page={page}
                              rowsPerPage={rowsPerPage}
                              selected={selected}
                            />
                          );
                        })}
                        {emptyRows > 0 ||
                          (orderHistories.length === 0 && !filterName && (
                            <EmptyTable
                              colNumber={orderHistoryHeadCells.length + 2}
                              model={translate('model.lowercase.orders')}
                            />
                          ))}
                      </TableBody>

                      {isNotFound && (
                        <SearchNotFound colNumber={orderHistoryHeadCells.length + 2} searchQuery={filterName} />
                      )}
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={orderHistories.length}
                    rowsPerPage={rowsPerPage}
                    labelRowsPerPage={translate('table.rowsPerPage')}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Paper>
              </Box>
            </Card>
          </Box>
        </Container>
      </Box>

      <MUIPopover
        open={Boolean(openConfirm)}
        anchorEl={openConfirm}
        onClose={handleCloseMenuConfirm}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            mt: 0.5,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem
          onClick={() => {
            setStatus(OrderStatusActions.COMPLETED);
            handleOpenConfirm(OrderStatusActions.COMPLETED);
          }}
        >
          <CheckIcon fontSize="small" sx={{ mr: 2 }} />
          {translate('orderType.completed')}
        </MenuItem>

        <MenuItem
          sx={{ color: 'error.main' }}
          onClick={() => {
            setStatus(OrderStatusActions.CANCEL);
            handleOpenConfirm(OrderStatusActions.CANCEL);
          }}
        >
          <ClearIcon fontSize="small" sx={{ mr: 2 }} />
          {translate('button.cancel')}
        </MenuItem>
      </MUIPopover>
    </>
  );
}

export default OrderDetailPage;
