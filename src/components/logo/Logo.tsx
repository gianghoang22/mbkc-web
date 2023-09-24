import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Link } from '@mui/material';

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
      <Box component="img" src="/assets/images/logos/logo_mbkc.png" sx={{ width: 70, height: 70 }} />
      <Box component="img" src="/assets/images/logos/text_mbkc_1.png" sx={{ height: 45, mt: 1.5 }} />
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
