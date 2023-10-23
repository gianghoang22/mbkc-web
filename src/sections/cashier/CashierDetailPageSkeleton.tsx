// @mui
import { Grid, Stack, Card, Divider, Skeleton } from '@mui/material';

//
import { useLocales, useResponsive } from 'hooks';
import { Typography } from '@mui/material';

function CashierDetailPage() {
  const { translate } = useLocales();
  const mdSm = useResponsive('up', 'md', 'md');

  return (
    <>
      <Grid container columnSpacing={4}>
        <Grid item xs={12} sm={4} md={4}>
          <Stack width="100%" alignItems="center" justifyContent="center">
            <Card>
              <Skeleton variant="circular" width={300} height={300} />
            </Card>
          </Stack>
        </Grid>
        <Grid item xs={12} md={8} lg={8}>
          <Stack paddingLeft={4} paddingRight={4}>
            <Skeleton height={40} width={140} />

            <Stack direction="row" justifyContent="space-between" paddingTop={1} paddingBottom={1}>
              <Typography variant="subtitle1">Status</Typography>
              <Skeleton width={140} height={30} />
            </Stack>
            <Divider />

            <Stack direction="row" justifyContent="space-between" paddingTop={2} paddingBottom={1}>
              <Typography variant="subtitle1">Email</Typography>
              <Skeleton width={140} height={30} />
            </Stack>
            <Divider />

            <Stack direction="row" justifyContent="space-between" paddingTop={2} paddingBottom={1}>
              <Typography variant="subtitle1">Citizen Number</Typography>
              <Skeleton width={140} height={30} />
            </Stack>
            <Divider />

            <Stack direction="row" justifyContent="space-between" paddingTop={2} paddingBottom={1}>
              <Typography variant="subtitle1">Date of birth</Typography>
              <Skeleton width={140} height={30} />
            </Stack>
            <Divider />

            <Stack direction="row" justifyContent="space-between" paddingTop={2} paddingBottom={1}>
              <Typography variant="subtitle1">Gender</Typography>
              <Skeleton width={140} height={30} />
            </Stack>
            <Divider />

            <Stack direction="row" alignItems="start" gap={2} mt={2}>
              <Typography variant="subtitle1" minWidth={mdSm ? 150 : 110}>
                {translate('table.kitchenCenter')}
              </Typography>
              <Stack direction="row" alignItems="start" gap={2}>
                <Skeleton height={120} width={120} />
                <Stack gap={0.5} mt={3}>
                  <Stack direction="row" gap={2}>
                    <Typography>{translate('table.name')}: </Typography>
                    <Typography component="span" variant="body1">
                      <Skeleton width={140} />
                    </Typography>
                  </Stack>
                  <Stack direction="row" gap={2}>
                    <Typography variant="subtitle1">{translate('table.address')} </Typography>
                    <Typography component="span" variant="body1">
                      <Skeleton width={140} />
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default CashierDetailPage;
