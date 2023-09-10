import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Link, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export interface LogoProps {
  sx?: object;
  disabledLink?: boolean;
}

const Logo = forwardRef(({ disabledLink = false, sx, ...other }: LogoProps, ref) => {
  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        display: 'inline-flex',
        color: (theme) => theme.palette.primary.main,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        ...sx,
      }}
      {...other}
    >
      <Box
        component="img"
        src="/assets/images/logos/bephoi_logo.jpg"
        sx={{ width: 50, height: 50, borderRadius: 999 }}
      />
      <Typography sx={{ fontSize: 24, fontWeight: 'bold' }}>MBKC</Typography>
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

export default Logo;
