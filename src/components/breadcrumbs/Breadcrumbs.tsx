import { useNavigate } from 'react-router-dom';
// @mui
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Link, Breadcrumbs as MUIBreadcrumbs, Stack, Typography } from '@mui/material';

interface BreadcrumbsProps {
  sx?: object;
  pathname: string;
  navigateDashboard: string;
}

function Breadcrumbs({ pathname, navigateDashboard, sx }: BreadcrumbsProps) {
  console.log(pathname);
  const navigate = useNavigate();
  const pathnames = pathname
    .split('/')
    .slice(2)
    .filter((x) => x);

  const pathnameBread = !isNaN(parseInt(pathnames[2])) ? pathnames.filter((x) => isNaN(parseInt(x))) : pathnames;

  return (
    <MUIBreadcrumbs separator={<FiberManualRecordIcon sx={{ fontSize: 8 }} />} aria-label="breadcrumb">
      {pathnameBread.length > 0 ? (
        <Stack direction="row" gap={1} alignItems="center">
          <Link onClick={() => navigate(navigateDashboard)} underline="none" sx={{ cursor: 'pointer' }}>
            Dashboard
          </Link>
        </Stack>
      ) : (
        <Typography>Dashboard</Typography>
      )}
      {pathnameBread.map((name, index) => {
        const routeTo = `/${pathnameBread.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnameBread.length - 1;
        const nameUppercase = name.split('-').join(' ');
        return isLast ? (
          <Typography key={name} sx={{ textTransform: 'capitalize' }}>
            {nameUppercase}
          </Typography>
        ) : (
          <Link
            key={name}
            underline="none"
            sx={{ textTransform: 'capitalize', cursor: 'pointer' }}
            onClick={() => navigate(routeTo)}
          >
            {nameUppercase}
          </Link>
        );
      })}
    </MUIBreadcrumbs>
  );
}

export default Breadcrumbs;
