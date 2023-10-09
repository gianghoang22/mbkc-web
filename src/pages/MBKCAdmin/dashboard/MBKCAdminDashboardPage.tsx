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
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllKitchenCenters } from 'redux/kitchenCenter/kitchenCenterSlice';
import { getAllBrands } from 'redux/brand/brandSlice';
import { useAppSelector } from 'redux/configStore';
import { Color } from 'common/enum';
import { Helmet } from 'components';
import { PATH_ADMIN_APP } from 'routes/paths';
import { AppWidgetSummary } from 'sections/dashboard';
import { useLocales } from 'hooks';
import { ListParams, WordLimited } from '@types';
import { getAllStores } from 'redux/store/storeSlice';
import { BrandTableRowDashboardSkeleton } from 'sections/brand';
import { KitchenCenterTableRowDashboardSkeleton } from 'sections/kitchenCenter';

// ----------------------------------------------------------------------

function MBKCAdminDashboardPage() {
  const { translate } = useLocales();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { brands, isLoading: isLoadingBrands } = useAppSelector((state) => state.brand);
  const { kitchenCenters, isLoading: isLoadingKitchenCenters } = useAppSelector((state) => state.kitchenCenter);
  const { stores } = useAppSelector((state) => state.store);

  const LimitedWord = ({ wordString, lengthLimit, end = '...' }: WordLimited) => {
    const limitedWord = wordString.length < lengthLimit ? wordString : wordString.substring(0, lengthLimit) + end;
    return limitedWord;
  };

  const featuredKitchenCenters = kitchenCenters.slice(0, 3);
  const featuredBrands = brands.slice(0, 3);

  const params: ListParams = {
    optionParams: {
      itemsPerPage: 5,
      currentPage: 1,
      keySearchName: '',
    },
    navigate,
  };

  useEffect(() => {
    dispatch<any>(getAllKitchenCenters(params));
    dispatch<any>(getAllBrands(params));
    dispatch<any>(getAllStores(params));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              title={translate('page.content.total', {
                model: translate('model.lowercase.brands'),
              })}
              total={brands.length}
              icon={<BrandingWatermarkOutlinedIcon fontSize="large" />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title={translate('page.content.total', {
                model: translate('model.lowercase.kitchenCenters'),
              })}
              total={kitchenCenters.length}
              color={Color.SECONDARY}
              icon={<BusinessIcon fontSize="large" />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title={translate('page.content.total', {
                model: translate('model.lowercase.stores'),
              })}
              total={stores.length}
              color={Color.SUCCESS}
              icon={<StoreIcon fontSize="large" />}
            />
          </Grid>
        </Grid>

        <Grid container spacing={8} marginTop={-5}>
          <Grid item xs={12} sm={12} md={6}>
            <Typography
              color="#2B3674"
              style={{
                fontSize: '14px',
                fontWeight: 700,
                lineHeight: '28px',
                marginBottom: 10,
                letterSpacing: '0.6px',
              }}
            >
              {translate('model.capitalize.brands')}
            </Typography>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>{translate('table.no')}</TableCell>
                    <TableCell>Logo</TableCell>
                    <TableCell>{translate('table.name')}</TableCell>
                    <TableCell>{translate('table.address')}</TableCell>
                    <TableCell>{translate('table.status')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isLoadingBrands ? (
                    <BrandTableRowDashboardSkeleton length={featuredBrands.length} />
                  ) : (
                    <>
                      {featuredBrands.map((row, index) => (
                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell component="th" scope="row">
                            {index + 1}
                          </TableCell>
                          <TableCell>
                            <Avatar src={row.logo} alt="logo" />
                          </TableCell>
                          <TableCell>
                            <Typography variant="subtitle2" style={{ marginLeft: 4, fontWeight: 600 }}>
                              {LimitedWord({ wordString: row.name, lengthLimit: 10 })}
                            </Typography>
                          </TableCell>
                          <TableCell> {LimitedWord({ wordString: row.address, lengthLimit: 10 })}</TableCell>
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
                    </>
                  )}
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
                <Typography>{translate('page.content.viewAll')}</Typography>
                <KeyboardArrowRightIcon style={{ fontSize: '18px' }} />
              </Link>
            </TableContainer>
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <Typography
              color="#2B3674"
              style={{
                fontSize: '14px',
                fontWeight: 700,
                marginBottom: 10,
                lineHeight: '28px',
                letterSpacing: '0.6px',
              }}
            >
              {translate('model.capitalize.kitchenCenters')}
            </Typography>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>{translate('table.no')}</TableCell>
                    <TableCell>Logo</TableCell>
                    <TableCell>{translate('table.name')}</TableCell>
                    <TableCell>{translate('table.status')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isLoadingKitchenCenters ? (
                    <KitchenCenterTableRowDashboardSkeleton length={kitchenCenters.length} />
                  ) : (
                    <>
                      {featuredKitchenCenters.map((row, index) => (
                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell component="th" scope="row">
                            {index + 1}
                          </TableCell>
                          <TableCell>
                            <Avatar src={row.logo} alt="logo" />
                          </TableCell>

                          <TableCell>
                            <Typography variant="body2" style={{ marginLeft: 4, fontWeight: 600 }}>
                              {row.name}
                            </Typography>
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
                    </>
                  )}
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
                <Typography>{translate('page.content.viewAll')}</Typography>
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
