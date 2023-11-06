import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet as ReactHelmet } from 'react-helmet-async';
// @mui
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
  MenuItem,
  Container,
  Popover as MUIPopover,
  IconButton,
  TableContainer,
  Table,
  TableBody,
  TablePagination,
  TableHead,
  TableCell,
  TableRow,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CheckIcon from '@mui/icons-material/Check';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
// section
import { OrderDetailPageSkeleton, OrderHistoryTableRow, OrderHistoryTableRowSkeleton, OrderItem } from 'sections/order';
import ConfirmCompletedOrderModal from 'sections/order/ConfirmCompletedOrderModal';
//redux
import { useAppSelector } from 'redux/configStore';
import { useDispatch } from 'react-redux';
import { changeOrderToReadyDelivery, getOrderDetail } from 'redux/order/orderSlice';
//
import { Color, PartnerOrderStatus, Role, SystemStatus } from 'common/enum';
import { ConfirmDialog, EmptyTable, Label } from 'components';
import { useConfigHeadTable, useLocales, useModal, usePagination, usePopover } from 'hooks';
import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';
import { OrderHistory, OrderStatusActions } from '@types';
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
  const { handleOpen: handleOpenConfirmCompleted, isOpen: isOpenConfirmCompleted } = useModal();
  const { handleOpen: handleOpenModalReadyDelivery, isOpen: isOpenModalConfirmReadyDelivery } = useModal();
  const { orderHistoryHeadCells } = useConfigHeadTable();
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const [status, setStatus] = useState<string>(OrderStatusActions.COMPLETED);

  const { userAuth } = useAppSelector((state) => state.auth);
  const { order, isLoading: isLoadingOrder } = useAppSelector((state) => state.order);

  const orderHistories: OrderHistory[] = order?.orderHistories as OrderHistory[];

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orderHistories?.length) : 0;

  const paramsDetails = useMemo(() => {
    return {
      orderId,
      navigate,
    };
  }, [orderId, navigate]);

  useEffect(() => {
    dispatch<any>(getOrderDetail(paramsDetails));
  }, [paramsDetails, dispatch]);

  const handleOrderReadyDelivery = () => {
    dispatch<any>(
      changeOrderToReadyDelivery({
        orderId,
        navigate,
      })
    );
  };

  return (
    <>
      <Box>
        <ReactHelmet>
          <title>Order Detail | MBKC</title>
        </ReactHelmet>

        <Container maxWidth="lg">
          {isLoadingOrder ? (
            <OrderDetailPageSkeleton />
          ) : (
            <Box>
              <Stack mb={4} direction="row" justifyContent="space-between">
                <Stack>
                  <Stack direction="row" alignItems="center">
                    <IconButton onClick={() => navigate(PATH_KITCHEN_CENTER_APP.order.list)}>
                      <KeyboardArrowLeftOutlinedIcon fontSize="medium" color="disabled" />
                    </IconButton>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="h4">
                        {translate('model.capitalizeOne.order')} #{order?.orderPartnerId} | {order?.partner.name}
                      </Typography>
                      <Label
                        color={
                          order?.partnerOrderStatus === PartnerOrderStatus.COMPLETED
                            ? Color.SUCCESS
                            : order?.partnerOrderStatus === PartnerOrderStatus.CANCELLED
                            ? Color.ERROR
                            : Color.DEFAULT
                        }
                      >
                        {order?.partnerOrderStatus === PartnerOrderStatus.READY
                          ? translate('status.ready')
                          : order?.partnerOrderStatus === PartnerOrderStatus.UPCOMING
                          ? translate('status.upcoming')
                          : order?.partnerOrderStatus === PartnerOrderStatus.PREPARING
                          ? translate('status.preparing')
                          : order?.partnerOrderStatus === PartnerOrderStatus.COMPLETED
                          ? translate('status.completed')
                          : translate('status.cancelled')}
                      </Label>
                      <Label
                        color={
                          order?.systemStatus === SystemStatus.COMPLETED
                            ? Color.SUCCESS
                            : order?.systemStatus === SystemStatus.CANCELLED
                            ? Color.ERROR
                            : Color.DEFAULT
                        }
                      >
                        {order?.systemStatus === SystemStatus.IN_STORE
                          ? translate('status.inStore')
                          : order?.systemStatus === SystemStatus.READY_DELIVERY
                          ? translate('status.readyDelivery')
                          : order?.systemStatus === SystemStatus.COMPLETED
                          ? translate('status.completed')
                          : translate('status.cancelled')}
                      </Label>
                    </Stack>
                  </Stack>
                  <Typography color={(theme) => theme.palette.grey[700]}></Typography>
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
                        width: 180,
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
                    <Box sx={{ width: '100%' }} padding={2} paddingTop={2}>
                      <Paper sx={{ width: '100%', mb: 2 }}>
                        <Stack direction="row" alignItems="center" mb={1}>
                          <Typography variant="subtitle1" mr={1}>
                            {translate('table.store')}
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
                            {translate('page.content.note')}:
                          </Typography>
                          <Typography variant="body1">{order?.note}</Typography>
                        </Stack>

                        <Stack>
                          <Stack direction="row" justifyContent="flex-end" alignItems="center" textAlign="right" mt={1}>
                            <Typography variant="body2" sx={{ color: '#919EAB;' }}>
                              {translate('page.content.subTotalPrice')}
                            </Typography>
                            <Typography width={100} variant="body2">
                              {formatCurrency(order?.subTotalPrice as number)}
                            </Typography>
                          </Stack>

                          <Stack direction="row" justifyContent="flex-end" alignItems="center" textAlign="right" mt={1}>
                            <Typography variant="body2" sx={{ color: '#919EAB;' }}>
                              {translate('page.content.deliveryFee')}
                            </Typography>
                            <Typography width={100} variant="body2">
                              {formatCurrency(order?.deliveryFee as number)}
                            </Typography>
                          </Stack>

                          <Stack direction="row" justifyContent="flex-end" alignItems="center" textAlign="right" mt={1}>
                            <Typography variant="body2" sx={{ color: '#919EAB;' }}>
                              {translate('page.content.totalDiscount')}
                            </Typography>
                            <Typography width={100} variant="body2">
                              {formatCurrency(order?.totalDiscount as number)}
                            </Typography>
                          </Stack>
                          <Stack direction="row" justifyContent="flex-end" alignItems="center" textAlign="right" mt={1}>
                            <Typography variant="subtitle1">{translate('page.content.finalTotalPrice')}</Typography>
                            <Typography width={100} variant="subtitle2">
                              {formatCurrency(order?.finalTotalPrice as number)}
                            </Typography>
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
                            <Typography variant="subtitle1">{translate('page.content.customer')}</Typography>
                            <Stack direction="row" alignItems="center" spacing={2} mt={2} mb={2}>
                              <Stack direction="row" spacing={1} mt={1} alignItems="center">
                                <Typography color={(theme) => theme.palette.grey[500]}>
                                  {translate('table.name')}:
                                </Typography>
                                <Typography variant="body2">{order?.shipperName}</Typography>
                              </Stack>
                            </Stack>
                          </Stack>
                          <Divider />

                          <Stack>
                            <Typography variant="subtitle1" mt={2}>
                              {translate('page.content.delivery')}
                            </Typography>
                            <Stack direction="row" spacing={1} mt={1} alignItems="center">
                              <Typography color={(theme) => theme.palette.grey[500]}>
                                {translate('page.content.shipperName')}:
                              </Typography>
                              <Typography variant="body2">{order?.shipperName}</Typography>
                            </Stack>

                            <Stack direction="row" alignItems="center" spacing={1} mt={1} mb={2}>
                              <Typography color={(theme) => theme.palette.grey[500]}>
                                {translate('page.content.shipperPhone')}:
                              </Typography>
                              <Typography variant="body2">{order?.shipperPhone}</Typography>
                            </Stack>
                          </Stack>
                          <Divider />

                          <Stack>
                            <Typography variant="subtitle1" mt={2}>
                              {translate('page.content.shipping')}
                            </Typography>
                            <Stack direction="row" spacing={1} mt={1}>
                              <Typography sx={{ color: '#919EAB;' }} width={70}>
                                {translate('table.address')}:
                              </Typography>
                              <Typography variant="body2">{order?.address}</Typography>
                            </Stack>

                            <Stack direction="row" alignItems="center" spacing={1} mt={1} mb={2}>
                              <Typography sx={{ color: '#919EAB;' }}>{translate('model.capitalize.phone')}:</Typography>
                              <Typography variant="body2">{order?.customerPhone}</Typography>
                            </Stack>
                          </Stack>
                          <Divider />

                          <Typography variant="subtitle2" mt={2}>
                            {translate('page.content.payment')}
                          </Typography>
                          <Stack rowGap={2} mt={1}>
                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                              <Typography>{translate('page.content.paidBy')}</Typography>
                              <Label color={Color.INFO}>{order?.paymentMethod}</Label>
                            </Stack>
                          </Stack>
                        </Paper>
                      </Box>
                    </Card>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          )}

          <Box mt={4}>
            <Card>
              <Box sx={{ width: '100%' }} padding={2}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                  <Stack direction="row" justifyContent="space-between" p={1}>
                    <Typography variant="subtitle1" mb={2}>
                      {translate('model.capitalizeOne.orderHistories')}
                    </Typography>
                  </Stack>

                  <TableContainer>
                    <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                      <TableHead>
                        <TableRow>
                          <TableCell>{translate('table.no')}</TableCell>
                          <TableCell>{translate('table.createdDate')}</TableCell>
                          <TableCell>{translate('table.partnerOrderStatus')}</TableCell>
                          <TableCell>{translate('table.systemStatus')}</TableCell>
                        </TableRow>
                      </TableHead>

                      {isLoadingOrder ? (
                        <OrderHistoryTableRowSkeleton
                          length={orderHistories?.length !== 0 ? orderHistories?.length : 1}
                        />
                      ) : (
                        <TableBody>
                          {orderHistories &&
                            orderHistories.map((orderHistory, index) => {
                              return (
                                <OrderHistoryTableRow
                                  key={orderHistory.orderHistoryId}
                                  index={index}
                                  orderHistory={orderHistory}
                                  page={page}
                                  rowsPerPage={rowsPerPage}
                                  selected={[]}
                                />
                              );
                            })}
                          {emptyRows > 0 ||
                            (orderHistories?.length === 0 && (
                              <EmptyTable
                                colNumber={orderHistoryHeadCells.length + 2}
                                model={translate('model.lowercase.orderHistories')}
                              />
                            ))}
                        </TableBody>
                      )}
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={orderHistories?.length}
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
            width: 180,
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
            setStatus(OrderStatusActions.READY_DELIVERY);
            handleOpenModalReadyDelivery(OrderStatusActions.READY_DELIVERY);
          }}
        >
          <DeliveryDiningIcon fontSize="small" sx={{ mr: 2 }} />
          {translate('status.readyDelivery')}
        </MenuItem>

        <MenuItem
          onClick={() => {
            setStatus(OrderStatusActions.COMPLETED);
            handleOpenConfirmCompleted(OrderStatusActions.COMPLETED);
          }}
        >
          <CheckIcon fontSize="small" sx={{ mr: 2 }} />
          {translate('status.completed')}
        </MenuItem>
      </MUIPopover>

      {isOpenModalConfirmReadyDelivery && (
        <ConfirmDialog
          open={isOpenModalConfirmReadyDelivery}
          onClose={handleOpenModalReadyDelivery}
          onAction={handleOrderReadyDelivery}
          isOrder
          model={order?.orderPartnerId}
          subModel={translate('model.lowercase.readyToDelivery')}
          color={Color.SUCCESS}
          title={translate('dialog.confirmOrderReadyDeliveryTitle', { model: translate('model.lowercase.order') })}
          description={translate('dialog.confirmOrderReadyDeliveryContent')}
        />
      )}

      {isOpenConfirmCompleted && (
        <ConfirmCompletedOrderModal
          isOpen={isOpenConfirmCompleted}
          handleOpen={handleOpenConfirmCompleted}
          page={page}
          rowsPerPage={rowsPerPage}
        />
      )}
    </>
  );
}

export default OrderDetailPage;
