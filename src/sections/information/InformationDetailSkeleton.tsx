import { Skeleton, Stack, Box, Card, Paper } from '@mui/material';

function InformationPageDetailSkeleton() {
  return (
    <Card>
      <Box width="100%" px={2} pt={2} pb={0.5}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <Skeleton variant="rounded" width="100%" height={232} sx={{ borderRadius: 2 }} />

          <Box mt={-10}>
            <Stack direction="row" alignItems="end" gap={2} px={4} pt={4}>
              <Skeleton variant="circular" width={175} height={150} />
              <Stack width="100%" rowGap={0.5}>
                <Stack direction="row" alignItems="center" gap={5}>
                  <Skeleton variant="rounded" width={222} height={28} />
                  <Skeleton variant="rounded" width={100} height={24} />
                </Stack>

                <Skeleton width={610} />

                <Skeleton width={610} />
              </Stack>
            </Stack>{' '}
          </Box>
        </Paper>
      </Box>
    </Card>
  );
}

export default InformationPageDetailSkeleton;
