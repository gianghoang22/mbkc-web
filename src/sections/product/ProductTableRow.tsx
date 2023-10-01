import { sentenceCase } from 'change-case';
import { useNavigate } from 'react-router-dom';

// @mui
import { Avatar, IconButton, Switch, TableCell, TableRow, Typography } from '@mui/material';
// @mui icon
import MoreVertIcon from '@mui/icons-material/MoreVert';
//
import { Product } from '@types';
import { Color, Status } from 'common/enum';
import { Label, Popover } from 'components';
import { useLocales, useModal, usePopover } from 'hooks';
import { useAppDispatch } from 'redux/configStore';
import { setEditProduct } from 'redux/product/productSlice';
import { PATH_BRAND_APP } from 'routes/paths';
import ProductDetailModal from './ProductDetailModal';

interface ProductTableRowProps {
  product: Product;
  index: number;
  inTab?: boolean;
}

function ProductTableRow({ index, product, inTab = false }: ProductTableRowProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { translate } = useLocales();
  const { handleOpen, isOpen } = useModal();
  const { open, handleOpenMenu, handleCloseMenu } = usePopover();

  const handleEdit = () => {
    navigate(PATH_BRAND_APP.product.root + `/update/${product.productId}`);
    dispatch(setEditProduct(product));
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
      <TableRow hover tabIndex={-1} key={product.name} sx={{ cursor: 'pointer' }}>
        <TableCell width={60} align="center" onClick={handleOpen}>
          {index + 1}
        </TableCell>
        <TableCell component="th" padding="none" width={80} align="center" onClick={handleOpen}>
          <Avatar alt={product.name} src={product.image} />
        </TableCell>
        <TableCell component="th" scope="row" padding="none" onClick={handleOpen}>
          <Typography variant="subtitle2" width={160} noWrap>
            {product.name}
          </Typography>
        </TableCell>
        <TableCell align="left" width={160} onClick={handleOpen}>
          <Typography variant="body2" width={160} noWrap>
            {product.code}
          </Typography>
        </TableCell>
        <TableCell align="left" onClick={handleOpen}>
          {product.historicalPrice}
        </TableCell>
        <TableCell align="left" onClick={handleOpen}>
          {sentenceCase(product.category)}
        </TableCell>
        <TableCell align="left" onClick={handleOpen}>
          {sentenceCase(product.type)}
        </TableCell>
        <TableCell align="left">
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

      <Popover open={open} handleCloseMenu={handleCloseMenu} onEdit={handleEdit} onDelete={handleDelete} />

      {isOpen && <ProductDetailModal isOpen={isOpen} handleOpen={handleOpen} product={product} />}
    </>
  );
}

export default ProductTableRow;
