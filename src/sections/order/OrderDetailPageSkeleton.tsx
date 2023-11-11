// @mui
import { Box, Card, Container, Divider, Grid, IconButton, Paper, Skeleton, Stack, Typography } from '@mui/material';
// redux
import { useAppSelector } from 'redux/configStore';
//
import { Role } from 'common/enums';

function OrderDetailPageSkeleton() {
  const { userAuth } = useAppSelector((state) => state.auth);

  return (
    <Container maxWidth="lg">
      <Stack mb={4} direction="row" justifyContent="space-between">
        <Stack direction="row" alignItems="center" gap={1}>
          <IconButton color="inherit">
            <Skeleton variant="circular" width={28} height={28} />
          </IconButton>
          <Skeleton width={350} />
          <Skeleton variant="rounded" width={130} height={24} />
        </Stack>

        {userAuth?.roleName === Role.CASHIER && (
          <Stack>
            <Skeleton width={142} />
          </Stack>
        )}
      </Stack>
      <Grid container columnSpacing={5} rowSpacing={5}>
        <Grid item xs={12} sm={12} md={8}>
          <Card>
            <Box sx={{ width: '100%' }} padding={2} paddingTop={2}>
              <Paper sx={{ width: '100%', mb: 2 }}>
                <Stack direction="row" alignItems="center" mb={1}>
                  <Typography variant="subtitle1" mr={1}>
                    <Typography variant="subtitle1" mr={1}>
                      <Skeleton width={100} />
                    </Typography>
                  </Typography>
                  <Skeleton width={170} />
                </Stack>

                <Stack>
                  <Skeleton width={680} height={102} />
                </Stack>

                <Stack direction="row" alignItems="center" mt={1} mb={1}>
                  <Typography variant="subtitle1" mr={1}>
                    <Skeleton width={100} />
                  </Typography>
                  <Skeleton width={200} />
                </Stack>

                <Stack>
                  <Stack direction="row" justifyContent="flex-end" alignItems="center" textAlign="right" mt={1}>
                    <Skeleton width={200} />
                  </Stack>

                  <Stack direction="row" justifyContent="flex-end" alignItems="center" textAlign="right" mt={1}>
                    <Skeleton width={200} />
                  </Stack>

                  <Stack direction="row" justifyContent="flex-end" alignItems="center" textAlign="right" mt={1}>
                    <Skeleton width={200} />
                  </Stack>
                  <Stack direction="row" justifyContent="flex-end" alignItems="center" textAlign="right" mt={1}>
                    <Skeleton width={200} />
                  </Stack>
                </Stack>
              </Paper>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Stack gap={3}>
            <Card>
              <Box sx={{ width: '100%' }} padding={2} minHeight={460}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                  <Stack>
                    <Typography variant="subtitle1">
                      <Skeleton width={100} />
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={2} mt={2} mb={2}>
                      <Stack direction="row" spacing={1} mt={1} alignItems="center">
                        <Typography color={(theme) => theme.palette.grey[500]}>
                          <Skeleton width={100} />
                        </Typography>
                        <Skeleton width={150} />
                      </Stack>
                    </Stack>
                  </Stack>
                  <Divider />

                  <Stack>
                    <Typography variant="subtitle1" mt={2}>
                      <Skeleton width={100} />
                    </Typography>
                    <Stack direction="row" spacing={1} mt={1} alignItems="center">
                      <Typography color={(theme) => theme.palette.grey[500]}>
                        <Skeleton width={100} />
                      </Typography>
                      <Skeleton width={150} />
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={1} mt={1} mb={2}>
                      <Typography color={(theme) => theme.palette.grey[500]}>
                        <Skeleton width={100} />
                      </Typography>
                      <Skeleton width={150} />
                    </Stack>
                  </Stack>
                  <Divider />

                  <Stack>
                    <Typography variant="subtitle1" mt={2}>
                      <Skeleton width={100} />
                    </Typography>
                    <Stack direction="row" spacing={1} mt={1}>
                      <Typography sx={{ color: '#919EAB;' }}>
                        <Skeleton width={100} />
                      </Typography>
                      <Skeleton width={150} />
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={1} mt={1} mb={2}>
                      <Typography sx={{ color: '#919EAB;' }}>
                        <Skeleton width={100} />
                      </Typography>
                      <Skeleton width={150} />
                    </Stack>
                  </Stack>
                  <Divider />

                  <Typography variant="subtitle2" mt={2}>
                    <Skeleton width={100} />
                  </Typography>
                  <Stack rowGap={2} mt={1}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography>
                        <Skeleton width={100} />
                      </Typography>
                      <Skeleton width={150} />
                    </Stack>
                  </Stack>
                </Paper>
              </Box>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

export default OrderDetailPageSkeleton;
