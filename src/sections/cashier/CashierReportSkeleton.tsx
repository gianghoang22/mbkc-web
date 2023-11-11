// @mui
import { Box, Card, Paper, Stack, Typography, Button } from '@mui/material';
// redux
import { useAppSelector } from 'redux/configStore';

import { Skeleton } from '@mui/material';

function CashierReportSkeleton() {
  const { isLoading } = useAppSelector((state) => state.wallet);

  return (
    <Stack alignItems="center" width="100%">
      <Box sx={{ width: '70%' }}>
        <Card>
          <Paper sx={{ width: '100%', mb: 4, mt: 4 }}>
            <Stack justifyContent="center" direction="row">
              <Skeleton variant="circular" width={150} height={150} />
            </Stack>
            <Stack direction="row" justifyContent="center" m={2}>
              <Typography variant="h4">
                <Skeleton width={180} />
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" ml={12} mr={10} mt={4}>
              <Typography variant="h6" color={(theme) => theme.palette.grey[500]}>
                <Skeleton width={180} />
              </Typography>
              <Typography variant="h6">
                <Skeleton width={180} />
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" ml={12} mr={10} mt={3}>
              <Typography variant="h6" color={(theme) => theme.palette.grey[500]}>
                <Skeleton width={180} />
              </Typography>
              <Typography variant="h6">
                <Skeleton width={180} />
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" ml={12} mr={10} mt={3}>
              <Typography variant="h6" color={(theme) => theme.palette.grey[500]}>
                <Skeleton width={180} />
              </Typography>
              <Typography variant="h6">
                <Skeleton width={180} />
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" ml={12} mr={10} mt={3}>
              <Typography variant="h6" color={(theme) => theme.palette.grey[500]}>
                <Skeleton width={180} />
              </Typography>
              <Typography variant="h6">
                <Skeleton width={180} />
              </Typography>
            </Stack>

            <Stack mt={4} justifyContent="center" direction="row">
              <Button variant="contained" disabled={isLoading}>
                <Skeleton width={180} />
              </Button>
            </Stack>
          </Paper>
        </Card>
      </Box>
    </Stack>
  );
}

export default CashierReportSkeleton;
