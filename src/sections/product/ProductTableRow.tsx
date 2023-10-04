import { sentenceCase } from 'change-case';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Avatar, IconButton, Switch, TableCell, TableRow, Typography } from '@mui/material';
// @mui icon
import MoreVertIcon from '@mui/icons-material/MoreVert';
// redux
import { useAppDispatch } from 'redux/configStore';
import { getProductDetail_local, setEditProduct } from 'redux/product/productSlice';
import { setRoutesToBack } from 'redux/routes/routesSlice';
//
import { Product } from '@types';
import { Color, Status } from 'common/enum';
import { ConfirmDialog, Label, Popover } from 'components';
import { useLocales, useModal, usePopover } from 'hooks';
import { PATH_BRAND_APP } from 'routes/paths';

interface ProductTableRowProps {
  product: Product;
  index: number;
  inTab?: boolean;
}

function ProductTableRow({ index, product, inTab = false }: ProductTableRowProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { handleOpen, isOpen } = useModal();
  const { open, handleOpenMenu, handleCloseMenu } = usePopover();

  const handleNavigateDetail = () => {
    navigate(PATH_BRAND_APP.product.root + `/detail/${product.productId}`);
    dispatch(setRoutesToBack(pathname));
    dispatch(getProductDetail_local(product));
  };

  const handleEdit = () => {
    navigate(PATH_BRAND_APP.product.root + `/update/${product.productId}`);
    dispatch(setEditProduct(product));
    dispatch(setRoutesToBack(pathname));
  };

  const handleDelete = () => {};

  const handleUpdateStatus = () => {
    // const paramUpdate: Params<StoreToUpdate> = {
    //   data: {
    //     name: store?.name,
    //     status: store.status === Status.ACTIVE ? Status.INACTIVE : Status.ACTIVE,
    //     logo: '',
    //     storeManagerEmail: store?.storeManagerEmail,
    //   },
    //   idParams: {
    //     brandId: store?.brand.brandId,
    //     storeId: store?.storeId,
    //   },
    //   optionParams: {
    //     itemsPerPage: rowsPerPage,
    //     currentPage: page,
    //   },
    //   pathname: pathname,
    //   navigate,
    // };
    // dispatch(updateStore(paramUpdate));
  };

  return (
    <>
      <TableRow hover tabIndex={-1} sx={{ cursor: 'pointer', height: '72.89px' }}>
        <TableCell width={60} align="center" onClick={handleNavigateDetail}>
          {index + 1}
        </TableCell>
        <TableCell component="th" padding="none" width={80} align="center" onClick={handleNavigateDetail}>
          <Avatar alt={product.name} src={product.image} />
        </TableCell>
        <TableCell component="th" scope="row" padding="none" onClick={handleNavigateDetail}>
          <Typography variant="subtitle2" width={160} noWrap>
            {product.name}
          </Typography>
        </TableCell>
        <TableCell align="left" width={160} onClick={handleNavigateDetail}>
          <Typography variant="body2" width={160} noWrap>
            {product.code}
          </Typography>
        </TableCell>
        <TableCell align="left" onClick={handleNavigateDetail}>
          {product.historicalPrice}
        </TableCell>
        <TableCell align="left" onClick={handleNavigateDetail}>
          {sentenceCase(product.category)}
        </TableCell>
        <TableCell align="left" onClick={handleNavigateDetail}>
          {sentenceCase(product.type)}
        </TableCell>
        <TableCell align="left" onClick={handleNavigateDetail}>
          <Label
            color={
              product?.status === Status.ACTIVE
                ? Color.SUCCESS
                : product?.status === Status.INACTIVE
                ? Color.WARNING
                : Color.ERROR
            }
          >
            {product?.status === Status.INACTIVE
              ? translate('status.inactive')
              : product?.status === Status.ACTIVE
              ? translate('status.active')
              : translate('status.deactive')}
          </Label>
        </TableCell>
        {!inTab && (
          <TableCell align="right">
            <Switch
              size="small"
              onClick={handleUpdateStatus}
              inputProps={{ 'aria-label': 'controlled' }}
              disabled={product.status === Status.DEACTIVE}
              checked={product.status === Status.INACTIVE || product.status === Status.DEACTIVE ? false : true}
              color={product?.status === Status.INACTIVE ? Color.WARNING : Color.SUCCESS}
            />
            <IconButton color="inherit" onClick={handleOpenMenu}>
              <MoreVertIcon />
            </IconButton>
          </TableCell>
        )}
      </TableRow>

      <Popover open={open} handleCloseMenu={handleCloseMenu} onEdit={handleEdit} onDelete={handleOpen} />

      {isOpen && (
        <ConfirmDialog
          open={isOpen}
          onClose={handleOpen}
          onAction={handleDelete}
          model={product.name}
          title={translate('dialog.confirmDeleteTitle', { model: translate('model.lowercase.product') })}
          description={translate('dialog.confirmDeleteContent', { model: translate('model.lowercase.product') })}
        />
      )}
    </>
  );
}

export default ProductTableRow;
