// @mui
import { Divider, Grid, Skeleton, Stack } from '@mui/material';
import { useResponsive } from 'hooks';

function StoreDetailPageSkeleton({ rejectedReason = '' }: { rejectedReason: string | null | undefined }) {
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
            <Skeleton variant="rounded" width={300} height={38} />

            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Skeleton width={80} />
              <Skeleton variant="rounded" width={100} height={24} />
            </Stack>

            <Divider />

            {rejectedReason !== null && rejectedReason !== undefined && (
              <>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Skeleton width={80} />
                  <Skeleton variant="rounded" width={100} height={24} />
                </Stack>

                <Divider />
              </>
            )}

            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Skeleton width={80} />
              <Skeleton variant="rounded" width={100} height={24} />
            </Stack>

            <Divider />

            <Stack direction="row" alignItems="start" gap={2}>
              <Skeleton width={!mdUp ? 150 : 120} />
              <Stack direction="row" alignItems="start" gap={1}>
                <Skeleton variant="rectangular" width={120} height={120} />
                <Stack gap={0.5}>
                  <Skeleton width={!mdUp ? 290 : 480} />
                  <Skeleton width={!mdUp ? 290 : 480} />
                  {!mdUp && <Skeleton width={290} />}
                </Stack>
              </Stack>
            </Stack>

            <Divider />

            {/* Role = 'MBKC Admin' */}
            <Stack direction="row" alignItems="start" gap={2}>
              <Skeleton width={!mdUp ? 150 : 120} />
              <Stack direction="row" alignItems="start" gap={1}>
                <Skeleton variant="rectangular" width={120} height={120} />
                <Stack gap={0.5}>
                  <Skeleton width={!mdUp ? 290 : 480} />
                </Stack>
              </Stack>
            </Stack>

            {/* <Divider /> */}

            {/* <Stack direction="row" alignItems="start">
                  <Typography variant="subtitle1" width="150px">
                    {translate('table.partner')}
                  </Typography>
                  <Stack direction="row" gap={2.5}>
                    <Stack direction="row" gap={3}>
                      <Stack
                        direction="row"
                        gap={1}
                        sx={(theme) => ({
                          p: 1.2,
                          borderRadius: 1,
                          backgroundColor: theme.palette.grey[200],
                        })}
                      >
                        <Avatar
                          src="/assets/images/avatars/avatar_1.jpg"
                          alt="partner"
                          variant="rounded"
                          sx={{ width: 45, height: 45 }}
                        />
                        <Typography variant="subtitle2">Shoppe Food</Typography>
                      </Stack>
                    </Stack>
                    <Stack direction="row" gap={3}>
                      <Stack
                        direction="row"
                        gap={1}
                        sx={(theme) => ({
                          p: 1.2,
                          borderRadius: 1,
                          backgroundColor: theme.palette.grey[200],
                        })}
                      >
                        <Avatar
                          src="/assets/images/avatars/avatar_1.jpg"
                          alt="partner"
                          variant="rounded"
                          sx={{ width: 45, height: 45 }}
                        />
                        <Typography variant="subtitle2">Shoppe Food</Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack> */}
          </Stack>
        </Grid>
      </Grid>

      <Stack direction="row" justifyContent="right" mt={10}>
        <Skeleton variant="rounded" width={79} height={36} />
      </Stack>
    </>
  );
}

export default StoreDetailPageSkeleton;
