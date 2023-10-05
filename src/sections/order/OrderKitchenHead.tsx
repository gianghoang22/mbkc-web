import { Stack, Typography } from '@mui/material';
import { Color } from 'common/enum';
import { Label } from 'components';

interface Props {
  name: string;
  status: string;
  color?: Color;
  marginTop?: number;
}

function OrderKitchenHead({ name, status, color, marginTop = 1 }: Props) {
  return (
    <Stack direction="row" justifyContent="space-between" mt={marginTop}>
      <Stack direction="row" alignItems="center">
        <Typography variant="subtitle2" mr={1}>
          Kitchen:{' '}
        </Typography>
        <Typography variant="body2">{name}</Typography>
      </Stack>
      <Label color={color}>{status}</Label>
    </Stack>
  );
}

export default OrderKitchenHead;
