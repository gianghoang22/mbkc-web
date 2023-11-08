import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
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
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import PaymentsIcon from '@mui/icons-material/Payments';
// section
import { OrderDetailPageSkeleton, OrderHistoryTableRow, OrderHistoryTableRowSkeleton, OrderItem } from 'sections/order';
import { CreateShipperPaymentModal } from 'sections/shipperPayment';
//redux
import { changeOrderToReadyDelivery, getOrderDetail } from 'redux/order/orderSlice';
import { useAppSelector, useAppDispatch } from 'redux/configStore';
//
import { OrderHistory, OrderStatusActions } from '@types';
import { Color, PartnerOrderStatus, PaymentMethod, Role, SystemStatus } from 'common/enum';
import { ConfirmDialog, EmptyTable, Helmet, Label } from 'components';
import { useConfigHeadTable, useLocales, useModal, usePagination, usePopover } from 'hooks';
import { PATH_CASHIER_APP, PATH_KITCHEN_CENTER_APP } from 'routes/paths';
import { formatCurrency } from 'utils';

function OrderDetailPage() {
  const { id: orderId } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { translate } = useLocales();
  const {
    open: openConfirm,
    handleOpenMenu: handleOpenMenuConfirm,
    handleCloseMenu: handleCloseMenuConfirm,
  } = usePopover();
  const { orderHistoryHeadCells } = useConfigHeadTable();
  const { page, rowsPerPage } = usePagination();
  const { handleOpen: handleOpenCreateShipperPaymentModal, isOpen: isOpenCreateShipperPaymentModal } = useModal();
  const { handleOpen: handleOpenModalReadyDelivery, isOpen: isOpenModalConfirmReadyDelivery } = useModal();

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
        <Helmet title="Order Detail" />
        <Container maxWidth="lg">
          {isLoadingOrder ? (
            <OrderDetailPageSkeleton />
          ) : (
            <Box>
              <Stack mb={7} direction="row" justifyContent="space-between">
                <Stack>
                  <Stack direction="row" alignItems="center">
                    <IconButton
                      onClick={
                        userAuth?.roleName === Role.KITCHEN_CENTER_MANAGER
                          ? () => navigate(PATH_KITCHEN_CENTER_APP.order.list)
                          : () => navigate(PATH_CASHIER_APP.order.list)
                      }
                    >
                      <KeyboardArrowLeftOutlinedIcon fontSize="medium" color="disabled" />
                    </IconButton>
                    <Stack direction="row" alignItems="center" gap={1}>
                      <Typography variant="h4">
                        {translate('model.capitalizeOne.order')} #{order?.orderPartnerId} | {order?.partner.name} |
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
                      <Stack> - </Stack>
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
                      variant="outlined"
                      endIcon={<KeyboardArrowDownIcon />}
                      sx={{ width: 180 }}
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
                    <Box sx={{ width: '100%' }} p={2} pt={2}>
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
                              key={order.product.productId}
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

                        <Typography variant="subtitle1" mt={1} mb={1}>
                          {translate('page.content.note')}:{' '}
                          <Typography variant="body1" component="span">
                            {order?.note}
                          </Typography>
                        </Typography>

                        <Stack>
                          <Stack direction="row" justifyContent="flex-end" alignItems="center" textAlign="right" mt={1}>
                            <Typography variant="body2" sx={{ color: (theme) => theme.palette.grey[500] }}>
                              {translate('page.content.subTotalPrice')}
                            </Typography>
                            <Typography width={100} variant="body2">
                              {formatCurrency(order?.subTotalPrice as number)}
                            </Typography>
                          </Stack>

                          <Stack direction="row" justifyContent="flex-end" alignItems="center" textAlign="right" mt={1}>
                            <Typography variant="body2" sx={{ color: (theme) => theme.palette.grey[500] }}>
                              {translate('page.content.deliveryFee')}
                            </Typography>
                            <Typography width={100} variant="body2">
                              {formatCurrency(order?.deliveryFee as number)}
                            </Typography>
                          </Stack>

                          <Stack direction="row" justifyContent="flex-end" alignItems="center" textAlign="right" mt={1}>
                            <Typography variant="body2" sx={{ color: (theme) => theme.palette.grey[500] }}>
                              {translate('page.content.totalDiscount')}
                            </Typography>
                            <Typography width={100} variant="body2">
                              {formatCurrency(order?.totalDiscount as number)}
                            </Typography>
                          </Stack>
                          <Stack direction="row" justifyContent="flex-end" alignItems="center" textAlign="right" mt={1}>
                            <Typography variant="subtitle2">{translate('page.content.finalTotalPrice')}</Typography>
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
                                <Typography variant="body2" color={(theme) => theme.palette.grey[500]}>
                                  {translate('table.name')}:
                                </Typography>
                                <Typography variant="body2">{order?.customerName}</Typography>
                              </Stack>
                            </Stack>
                          </Stack>
                          <Divider />
                          <Stack>
                            <Typography variant="subtitle1" mt={2}>
                              {translate('page.content.delivery')}
                            </Typography>
                            <Stack direction="row" spacing={1} mt={1} alignItems="center">
                              <Typography variant="body2" color={(theme) => theme.palette.grey[500]}>
                                {translate('page.content.shipperName')}:
                              </Typography>
                              <Typography variant="body2">{order?.shipperName}</Typography>
                            </Stack>

                            <Stack direction="row" alignItems="center" spacing={1} mt={1} mb={2}>
                              <Typography variant="body2" color={(theme) => theme.palette.grey[500]}>
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
                              <Typography variant="body2" sx={{ color: (theme) => theme.palette.grey[500] }} width={60}>
                                {translate('table.address')}:
                              </Typography>
                              <Typography variant="body2">{order?.address}</Typography>
                            </Stack>

                            <Stack direction="row" alignItems="center" spacing={1} mt={1} mb={2}>
                              <Typography variant="body2" sx={{ color: (theme) => theme.palette.grey[500] }}>
                                {translate('model.capitalize.phone')}:
                              </Typography>
                              <Typography variant="body2">{order?.customerPhone}</Typography>
                            </Stack>
                          </Stack>

                          <Divider />

                          <Typography variant="subtitle1" mt={2}>
                            {translate('page.content.payment')}
                          </Typography>
                          <Stack rowGap={2} mt={1} mb={2}>
                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                              <Typography variant="body2" sx={{ color: (theme) => theme.palette.grey[500] }}>
                                {translate('page.content.paidBy')}
                              </Typography>
                              <Label color={Color.PRIMARY}>
                                {order?.paymentMethod === PaymentMethod.CASH
                                  ? translate('page.content.cash')
                                  : translate('page.content.cashless')}
                              </Label>
                            </Stack>
                          </Stack>

                          <Divider />

                          <Stack direction="row" justifyContent="flex-end" mt={3}>
                            <Button
                              onClick={() => {
                                handleOpenCreateShipperPaymentModal(OrderStatusActions.COMPLETED);
                              }}
                              variant="outlined"
                              startIcon={<PaymentsIcon />}
                            >
                              {translate('page.title.create', { model: translate('model.lowercase.shipperPayment') })}
                            </Button>
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
          disabled={
            order?.systemStatus === SystemStatus.IN_STORE && order?.partnerOrderStatus === PartnerOrderStatus.READY
              ? false
              : true
          }
          onClick={() => {
            handleOpenModalReadyDelivery(OrderStatusActions.READY_DELIVERY);
          }}
        >
          <DeliveryDiningIcon fontSize="small" sx={{ mr: 2 }} />
          {translate('status.readyDelivery')}
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

      {isOpenCreateShipperPaymentModal && (
        <CreateShipperPaymentModal
          isOpen={isOpenCreateShipperPaymentModal}
          handleOpen={handleOpenCreateShipperPaymentModal}
          page={page}
          rowsPerPage={rowsPerPage}
          paymentMethod={order?.paymentMethod as string}
          partnerOrderId={order?.partner.partnerId as number}
        />
      )}
    </>
  );
}

export default OrderDetailPage;
