import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Box, Card, Paper, Stack, Typography, Avatar, Button } from '@mui/material';

import { PATH_CASHIER_APP } from 'routes/paths';
import { useLocales } from 'hooks';
import { Page } from 'components';
import images from 'assets';
import { useDispatch } from 'react-redux';
import { sendMoneyToKitchenCenter } from 'redux/wallet/walletSlice';

function ListShiftPage() {
  const { pathname } = useLocation();
  const { translate } = useLocales();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEndOfShift = () => {
    dispatch<any>(sendMoneyToKitchenCenter(navigate));
  };

  return (
    <>
      <Page title={translate('breadcrumb.endOfShift')} pathname={pathname} navigateDashboard={PATH_CASHIER_APP.root}>
        <Box sx={{ width: '100%' }}>
          <Card>
            <Paper sx={{ width: '100%', mb: 4 }}>
              <Stack justifyContent="center" direction="row">
                <Avatar src={images.logo.logo_mbkc_no_bg} sx={{ width: 150, height: 150 }} />
              </Stack>
              <Stack direction="row" justifyContent="center" margin={2}>
                <Typography variant="h4">Trần Thị Thủy Tiên</Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between" ml={12} mr={10} mt={4}>
                <Typography variant="h6" color={(theme) => theme.palette.grey[600]}>
                  {translate('model.capitalize.kitchenCenter')}
                </Typography>
                <Typography variant="h6">Kitchen Center Đồng Khởi</Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between" ml={12} mr={10} mt={3}>
                <Typography variant="h6" color={(theme) => theme.palette.grey[600]}>
                  Tổng số order của hôm nay
                </Typography>
                <Typography variant="h6">146</Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between" ml={12} mr={10} mt={3}>
                <Typography variant="h6" color={(theme) => theme.palette.grey[600]}>
                  Tổng doanh thu của hôm nay
                </Typography>
                <Typography variant="h6">146.000.000 đ</Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between" ml={12} mr={10} mt={3}>
                <Typography variant="h6" color={(theme) => theme.palette.grey[600]}>
                  Số dư trong ví
                </Typography>
                <Typography variant="h6">200.000.000 đ</Typography>
              </Stack>

              <Stack mt={4} justifyContent="center" direction="row">
                <Button onClick={handleEndOfShift} variant="contained">
                  Xác nhận kết thúc ca làm việc
                </Button>
              </Stack>
            </Paper>
          </Card>
        </Box>
      </Page>
    </>
  );
}

export default ListShiftPage;
