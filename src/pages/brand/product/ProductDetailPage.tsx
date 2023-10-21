import { ReactNode, useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// @mui
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { setRoutesToBack } from 'redux/routes/routesSlice';
import { deleteProduct, getProductDetail, setEditProduct } from 'redux/product/productSlice';
// section
import { ProductDetailPageSkeleton } from 'sections/product';
//
import { ProductTypeEnum } from '@types';
import { Color, Language, PopoverType, Role, Status } from 'common/enum';
import { ConfirmDialog, ContentLabel, ContentSpace, Page, Popover } from 'components';
import { useLocales, useModal, usePopover, useResponsive } from 'hooks';
import { PATH_BRAND_APP } from 'routes/paths';
import { fCurrencyVN } from 'utils';

function ProductDetailPage() {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const mdSm = useResponsive('up', 'md', 'md');
  const mdXs = useResponsive('up', 'xs', 'xs');
  const { translate, currentLang } = useLocales();
  const { handleOpen: handleOpenModal, isOpen: isOpenModal } = useModal();
  const { open: openPopover, handleOpenMenu, handleCloseMenu } = usePopover();

  const { userAuth } = useAppSelector((state) => state.auth);
  const { pathnameToBack } = useAppSelector((state) => state.routes);
  const { isLoading, product } = useAppSelector((state) => state.product);

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
          <ProductDetailPageSkeleton />
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
                    {product?.childrenProducts?.length !== undefined &&
                      product?.childrenProducts.map((childProduct) => (
                        <Typography key={childProduct.productId}>{childProduct.name}</Typography>
                      ))}
                  </Stack>
                </Stack>
              </Grid>
            </Grid>

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
