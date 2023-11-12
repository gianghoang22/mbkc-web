// @mui
import { Avatar, Stack, Typography } from '@mui/material';
import { Product } from 'common/models';
//
import { useLocales } from 'hooks';
import { formatCurrency } from 'utils';

interface OrderItemProps {
  padding?: number;
  paddingTop?: number;
  quantity: number;
  noteContent: string;
  productDetail: Product;
}

function OrderItem({ padding, paddingTop, productDetail, quantity, noteContent }: OrderItemProps) {
  const { translate } = useLocales();

  return (
    <Stack gap={1}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" p={padding} pt={paddingTop}>
        <Stack direction="row" alignItems="center" gap={2}>
          <Avatar alt={productDetail.name} src={productDetail.image} />
          <Stack direction="column">
            <Typography noWrap>{productDetail.name}</Typography>
            <Typography variant="caption" sx={{ color: (theme) => theme.palette.grey[500] }} noWrap>
              {productDetail.categoryName}
            </Typography>
          </Stack>
        </Stack>
        <Typography>x{quantity}</Typography>
        <Typography>{formatCurrency(productDetail.sellingPrice)}</Typography>
      </Stack>

      {noteContent && (
        <Typography variant="subtitle2">
          {translate('page.content.note')}:{' '}
          <Typography variant="caption" component="span">
            {noteContent}
          </Typography>
        </Typography>
      )}
    </Stack>
  );
}

export default OrderItem;
