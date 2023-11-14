/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// @mui
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Container,
  Grid,
  Link as MUILink,
  Paper,
  Stack,
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
// redux
import { getAllBrands } from 'redux/brand/brandSlice';
import { useAppSelector } from 'redux/configStore';
import { getAllKitchenCenters } from 'redux/kitchenCenter/kitchenCenterSlice';
import { getAllStoresDashboard } from 'redux/store/storeSlice';
// section
import { BrandTableRowDashboardSkeleton } from 'sections/brand';
import { AppWidgetSummaryOutline, ListNewStores } from 'sections/dashboard';
import { KitchenCenterTableRowDashboardSkeleton } from 'sections/kitchenCenter';
// interface
import { ListParams } from 'common/@types';
import { Color, Language, Status } from 'common/enums';
//
import { EmptyTable, Helmet, Label } from 'components';
import { useLocales } from 'hooks';
import { PATH_ADMIN_APP } from 'routes/paths';

// ----------------------------------------------------------------------

function MBKCAdminDashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const { translate, currentLang } = useLocales();

  const { brands, isLoading: isLoadingBrands, numberItems: totalBrandItems } = useAppSelector((state) => state.brand);
  const {
    kitchenCenters,
    isLoading: isLoadingKitchenCenters,
    numberItems: totalKitchenCenterItems,
  } = useAppSelector((state) => state.kitchenCenter);
  const { numberItemsInDashboard, isLoading: isLoadingStores } = useAppSelector((state) => state.store);

  const featuredKitchenCenters = kitchenCenters.slice(0, 5);
  const featuredBrands = brands.slice(0, 5);

  const params: ListParams = {
    optionParams: {
      itemsPerPage: 5,
      currentPage: 1,
    },
    navigate,
  };

  useEffect(() => {
    dispatch<any>(getAllKitchenCenters(params));
    dispatch<any>(getAllBrands(params));
    dispatch<any>(getAllStoresDashboard(params));
  }, []);

  return (
    <>
      <Helmet title={translate('role.mbkcAdmin')} />

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          {translate('common.welcome')}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummaryOutline
              total={totalKitchenCenterItems}
              isLoading={isLoadingKitchenCenters}
              icon={<BusinessIcon fontSize="large" />}
              title={translate('page.content.total', {
                model: translate('model.lowercase.kitchenCenters'),
              })}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummaryOutline
              color={Color.SECONDARY}
              total={totalBrandItems}
              isLoading={isLoadingBrands}
              icon={<BrandingWatermarkOutlinedIcon fontSize="large" />}
              title={translate('page.content.total', {
                model: translate('model.lowercase.brands'),
              })}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummaryOutline
              color={Color.SUCCESS}
              total={numberItemsInDashboard}
              isLoading={isLoadingStores}
              icon={<StoreIcon fontSize="large" />}
              title={translate('page.content.total', {
                model: translate('model.lowercase.stores'),
              })}
            />
          </Grid>
        </Grid>

        <Stack gap={5} mt={5}>
          <Card>
            <CardHeader
              title={
                currentLang.value === Language.ENGLISH
                  ? translate('page.title.new', { model: translate('model.lowercase.kitchenCenters') })
                  : translate('page.title.new', { model: translate('model.capitalizeOne.kitchenCenters') })
              }
            />
            <Box p={2}>
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
                        {featuredKitchenCenters.map((kitchenCenter, index) => (
                          <TableRow
                            key={index}
                            sx={{ cursor: 'pointer' }}
                            onClick={() =>
                              navigate(PATH_ADMIN_APP.kitchenCenter.root + `/${kitchenCenter.kitchenCenterId}`)
                            }
                          >
                            <TableCell width={60} align="center">
                              {index + 1}
                            </TableCell>
                            <TableCell width={80} align="left">
                              <Avatar src={kitchenCenter.logo} alt="logo" />
                            </TableCell>

                            <TableCell align="left">{kitchenCenter.name}</TableCell>

                            <TableCell width={600}>
                              {' '}
                              {kitchenCenter?.address
                                .split(', ')
                                .slice(0, kitchenCenter?.address.split(', ').length - 3)
                                .join(', ')}
                            </TableCell>

                            <TableCell align="left">
                              <Label
                                color={
                                  kitchenCenter?.status === Status.ACTIVE
                                    ? Color.SUCCESS
                                    : kitchenCenter?.status === Status.INACTIVE
                                    ? Color.WARNING
                                    : Color.ERROR
                                }
                              >
                                {kitchenCenter?.status === Status.INACTIVE
                                  ? translate('status.inactive')
                                  : kitchenCenter?.status === Status.ACTIVE
                                  ? translate('status.active')
                                  : translate('status.deActive')}
                              </Label>
                            </TableCell>
                          </TableRow>
                        ))}
                      </>
                    )}
                    {featuredKitchenCenters.length === 0 && (
                      <EmptyTable colNumber={6} model={translate('model.lowercase.kitchenCenter')} />
                    )}
                  </TableBody>
                </Table>
                <Stack alignItems="end" mt={2}>
                  <Link
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      textDecoration: 'none',
                      color: '#000',
                    }}
                    to={PATH_ADMIN_APP.kitchenCenter.list}
                  >
                    <MUILink underline="hover" variant="subtitle2" color="#000">
                      {translate('page.content.viewAll')}
                    </MUILink>
                    <KeyboardArrowRightIcon fontSize="small" />
                  </Link>
                </Stack>
              </TableContainer>
            </Box>
          </Card>

          <Card>
            <CardHeader
              title={
                currentLang.value === Language.ENGLISH
                  ? translate('page.title.new', { model: translate('model.lowercase.brands') })
                  : translate('page.title.new', { model: translate('model.capitalizeOne.brands') })
              }
            />
            <Box p={2}>
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
                        {featuredBrands.map((brand, index) => (
                          <TableRow
                            key={index}
                            sx={{ cursor: 'pointer' }}
                            onClick={() => navigate(PATH_ADMIN_APP.brand.root + `/${brand.brandId}`)}
                          >
                            <TableCell width={60} align="center">
                              {index + 1}
                            </TableCell>
                            <TableCell width={80}>
                              <Avatar src={brand.logo} alt="logo" />
                            </TableCell>
                            <TableCell>{brand.name}</TableCell>
                            <TableCell width={600}> {brand.address}</TableCell>
                            <TableCell>
                              <Label
                                color={
                                  brand?.status === Status.ACTIVE
                                    ? Color.SUCCESS
                                    : brand?.status === Status.INACTIVE
                                    ? Color.WARNING
                                    : Color.ERROR
                                }
                              >
                                {brand?.status === Status.INACTIVE
                                  ? translate('status.inactive')
                                  : brand?.status === Status.ACTIVE
                                  ? translate('status.active')
                                  : translate('status.deActive')}
                              </Label>
                            </TableCell>
                          </TableRow>
                        ))}
                      </>
                    )}
                    {featuredBrands.length === 0 && (
                      <EmptyTable colNumber={6} model={translate('model.lowercase.brand')} />
                    )}
                  </TableBody>
                </Table>

                <Stack alignItems="end" mt={2}>
                  <Link
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      textDecoration: 'none',
                      color: '#000',
                    }}
                    to={PATH_ADMIN_APP.brand.list}
                  >
                    <MUILink underline="hover" variant="subtitle2" color="#000">
                      {translate('page.content.viewAll')}
                    </MUILink>
                    <KeyboardArrowRightIcon fontSize="small" />
                  </Link>
                </Stack>
              </TableContainer>
            </Box>
          </Card>

          <ListNewStores pathname={pathname} />
        </Stack>
      </Container>
    </>
  );
}

export default MBKCAdminDashboardPage;
