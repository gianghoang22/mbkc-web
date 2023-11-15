// @mui
import { Avatar, Stack, Typography } from '@mui/material';
import { OrderDetails, Product } from 'common/models';
//
import { useLocales } from 'hooks';
import { formatCurrency } from 'utils';

interface OrderDetailItemProps {
  padding?: number;
  paddingTop?: number;
  quantity: number;
  noteContent: string;
  productDetail: Product;
  orderDetail: OrderDetails;
}

function OrderDetailItem({
  padding,
  paddingTop,
  productDetail,
  quantity,
  noteContent,
  orderDetail,
}: OrderDetailItemProps) {
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
        <Stack direction="row" justifyContent="space-between" width="17rem">
          <Typography>x{quantity}</Typography>
          <Typography>{formatCurrency(productDetail.sellingPrice)}</Typography>
        </Stack>
      </Stack>

      {orderDetail.extraOrderDetails.length > 0 && (
        <Typography variant="subtitle2">
          {translate('page.content.extraProducts')}:{' '}
          {orderDetail.extraOrderDetails.map((extraOrderDetail, index) => {
            const isLast = index === orderDetail.extraOrderDetails.length - 1;

            return (
              <Typography variant="caption" component="span">
                {extraOrderDetail.product.name} {isLast && '-'}
              </Typography>
            );
          })}
        </Typography>
      )}

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

export default OrderDetailItem;