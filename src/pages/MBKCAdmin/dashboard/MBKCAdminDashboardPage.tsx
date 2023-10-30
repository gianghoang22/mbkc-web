/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
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
  Card,
} from '@mui/material';
// @mui icon
import BrandingWatermarkOutlinedIcon from '@mui/icons-material/BrandingWatermarkOutlined';
import BusinessIcon from '@mui/icons-material/Business';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import StoreIcon from '@mui/icons-material/Store';
// redux
import { getAllBrands } from 'redux/brand/brandSlice';
import { useAppSelector } from 'redux/configStore';
import { getAllKitchenCenters } from 'redux/kitchenCenter/kitchenCenterSlice';
import { getAllStores } from 'redux/store/storeSlice';
// section
import { BrandTableRowDashboardSkeleton } from 'sections/brand';
import { AppWidgetSummary } from 'sections/dashboard';
import { KitchenCenterTableRowDashboardSkeleton } from 'sections/kitchenCenter';
//
import { ListParams, OrderSortBy } from '@types';
import { Color, Status } from 'common/enum';
import { Helmet, Label } from 'components';
import { useLocales } from 'hooks';
import { PATH_ADMIN_APP } from 'routes/paths';
import { StoreTableRowSkeleton } from 'sections/store';

// ----------------------------------------------------------------------

function MBKCAdminDashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { translate } = useLocales();

  const { brands, isLoading: isLoadingBrands, numberItems: totalBrandItems } = useAppSelector((state) => state.brand);
  const {
    kitchenCenters,
    isLoading: isLoadingKitchenCenters,
    numberItems: totalKitchenCenterItems,
  } = useAppSelector((state) => state.kitchenCenter);
  const { stores, numberItems: totalStoreItems, isLoading: isLoadingStores } = useAppSelector((state) => state.store);

  const featuredKitchenCenters = kitchenCenters.slice(0, 5);
  const featuredBrands = brands.slice(0, 5);
  const featuredStores = stores.slice(0, 5);

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
              total={totalBrandItems}
              icon={<BrandingWatermarkOutlinedIcon fontSize="large" />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title={translate('page.content.total', {
                model: translate('model.lowercase.kitchenCenters'),
              })}
              total={totalKitchenCenterItems}
              color={Color.SECONDARY}
              icon={<BusinessIcon fontSize="large" />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title={translate('page.content.total', {
                model: translate('model.lowercase.stores'),
              })}
              total={totalStoreItems}
              color={Color.SUCCESS}
              icon={<StoreIcon fontSize="large" />}
            />
          </Grid>
        </Grid>

        <Box mb={3} mt={1}>
          <Card>
            <Box p={2}>
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
                            <TableCell width={60} component="th" scope="row">
                              {index + 1}
                            </TableCell>
                            <TableCell>
                              <Avatar src={row.logo} alt="logo" />
                            </TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell width={600}> {row.address}</TableCell>
                            <TableCell>
                              <Label
                                color={
                                  row?.status === Status.ACTIVE
                                    ? Color.SUCCESS
                                    : row?.status === Status.INACTIVE
                                    ? Color.WARNING
                                    : Color.ERROR
                                }
                              >
                                {row?.status === Status.INACTIVE
                                  ? translate('status.inactive')
                                  : row?.status === Status.ACTIVE
                                  ? translate('status.active')
                                  : translate('status.deActive')}
                              </Label>
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
            </Box>
          </Card>
        </Box>

        <Box>
          <Card>
            <Box p={2}>
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
                      <TableCell>{translate('table.address')}</TableCell>
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
                            <TableCell width={60} component="th" scope="row">
                              {index + 1}
                            </TableCell>
                            <TableCell align="left">
                              <Avatar src={row.logo} alt="logo" />
                            </TableCell>

                            <TableCell align="left">{row.name}</TableCell>

                            <TableCell width={600}>
                              {' '}
                              {row?.address
                                .split(', ')
                                .slice(0, row?.address.split(', ').length - 3)
                                .join(', ')}
                            </TableCell>

                            <TableCell align="left">
                              <Label
                                color={
                                  row?.status === Status.ACTIVE
                                    ? Color.SUCCESS
                                    : row?.status === Status.INACTIVE
                                    ? Color.WARNING
                                    : Color.ERROR
                                }
                              >
                                {row?.status === Status.INACTIVE
                                  ? translate('status.inactive')
                                  : row?.status === Status.ACTIVE
                                  ? translate('status.active')
                                  : translate('status.deActive')}
                              </Label>
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
            </Box>
          </Card>
        </Box>

        <Box mt={3}>
          <Card>
            <Box p={2}>
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
                {translate('model.capitalize.stores')}
              </Typography>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>{translate('table.no')}</TableCell>
                      <TableCell>Logo</TableCell>
                      <TableCell>{translate('table.name')}</TableCell>
                      <TableCell>{translate('table.kitchenCenter')}</TableCell>
                      <TableCell>{translate('table.brand')}</TableCell>
                      <TableCell>{translate('table.status')}</TableCell>
                    </TableRow>
                  </TableHead>

                  {true ? (
                    <StoreTableRowSkeleton
                      showAction={false}
                      length={5}
                      selected={[
                        OrderSortBy.LOGO,
                        OrderSortBy.NAME,
                        OrderSortBy.KITCHEN_CENTER,
                        OrderSortBy.BRAND,
                        OrderSortBy.STATUS,
                      ]}
                    />
                  ) : (
                    <>
                      <TableBody>
                        {featuredStores.map((row, index) => (
                          <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                              {index + 1}
                            </TableCell>
                            <TableCell align="left">
                              <Avatar src={row.logo} alt="logo" />
                            </TableCell>

                            <TableCell align="left">{row.name}</TableCell>
                            <TableCell align="left">{row.kitchenCenter.name}</TableCell>
                            <TableCell align="left">{row.brand.name}</TableCell>

                            <TableCell align="left">
                              <Label
                                color={
                                  row?.status === Status.ACTIVE
                                    ? Color.SUCCESS
                                    : row?.status === Status.INACTIVE
                                    ? Color.WARNING
                                    : Color.ERROR
                                }
                              >
                                {row?.status === Status.INACTIVE
                                  ? translate('status.inactive')
                                  : row?.status === Status.ACTIVE
                                  ? translate('status.active')
                                  : translate('status.deActive')}
                              </Label>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </>
                  )}
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
                  to={PATH_ADMIN_APP.store.list}
                >
                  <Typography>{translate('page.content.viewAll')}</Typography>
                  <KeyboardArrowRightIcon style={{ fontSize: '18px' }} />
                </Link>
              </TableContainer>
            </Box>
          </Card>
        </Box>
      </Container>
    </>
  );
}

export default MBKCAdminDashboardPage;
