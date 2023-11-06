import { Divider, Typography } from '@mui/material';
import { Avatar } from '@mui/material';
import { Stack } from '@mui/material';
import { useLocales } from 'hooks';
import { formatCurrency } from 'utils';

interface Props {
  padding?: number;
  paddingTop?: number;
  divider?: boolean;
  name: string;
  logoUrl: string;
  category: string;
  quantity: number;
  price: number;
  note?: boolean;
  noteContent?: string;
}

function OrderItem({
  padding,
  paddingTop,
  divider,
  name,
  logoUrl,
  category,
  quantity,
  price,
  note,
  noteContent,
}: Props) {
  const { translate } = useLocales();

  return (
    <Stack>
      <Stack justifyContent="space-between" direction="row" padding={padding} paddingTop={paddingTop}>
        <Stack direction="row" alignItems="center" spacing={2} width={200}>
          <Avatar alt="Product Image" src={logoUrl} />
          <Stack direction="column">
            <Typography variant="body2" noWrap>
              {name}
            </Typography>
            <Typography variant="caption" sx={{ color: (theme) => theme.palette.grey[500] }} noWrap>
              {category}
            </Typography>
          </Stack>
        </Stack>
        <Typography maxWidth={40} align="left">
          x{quantity}
        </Typography>
        <Typography>{formatCurrency(price)}</Typography>
      </Stack>
      {note && (
        <Stack direction="row" alignItems="center" mt={1} spacing={1} mb={2}>
          <Typography variant="subtitle2">{translate('page.content.note')}: </Typography>
          <Typography variant="caption">{noteContent}</Typography>
        </Stack>
      )}
      {divider && <Divider />}
    </Stack>
  );
}

export default OrderItem;
