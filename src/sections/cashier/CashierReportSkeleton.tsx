// @mui
import { Box, Card, Paper, Stack, Typography } from '@mui/material';

import { Skeleton } from '@mui/material';

function CashierReportSkeleton() {
  return (
    <Stack alignItems="center" width="100%">
      <Box sx={{ width: '100%' }}>
        <Card>
          <Paper sx={{ width: '100%', mb: 4, mt: 4 }}>
            <Stack justifyContent="center" direction="row">
              <Skeleton variant="circular" width={150} height={150} />
            </Stack>
            <Stack direction="row" justifyContent="center" m={2}>
              <Typography variant="h4">
                <Skeleton width={240} />
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" ml={20} mr={20} mt={4}>
              <Typography variant="h6" color={(theme) => theme.palette.grey[500]}>
                <Skeleton width={180} />
              </Typography>
              <Typography variant="h6">
                <Skeleton width={180} />
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" ml={20} mr={20} mt={3}>
              <Typography variant="h6" color={(theme) => theme.palette.grey[500]}>
                <Skeleton width={280} />
              </Typography>
              <Typography variant="h6">
                <Skeleton width={120} />
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" ml={20} mr={20} mt={3}>
              <Typography variant="h6" color={(theme) => theme.palette.grey[500]}>
                <Skeleton width={240} />
              </Typography>
              <Typography variant="h6">
                <Skeleton width={100} />
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" ml={20} mr={20} mt={3}>
              <Typography variant="h6" color={(theme) => theme.palette.grey[500]}>
                <Skeleton width={120} />
              </Typography>
              <Typography variant="h6">
                <Skeleton width={100} />
              </Typography>
            </Stack>

            <Stack mt={4} justifyContent="center" direction="row" gap={2}>
              <Skeleton width={200} height={60} />
            </Stack>
          </Paper>
        </Card>
      </Box>
    </Stack>
  );
}

export default CashierReportSkeleton;