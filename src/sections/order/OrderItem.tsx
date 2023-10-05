import { Divider, Typography } from '@mui/material';
import { Avatar } from '@mui/material';
import { Stack } from '@mui/material';

interface Props {
  padding?: number;
  haveKitchen?: boolean;
  paddingTop?: number;
  divider?: boolean;
  name: string;
  logoUrl: string;
  category: string;
  kitchen?: string;
  quantity: number;
  price: string;
  note?: boolean;
  noteContent?: string;
}

function OrderItem({
  padding,
  haveKitchen = true,
  paddingTop,
  divider,
  name,
  logoUrl,
  category,
  kitchen,
  quantity,
  price,
  note,
  noteContent,
}: Props) {
  return (
    <Stack>
      <Stack justifyContent="space-between" direction="row" padding={padding} paddingTop={paddingTop}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={'Product Image'} src={logoUrl} />
          <Stack direction="column">
            <Typography variant="body2" noWrap>
              {name}
            </Typography>
            <Typography variant="caption" sx={{ color: '#919EAB;' }} noWrap>
              {category}
            </Typography>
          </Stack>
        </Stack>
        {haveKitchen && <Typography>{kitchen}</Typography>}
        <Typography>x{quantity}</Typography>
        <Typography>{price}đ</Typography>
      </Stack>
      {note && (
        <Stack direction="row" alignItems="center" mt={1} spacing={1} mb={2}>
          <Typography variant="subtitle2">Note: </Typography>
          <Typography variant="caption">{noteContent}</Typography>
        </Stack>
      )}
      {divider && <Divider />}
    </Stack>
  );
}

export default OrderItem;
