import { useNavigate } from 'react-router-dom';
// @mui
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Breadcrumbs as MUIBreadcrumbs, Link, Typography, Stack } from '@mui/material';
//
import { RoutesPageKey } from 'common/enum';

interface BreadcrumbsProps {
  sx?: object;
  model: string;
  pathname: string;
  navigateDashboard: RoutesPageKey;
}

function Breadcrumbs({ model, pathname, navigateDashboard, sx }: BreadcrumbsProps) {
  console.log(pathname);
  const navigate = useNavigate();
  const pathnames = pathname
    .split('/')
    .slice(2)
    .filter((x) => x);

  const pathnameBread = pathnames[1] === ':id' ? pathnames.filter((x) => x !== ':id') : pathnames;
  console.log('pathnames', pathnames);
  console.log('pathnameBread', pathnameBread);

  return (
    <MUIBreadcrumbs separator={<FiberManualRecordIcon sx={{ fontSize: 8 }} />} aria-label="breadcrumb">
      {pathnameBread.length > 0 ? (
        <Stack direction="row" gap={1} alignItems="center">
          <Link onClick={() => navigate(navigateDashboard)} underline="none" sx={{ cursor: 'pointer' }}>
            Dashboard
          </Link>
          <FiberManualRecordIcon sx={{ fontSize: 8 }} />
          <Typography color="primary">{model}</Typography>
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
