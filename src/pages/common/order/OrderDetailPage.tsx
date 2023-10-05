import { useLocation } from 'react-router-dom';

//
import { Label, Page } from 'components';
import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';

// mui
import {
  Box,
  Card,
  Grid,
  Stack,
  Typography,
  Avatar,
  Divider,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
} from '@mui/material';
import { Color } from 'common/enum';
import { Paper } from '@mui/material';
import { OrderItem, OrderKitchenHead } from 'sections/order';
import { useState } from 'react';
import { useLocales } from 'hooks';

const steps = [
  {
    label: 'Order is ready',
    description: '12 Aug 2023 8:25 AM',
  },
  {
    label: 'Order is being Prepared',
    description: '12 Aug 2023 8:25 AM',
  },
  {
    label: 'Waiting for goods',
    description: '12 Aug 2023 8:25 AM',
  },
  {
    label: 'Delevery successful',
    description: '12 Aug 2023 8:25 AM',
  },
];

function OrderDetailPage() {
  const { pathname } = useLocation();
  const [activeStep, setActiveStep] = useState(0);
  const { translate } = useLocales();

  return (
    <>
      <Page title="Order Detail" pathname={pathname} navigateDashboard={PATH_KITCHEN_CENTER_APP.root}>
        <Stack mb={2}>
          <Stack direction="row" spacing={1}>
            <Typography variant="h6">Order #MBKC289</Typography>
            <Label color={Color.WARNING}>Being Prepared</Label>
          </Stack>
          <Typography variant="caption" sx={{ color: '#919EAB' }}>
            5 October 2023 10:00AM
          </Typography>
        </Stack>
        <Grid container columnSpacing={5} rowSpacing={5}>
          <Grid item xs={12} sm={8} md={8}>
            <Card>
              <Box sx={{ width: '100%' }} padding={2} paddingTop={2}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                  <OrderKitchenHead name="Cooking kitchen space #1" status="Completed" color={Color.SUCCESS} />
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

                  <OrderKitchenHead
                    name="Cooking kitchen space #2"
                    status="Waiting for goods"
                    color={Color.WARNING}
                    marginTop={5}
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

                    <Stepper activeStep={activeStep} orientation="vertical">
                      {steps.map((step, index) => (
                        <Step key={step.label}>
                          <StepLabel>{step.label}</StepLabel>
                          <StepContent>
                            <Typography
                              sx={{
                                color: '#919EAB',
                              }}
                              variant="caption"
                            >
                              {step.description}
                            </Typography>
                          </StepContent>
                        </Step>
                      ))}
                    </Stepper>
                  </Paper>
                </Box>
              </Card>
            </Stack>
          </Grid>
        </Grid>
        <Button variant="outlined" color="inherit">
          {translate('button.back')}
        </Button>
      </Page>
    </>
  );
}

export default OrderDetailPage;
