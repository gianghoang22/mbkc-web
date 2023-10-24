/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// @mui
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Box,
  Button,
  Card,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Typography,
} from '@mui/material';
// redux
import { setRoutesToBack } from 'redux/routes/routesSlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { getPartnerProductDetail } from 'redux/partnerProduct/partnerProductSlice';
import { deleteProduct, getProductDetail, setEditProduct } from 'redux/product/productSlice';
// section
import { StorePartnerTableDetailRowSkeleton } from 'sections/storePartner';
import { ProductDetailPageSkeleton, ProductTableRow } from 'sections/product';
//
import { PATH_BRAND_APP } from 'routes/paths';
import { fCurrencyVN, getComparator, stableSort } from 'utils';
import { OrderSort, ProductTable, ProductTypeEnum } from '@types';
import { Color, Language, PopoverType, Role, Status } from 'common/enum';
import { useConfigHeadTable, useLocales, useModal, usePagination, usePopover, useResponsive } from 'hooks';
import { CommonTableHead, ConfirmDialog, ContentLabel, ContentSpace, EmptyTable, Page, Popover } from 'components';

function ProductDetailPage() {
  const { id: productId } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const mdSm = useResponsive('up', 'md', 'md');
  const mdXs = useResponsive('up', 'xs', 'xs');

  const { pathname } = useLocation();
  const { translate, currentLang } = useLocales();
  const { productHeadCells } = useConfigHeadTable();
  const { handleOpen: handleOpenModal, isOpen: isOpenModal } = useModal();
  const { open: openPopover, handleOpenMenu, handleCloseMenu } = usePopover();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const { userAuth } = useAppSelector((state) => state.auth);
  const { pathnameToBack } = useAppSelector((state) => state.routes);
  const { isLoading, product } = useAppSelector((state) => state.product);
  const { partnerProduct } = useAppSelector((state) => state.partnerProduct);

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof ProductTable>('name');

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof ProductTable) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const childProductList =
    product?.childrenProducts && product.type === ProductTypeEnum.PARENT ? product?.childrenProducts : [];

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - childProductList.length) : 0;

  const childProductRows = useMemo(
    () =>
      stableSort(childProductList, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, childProductList]
  );

  const paramPartnerProduct = useMemo(() => {
    return {
      productId: partnerProduct?.productId,
      partnerId: partnerProduct?.partnerId,
      storeId: partnerProduct?.storeId,
      navigate,
    };
  }, [partnerProduct?.productId, partnerProduct?.partnerId, partnerProduct?.storeId]);

  useEffect(() => {
    if (pathnameToBack === PATH_BRAND_APP.partnerProduct.list) {
      dispatch(getPartnerProductDetail(paramPartnerProduct));
    }
  }, [paramPartnerProduct]);

  const params = useMemo(() => {
    return {
      productId,
      navigate,
    };
  }, [productId, navigate]);

  useEffect(() => {
    dispatch(getProductDetail(params));
  }, [dispatch, navigate, params]);

  const handleDelete = () => {
    handleOpenModal(product?.name);
    dispatch(
      deleteProduct({
        idParams: { productId: product?.productId },
        pathname: pathname,
        navigate,
      })
    );
  };

  return (
    <>
      <Page
        title={translate('page.title.detail', {
          model:
            currentLang.value === Language.ENGLISH
              ? translate('model.capitalize.product')
              : translate('model.lowercase.product'),
        })}
        pathname={pathname}
        navigateDashboard={PATH_BRAND_APP.root}
        actions={() => {
          const listAction: ReactNode[] =
            userAuth?.roleName === Role.BRAND_MANAGER && !(product?.status === Status.DEACTIVE)
              ? [
                  <Button
                    color="inherit"
                    endIcon={<KeyboardArrowDownIcon />}
                    style={{
                      backgroundColor: '#000',
                      color: '#fff',
                    }}
                    sx={{
                      '.css-1dat9h6-MuiButtonBase-root-MuiButton-root:hover': {
                        backgroundColor: 'rgba(145, 158, 171, 0.08)',
                      },
                    }}
                    disabled={product?.status === Status.DEACTIVE}
                    onClick={handleOpenMenu}
                  >
                    {translate('button.menuAction')}
                  </Button>,
                ]
              : [];
          return listAction;
        }}
      >
        {isLoading ? (
          <ProductDetailPageSkeleton lengthChildProducts={childProductRows?.length} />
        ) : (
          <>
            <Grid container columnSpacing={5} rowSpacing={5}>
              <Grid item xs={12} sm={4} md={4}>
                <Stack width="100%" alignItems="center" justifyContent="center">
                  <img
                    src={product?.image}
                    alt={product?.name}
                    style={{ borderRadius: 16, width: mdSm ? '100%' : mdXs ? 300 : 241, objectFit: 'fill' }}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={8} md={8}>
                <Stack gap={2}>
                  <Box>
                    <Typography variant="h6" mb={1}>
                      {translate('table.uppercase.code')}: <Typography component="span">{product?.code}</Typography>
                    </Typography>
                    <Typography variant="h4">{product?.name}</Typography>
                    <Typography variant="body1" textAlign="justify">
                      {product?.description}
                    </Typography>
                  </Box>

                  <Stack gap={2} mt={2}>
                    <ContentLabel
                      divider={false}
                      title={translate('table.status')}
                      color={
                        product?.status === Status.ACTIVE
                          ? Color.SUCCESS
                          : product?.status === Status.INACTIVE
                          ? Color.WARNING
                          : Color.ERROR
                      }
                      content={
                        product?.status === Status.INACTIVE
                          ? translate('status.inactive')
                          : product?.status === Status.ACTIVE
                          ? translate('status.active')
                          : translate('status.deactive')
                      }
                    />
                    <ContentLabel title={translate('table.type')} color={Color.INFO} content={product?.type} />

                    {product?.size !== null ? (
                      <ContentSpace title={translate('table.size')} content={product?.size} />
                    ) : (
                      <></>
                    )}
                    <ContentSpace title={translate('model.capitalizeOne.category')} content={product?.categoryName} />
                    {product?.type !== ProductTypeEnum.PARENT && (
                      <>
                        <ContentSpace
                          title={translate('table.historicalPrice')}
                          content={fCurrencyVN(product?.historicalPrice ? product?.historicalPrice : '') + ' đ'}
                        />
                        <ContentSpace
                          title={translate('table.sellingPrice')}
                          content={fCurrencyVN(product?.sellingPrice ? product?.sellingPrice : '') + ' đ'}
                        />
                        <ContentSpace
                          title={translate('table.discountPrice')}
                          content={fCurrencyVN(product?.discountPrice ? product?.discountPrice : '') + ' đ'}
                        />
                      </>
                    )}
                  </Stack>
                </Stack>
              </Grid>
            </Grid>

            {product?.type === ProductTypeEnum.PARENT && (
              <Card sx={{ mt: 7 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" px={3} py={2}>
                  <Typography variant="h6">
                    {translate('page.title.list', { model: translate('model.lowercase.childProduct') })}
                  </Typography>
                </Stack>

                <Box sx={{ width: '100%' }}>
                  <Paper sx={{ width: '100%', mb: 2 }}>
                    <TableContainer>
                      <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                        <CommonTableHead<ProductTable>
                          hideCategory
                          hideType
                          showAction
                          order={order}
                          orderBy={orderBy}
                          headCells={productHeadCells}
                          onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                          {childProductRows?.map((productChild, index) => {
                            return (
                              <ProductTableRow
                                index={index}
                                key={productChild.productId}
                                setPage={setPage}
                                page={page + 1}
                                rowsPerPage={rowsPerPage}
                                length={childProductRows?.length}
                                product={productChild}
                                isInDetail
                              />
                            );
                          })}
                          {emptyRows > 0 ||
                            (childProductRows?.length === 0 && (
                              <EmptyTable
                                colNumber={productHeadCells.length + 2}
                                model={translate('model.lowercase.childProduct')}
                              />
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={product?.childrenProducts ? product?.childrenProducts?.length : 3}
                      page={page}
                      rowsPerPage={rowsPerPage}
                      labelRowsPerPage={translate('table.rowsPerPage')}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Paper>
                </Box>
              </Card>
            )}

            {product?.type === ProductTypeEnum.PARENT && (
              <Card sx={{ mt: 7 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" px={3} py={2}>
                  <Typography variant="h6">{translate('page.content.productInPartner')}</Typography>
                </Stack>

                <Box sx={{ width: '100%' }}>
                  <Paper sx={{ width: '100%', mb: 2 }}>
                    <TableContainer>
                      <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                        <CommonTableHead<ProductTable>
                          hideCategory
                          hideType
                          showAction
                          order={order}
                          orderBy={orderBy}
                          headCells={productHeadCells}
                          onRequestSort={handleRequestSort}
                        />
                        {isLoading ? (
                          <StorePartnerTableDetailRowSkeleton />
                        ) : (
                          <TableBody>
                            {product?.childrenProducts?.map((productChild, index) => {
                              return (
                                <ProductTableRow
                                  index={index}
                                  key={productChild.productId}
                                  setPage={setPage}
                                  page={page + 1}
                                  rowsPerPage={rowsPerPage}
                                  length={product?.childrenProducts?.length}
                                  product={productChild}
                                  isInDetail
                                />
                              );
                            })}
                            {product?.childrenProducts?.length === 0 && (
                              <EmptyTable
                                colNumber={productHeadCells.length + 2}
                                model={translate('model.lowercase.childProduct')}
                              />
                            )}
                          </TableBody>
                        )}
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={product?.childrenProducts ? product?.childrenProducts?.length : 3}
                      page={page}
                      rowsPerPage={rowsPerPage}
                      labelRowsPerPage={translate('table.rowsPerPage')}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Paper>
                </Box>
              </Card>
            )}

            <Box mt={10} textAlign="right">
              <Button color="inherit" variant="outlined" onClick={() => navigate(pathnameToBack)}>
                {translate('button.back')}
              </Button>
            </Box>
          </>
        )}
      </Page>

      <Popover
        type={PopoverType.ALL}
        open={openPopover}
        handleCloseMenu={handleCloseMenu}
        onDelete={handleOpenModal}
        onEdit={() => {
          navigate(PATH_BRAND_APP.product.root + `/updation/${productId}`);
          dispatch(setRoutesToBack(pathname));
          dispatch(setEditProduct(product));
        }}
      />

      {isOpenModal && (
        <ConfirmDialog
          open={isOpenModal}
          onClose={handleOpenModal}
          onAction={handleDelete}
          model={product?.name}
          title={translate('dialog.confirmDeleteTitle', { model: translate('model.lowercase.product') })}
          description={translate('dialog.confirmDeleteContent', { model: translate('model.lowercase.product') })}
        />
      )}
    </>
  );
}

export default ProductDetailPage;
