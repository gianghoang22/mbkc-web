import { Grid, Skeleton, Stack, Typography } from '@mui/material';
import { useLocales } from 'hooks';

function BrandDetailPage() {
  const { translate } = useLocales();

  return (
    <>
      <Stack sx={{ px: 3.5, py: 3 }}>
        <Grid container columnSpacing={2}>
          <Grid item md={3} sm={12}>
            <Stack width="100%" alignItems="center">
              <Skeleton variant="circular" width={150} height={150} />
            </Stack>
          </Grid>
          <Grid item md={9} sm={12}>
            <Stack width="100%" alignItems="start" gap={1}>
              <Skeleton width={215} />

              <Stack width="100%" direction="row" alignItems="center" justifyContent="space-between" gap={0.5}>
                <Typography variant="subtitle1">{translate('table.status')}:</Typography>
                <Skeleton width={55} />
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between" gap={0.5}>
                <Typography variant="subtitle1">{translate('table.address')}:</Typography>
                <Skeleton width={425} />
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}

export default BrandDetailPage;
