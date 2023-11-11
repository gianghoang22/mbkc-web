import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Box, Card, Paper, Stack, Typography, Avatar, Button } from '@mui/material';
// redux
import { sendMoneyToKitchenCenter } from 'redux/wallet/walletSlice';
import { useAppSelector } from 'redux/configStore';
//
import { PATH_CASHIER_APP } from 'routes/paths';
import { useLocales } from 'hooks';
import { Page } from 'components';

import { useEffect } from 'react';
import { getCashierReportShift } from 'redux/cashier/cashierSlice';
import { formatCurrency } from 'utils';
import { CashierReportSkeleton } from 'sections/cashier';

function EndOfShiftPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const { translate } = useLocales();

  const { isLoading } = useAppSelector((state) => state.wallet);
  const { shiftReport, isLoading: isLoadingShift } = useAppSelector((state) => state.cashier);

  const handleEndOfShift = () => {
    dispatch<any>(sendMoneyToKitchenCenter(navigate));
  };

  useEffect(() => {
    dispatch<any>(getCashierReportShift(navigate));
  }, [dispatch, navigate]);

  return (
    <Page title={translate('breadcrumb.endOfShift')} pathname={pathname} navigateDashboard={PATH_CASHIER_APP.root}>
      {isLoadingShift ? (
        <CashierReportSkeleton />
      ) : (
        <Stack alignItems="center" width="100%">
          <Box sx={{ width: '70%' }}>
            <Card>
              <Paper sx={{ width: '100%', mb: 4, mt: 4 }}>
                <Stack justifyContent="center" direction="row">
                  <Avatar src={shiftReport?.cashierImage} sx={{ width: 150, height: 150 }} />
                </Stack>
                <Stack direction="row" justifyContent="center" m={2}>
                  <Typography variant="h4">{shiftReport?.cashierName}</Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between" ml={12} mr={10} mt={4}>
                  <Typography variant="h6" color={(theme) => theme.palette.grey[500]}>
                    {translate('model.capitalize.kitchenCenter')}
                  </Typography>
                  <Typography variant="h6">{shiftReport?.kitchenCenterName}</Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between" ml={12} mr={10} mt={3}>
                  <Typography variant="h6" color={(theme) => theme.palette.grey[500]}>
                    Tổng số order của hôm nay
                  </Typography>
                  <Typography variant="h6">{shiftReport?.totalOrderToday}</Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between" ml={12} mr={10} mt={3}>
                  <Typography variant="h6" color={(theme) => theme.palette.grey[500]}>
                    Tổng doanh thu của hôm nay
                  </Typography>
                  <Typography variant="h6">{formatCurrency(shiftReport?.totalMoneyToday as number)}</Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between" ml={12} mr={10} mt={3}>
                  <Typography variant="h6" color={(theme) => theme.palette.grey[500]}>
                    Số dư trong ví
                  </Typography>
                  <Typography variant="h6">{formatCurrency(shiftReport?.balance as number)}</Typography>
                </Stack>

                <Stack mt={4} justifyContent="center" direction="row">
                  <Button onClick={handleEndOfShift} variant="contained" disabled={isLoading}>
                    Xác nhận kết thúc ca làm việc
                  </Button>
                </Stack>
              </Paper>
            </Card>
          </Box>
        </Stack>
      )}
    </Page>
  );
}

export default EndOfShiftPage;
