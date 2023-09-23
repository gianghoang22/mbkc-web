import { sentenceCase } from 'change-case';
import { useNavigate } from 'react-router-dom';

// @mui
import { Avatar, FormControlLabel, IconButton, Switch, TableCell, TableRow, Typography } from '@mui/material';
// @mui icon
import MoreVertIcon from '@mui/icons-material/MoreVert';
//
import { Product } from '@types';
import { Color, Status } from 'common/enum';
import { Label, Popover } from 'components';
import { useModal, usePopover } from 'hooks';
import { PATH_BRAND_APP } from 'routes/paths';
import ProductDetailModal from './ProductDetailModal';
import { useAppDispatch } from 'redux/configStore';
import { setEditProduct } from 'redux/product/productSlice';

interface ProductTableRowProps {
  product: Product;
  index: number;
}

function ProductTableRow({ index, product }: ProductTableRowProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { handleOpen, isOpen } = useModal();
  const { open, handleOpenMenu, handleCloseMenu } = usePopover();

  const handleEdit = () => {
    navigate(PATH_BRAND_APP.product.root + `/update/${product.productId}`);
    dispatch(setEditProduct(product));
  };

  const handleDelete = () => {};

  return (
    <>
      <TableRow hover tabIndex={-1} key={product.name} sx={{ cursor: 'pointer' }}>
        <TableCell width={60} align="center" onClick={handleOpen}>
          {index + 1}
        </TableCell>
        <TableCell component="th" padding="none" width={70} align="center" onClick={handleOpen}>
          <Avatar alt={product.name} src={product.image} />
        </TableCell>
        <TableCell component="th" scope="row" padding="none" onClick={handleOpen}>
          <Typography variant="subtitle2" sx={{ width: 170 }} noWrap>
            {product.name}
          </Typography>
        </TableCell>
        <TableCell align="left" onClick={handleOpen}>
          {product.code}
        </TableCell>
        <TableCell align="left" onClick={handleOpen}>
          {product.historicalPrice}
        </TableCell>
        <TableCell align="left" onClick={handleOpen}>
          {sentenceCase(product.categoryId)}
        </TableCell>
        <TableCell align="left" onClick={handleOpen}>
          <Label color={Color.PRIMARY}>{sentenceCase(product.type)}</Label>
        </TableCell>
        <TableCell align="left">
          <FormControlLabel
            control={<Switch size="small" checked={product.status === 0 ? false : true} />}
            label={
              <Label color={(product.status === 0 && Color.ERROR) || Color.SUCCESS}>
                {sentenceCase(product.status === 0 ? Status.INACTIVE : Status.ACTIVE)}
              </Label>
            }
          />
        </TableCell>
        <TableCell align="right">
          <IconButton color="inherit" onClick={handleOpenMenu}>
            <MoreVertIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover open={open} handleCloseMenu={handleCloseMenu} onEdit={handleEdit} onDelete={handleDelete} />

      {isOpen && <ProductDetailModal isOpen={isOpen} handleOpen={handleOpen} product={product} />}
    </>
  );
}

export default ProductTableRow;
