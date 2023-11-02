import { useNavigate } from 'react-router-dom';
import { Helmet as ReactHelmet } from 'react-helmet-async';
// @mui
import {
  Avatar,
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
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
// section
import { OrderItem, OrderTimeline } from 'sections/order';
//
import { Color, Role } from 'common/enum';
import { Label } from 'components';
import { useLocales, useModal, usePopover } from 'hooks';
import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';
import { useState } from 'react';
import { OrderStatusActions } from '@types';
import { useAppSelector } from 'redux/configStore';

function OrderDetailPage() {
  const { translate } = useLocales();
  const navigate = useNavigate();
  const {
    open: openConfirm,
    handleOpenMenu: handleOpenMenuConfirm,
    handleCloseMenu: handleCloseMenuConfirm,
  } = usePopover();

  const [status, setStatus] = useState<string>(OrderStatusActions.COMPLETED);
  const { handleOpen: handleOpenConfirm, isOpen: isOpenConfirm } = useModal();

  const { userAuth } = useAppSelector((state) => state.auth);

  return (
    <>
      <Box>
        <ReactHelmet>
          <title>Order Detail | MBKC</title>
        </ReactHelmet>

        <Container maxWidth="lg">
          <Stack mb={4} direction="row" justifyContent="space-between">
            <Stack direction="column">
              <Stack direction="row" alignItems="center">
                <IconButton onClick={() => navigate(PATH_KITCHEN_CENTER_APP.order.list)}>
                  <KeyboardArrowLeftOutlinedIcon fontSize="medium" color="disabled" />
                </IconButton>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="h4">Order #MBKC289</Typography>
                  <Label color={Color.WARNING}>Being Prepared</Label>
                </Stack>
              </Stack>
              <Typography variant="body2" sx={{ color: '#919EAB' }} ml={5}>
                5 October 2023 10:00AM
              </Typography>
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
            <Grid item xs={12} sm={8} md={8}>
              <Card>
                <Box sx={{ width: '100%' }} padding={2} paddingTop={2}>
                  <Paper sx={{ width: '100%', mb: 2 }}>
                    <Stack direction="row" alignItems="center" mt={2} mb={1}>
                      <Typography variant="subtitle1" mr={1}>
                        Kitchen:
                      </Typography>
                      <Typography variant="body1">Cooking kitchen space #1</Typography>
                    </Stack>
                    <OrderItem
                      paddingTop={2}
                      haveKitchen={false}
                      divider
                      logoUrl="/assets/images/kitchen/burger.png"
                      name="Hamburger recipes KFC #1"
                      category="Food"
                      quantity={1}
                      price="45.000"
                      note
                      noteContent="Do not take tomatoes"
                    />

                    <OrderItem
                      paddingTop={2}
                      haveKitchen={false}
                      divider
                      logoUrl="/assets/images/kitchen/burger.png"
                      name="Hamburger recipes KFC #1"
                      category="Food"
                      quantity={1}
                      price="45.000"
                      note
                      noteContent="Do not take tomatoes"
                    />

                    <OrderItem
                      paddingTop={2}
                      haveKitchen={false}
                      logoUrl="/assets/images/kitchen/burger.png"
                      name="Hamburger recipes KFC #1"
                      category="Food"
                      quantity={1}
                      price="45.000"
                      note
                      noteContent="Do not take tomatoes"
                    />
                  </Paper>

                  <Stack>
                    <Stack direction="row" spacing={10} alignItems="center" justifyContent="flex-end">
                      <Typography variant="body2" sx={{ color: '#919EAB;' }}>
                        SubTotal
                      </Typography>
                      <Typography variant="body2">180.000 đ</Typography>
                    </Stack>
                    <Stack direction="row" spacing={10} alignItems="center" justifyContent="flex-end" mt={1}>
                      <Typography variant="body2" sx={{ color: '#919EAB;' }}>
                        Discount
                      </Typography>
                      <Typography variant="body2"> -10.000 đ</Typography>
                    </Stack>
                    <Stack direction="row" spacing={10} alignItems="center" justifyContent="flex-end" mt={1}>
                      <Typography variant="subtitle1">Total</Typography>
                      <Typography variant="subtitle2">170.000 đ</Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <Stack gap={3}>
                <Card>
                  <Box sx={{ width: '100%' }} padding={2}>
                    <Paper sx={{ width: '100%', mb: 2 }}>
                      <Typography variant="subtitle1">Customer Information</Typography>
                      <Stack direction="row" alignItems="center" spacing={2} mt={2} mb={2}>
                        <Avatar alt={'Product Image'} src="/assets/images/avatars/avatar_2.jpg" />
                        <Stack direction="column">
                          <Typography variant="body2" noWrap>
                            Le Xuan Back
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#919EAB;' }} noWrap>
                            lexuanback@gmail.com
                          </Typography>
                        </Stack>
                      </Stack>
                      <Divider />

                      <Typography variant="subtitle2" mt={2}>
                        Shipping
                      </Typography>
                      <Stack direction="row" spacing={2} mt={1}>
                        <Typography sx={{ color: '#919EAB;' }}>Address:</Typography>
                        <Typography variant="body2">Chung cư Hausneo, phường Phú Hưng, Quận 9, TP.HCM</Typography>
                      </Stack>

                      <Stack direction="row" alignItems="center" spacing={3.5} mt={1} mb={2}>
                        <Typography sx={{ color: '#919EAB;' }}>Phone:</Typography>
                        <Typography variant="body2">0982856649</Typography>
                      </Stack>
                      <Divider />

                      <Typography variant="subtitle2" mt={2}>
                        Payment
                      </Typography>
                      <Stack rowGap={2} mt={2}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                          <Typography>Status</Typography>
                          <Label color={Color.ERROR}>No paid</Label>
                        </Stack>

                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                          <Typography>Paid py</Typography>
                          <Label color={Color.INFO}>Online</Label>
                        </Stack>
                      </Stack>
                    </Paper>
                  </Box>
                </Card>

                <Card>
                  <Box sx={{ width: '100%' }} padding={2}>
                    <Paper sx={{ width: '100%', mb: 2 }}>
                      <Typography variant="subtitle1">Order timeline</Typography>
                      <OrderTimeline />
                    </Paper>
                  </Box>
                </Card>
              </Stack>
            </Grid>
          </Grid>
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
