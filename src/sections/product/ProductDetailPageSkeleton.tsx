// @mui
import { Divider, Grid, Skeleton, Stack, Box } from '@mui/material';
import { useResponsive } from 'hooks';

function ProductDetailPageSkeleton() {
  const mdUp = useResponsive('up', 'lg', 'lg');

  return (
    <>
      <Grid container columnSpacing={5} rowSpacing={5}>
        <Grid item xs={12} sm={4} md={4}>
          <Stack width="100%" alignItems="center" justifyContent="center">
            <Skeleton
              variant="rounded"
              width={!mdUp ? 241 : 358}
              height={!mdUp ? 241 : 358}
              sx={{ borderRadius: '16px' }}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={8} md={8}>
          <Stack gap={2}>
            <Stack gap={1} mb={2}>
              <Box mb={1}>
                <Skeleton variant="rounded" width={180} height={25} />
              </Box>
              <Skeleton variant="rounded" width={300} height={38} />
              <Box width="100%">
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </Box>
            </Stack>

            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Skeleton width={80} />
              <Skeleton variant="rounded" width={120} height={24} />
            </Stack>

            <Divider />

            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Skeleton width={80} />
              <Skeleton variant="rounded" width={120} height={24} />
            </Stack>

            <Divider />
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Skeleton width={120} />
              <Skeleton width={150} />
            </Stack>

            <Divider />
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Skeleton width={120} />
              <Skeleton width={150} />
            </Stack>

            <Divider />
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Skeleton width={120} />
              <Skeleton width={150} />
            </Stack>

            <Divider />
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Skeleton width={120} />
              <Skeleton width={150} />
            </Stack>

            <Divider />
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Skeleton width={120} />
              <Skeleton width={150} />
            </Stack>

            <Divider />
          </Stack>
        </Grid>
      </Grid>

      <Stack direction="row" justifyContent="right" mt={10}>
        <Skeleton variant="rounded" width={79} height={36} />
      </Stack>
    </>
  );
}

export default ProductDetailPageSkeleton;
