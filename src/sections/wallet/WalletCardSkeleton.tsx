import { Grid, Skeleton } from '@mui/material';

function WalletCardSkeleton() {
  return (
    <Grid container columnSpacing={3} mb={3} mt={-5}>
      <Grid item xs={12} sm={5} md={5}>
        <Skeleton height={240} />
      </Grid>

      <Grid item xs={12} sm={3.5} md={3.2}>
        <Skeleton height={240} />
      </Grid>

      <Grid item xs={12} sm={3.5} md={3.8}>
        <Skeleton height={240} />
      </Grid>
    </Grid>
  );
}

export default WalletCardSkeleton;
