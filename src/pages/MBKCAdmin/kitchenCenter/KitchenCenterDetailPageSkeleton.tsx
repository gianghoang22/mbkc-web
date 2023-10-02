import { Label } from 'components';

// @mui
import { Card, Grid, Stack, Typography, Skeleton } from '@mui/material';

function KitchenCenterDetailPage() {
  return (
    <>
      <Card>
        <Stack sx={{ px: 3, py: 3 }}>
          <Grid container columnSpacing={2} alignItems="center">
            <Grid item md={3} sm={12}>
              <Stack width="100%" alignItems="center">
                <Skeleton variant="circular" width={150} height={150} />
              </Stack>
            </Grid>
            <Grid item md={9} sm={12}>
              <Stack gap={1}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Stack direction="row" alignItems="center" gap={0.5}>
                    <Skeleton width={250} />
                  </Stack>
                  <Label>
                    <Skeleton width={60} />
                  </Label>
                </Stack>

                <Stack direction="row" alignItems="center" justifyContent="space-between" gap={0.5}>
                  <Typography variant="subtitle1">Address:</Typography>
                  <Skeleton width={280} />
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Card>
    </>
  );
}

export default KitchenCenterDetailPage;
