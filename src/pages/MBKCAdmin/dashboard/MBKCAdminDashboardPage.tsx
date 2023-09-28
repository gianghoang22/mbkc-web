// @mui
import {
  Avatar,
  Box,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

// @mui icon
import BrandingWatermarkOutlinedIcon from '@mui/icons-material/BrandingWatermarkOutlined';
import BusinessIcon from '@mui/icons-material/Business';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import StoreIcon from '@mui/icons-material/Store';

//
import { BrandData, KitchenCentersData } from '@types';
import { Color } from 'common/enum';
import { Helmet } from 'components';
import { Link } from 'react-router-dom';
import { PATH_ADMIN_APP } from 'routes/paths';
import { AppWidgetSummary } from 'sections/dashboard';
import { useLocales } from 'hooks';

// ----------------------------------------------------------------------

const Brandrows: BrandData[] = [
  {
    no: 1,
    brand: 'Starbucks',
    address: '123 Le Dai Hanh',
    status: 'Active',
  },
  {
    no: 1,
    brand: 'Starbucks',
    address: '123 Le Dai Hanh',
    status: 'Active',
  },
  {
    no: 1,
    brand: 'Starbucks',
    address: '123 Le Dai Hanh',
    status: 'Active',
  },
  {
    no: 1,
    brand: 'Starbucks',
    address: '123 Le Dai Hanh',
    status: 'Active',
  },
  {
    no: 1,
    brand: 'Starbucks',
    address: '123 Le Dai Hanh',
    status: 'Active',
  },
];

const KitchenCenters: KitchenCentersData[] = [
  {
    no: 1,
    kitchenCenter: 'Vincom Dong Khoi',
    status: 'Active',
  },
  {
    no: 1,
    kitchenCenter: 'Vincom Dong Khoi',
    status: 'Active',
  },
  {
    no: 1,
    kitchenCenter: 'Vincom Dong Khoi',
    status: 'Active',
  },
  {
    no: 1,
    kitchenCenter: 'Vincom Dong Khoi',
    status: 'Active',
  },
  {
    no: 1,
    kitchenCenter: 'Vincom Dong Khoi',
    status: 'Active',
  },
];

function MBKCAdminDashboardPage() {
  const { translate } = useLocales();

  return (
    <>
      <Helmet title="MBKC Admin" />

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          {translate('common.welcome')}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title="Total Brand"
              total={20}
              icon={<BrandingWatermarkOutlinedIcon fontSize="large" />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title="Total kitchen centers"
              total={20}
              color={Color.SECONDARY}
              icon={<BusinessIcon fontSize="large" />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title="Total stores"
              total={20}
              color={Color.SUCCESS}
              icon={<StoreIcon fontSize="large" />}
            />
          </Grid>
        </Grid>

        <Grid container spacing={8} marginTop={-5}>
          <Grid item xs={12} sm={12} md={5}>
            <Typography
              color="#2B3674"
              style={{
                fontSize: '14px',
                fontWeight: 700,
                lineHeight: '28px',
                letterSpacing: '0.6px',
              }}
            >
              Brand
            </Typography>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>No.</TableCell>
                    <TableCell>Brand</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Brandrows.map((row, index) => (
                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {row.no}
                      </TableCell>
                      <TableCell>
                        <Box style={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar src="/assets/images/avatars/avatar_1.jpg" alt="logo" />
                          <Typography variant="body2" style={{ marginLeft: 4, fontWeight: 600 }}>
                            {row.brand}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{row.address}</TableCell>
                      <TableCell>
                        <Box
                          style={{
                            color: '#229A16',
                            backgroundColor: 'rgba(84, 214, 44, 0.16)',
                            padding: '3px 0',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 6,
                            height: '24px',
                            width: '60px',
                          }}
                        >
                          <Typography
                            variant="body2"
                            style={{
                              fontWeight: 700,
                              fontSize: '0.75rem',
                            }}
                          >
                            {row.status}
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Link
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  textDecoration: 'none',
                  color: '#000',
                  fontSize: '16px',
                  fontWeight: 400,
                  letterSpacing: '0.4px',
                  alignItems: 'center',
                }}
                to={PATH_ADMIN_APP.brand.list}
              >
                <Typography>View all</Typography>
                <KeyboardArrowRightIcon style={{ fontSize: '18px' }} />
              </Link>
            </TableContainer>
          </Grid>

          <Grid item xs={12} sm={12} md={7}>
            <Typography
              color="#2B3674"
              style={{
                fontSize: '14px',
                fontWeight: 700,
                lineHeight: '28px',
                letterSpacing: '0.6px',
              }}
            >
              Kitchen Centers
            </Typography>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>No.</TableCell>
                    <TableCell>Kitchen Center</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {KitchenCenters.map((row, index) => (
                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {row.no}
                      </TableCell>
                      <TableCell>
                        <Box style={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar src="/assets/images/avatars/avatar_1.jpg" alt="logo" />
                          <Typography variant="body2" style={{ marginLeft: 4, fontWeight: 600 }}>
                            {row.kitchenCenter}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box
                          style={{
                            color: '#229A16',
                            backgroundColor: 'rgba(84, 214, 44, 0.16)',
                            padding: '3px 0',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 6,
                            height: '24px',
                            width: '60px',
                          }}
                        >
                          <Typography
                            variant="body2"
                            style={{
                              fontWeight: 700,
                              fontSize: '0.75rem',
                            }}
                          >
                            {row.status}
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Link
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  textDecoration: 'none',
                  color: '#000',
                  fontSize: '16px',
                  fontWeight: 400,
                  letterSpacing: '0.4px',
                  alignItems: 'center',
                }}
                to={PATH_ADMIN_APP.kitchenCenter.list}
              >
                <Typography>View all</Typography>
                <KeyboardArrowRightIcon style={{ fontSize: '18px' }} />
              </Link>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default MBKCAdminDashboardPage;
