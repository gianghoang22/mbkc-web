import { Avatar, Stack, Typography } from '@mui/material';
import { Color, Status } from 'common/enum';
import { Label } from 'components';
import { useLocales } from 'hooks';

interface InformationCardProps {
  name: string | undefined;
  address: string | undefined;
  managerEmail: string | undefined;
  status: string | undefined;
  logo: string | undefined;
}

function InformationCard({ logo, name, address, managerEmail, status }: InformationCardProps) {
  const { translate } = useLocales();

  return (
    <Stack direction="row" alignItems="end" gap={2} px={4} pt={4}>
      <Avatar src={logo} alt={name} sx={{ width: 150, height: 150 }} />
      <Stack width="100%" rowGap={0.5}>
        <Stack direction="row" gap={5}>
          <Typography variant="h6">{name}</Typography>
          <Label color={status === Status.ACTIVE ? Color.SUCCESS : Color.ERROR}>
            {status === Status.INACTIVE
              ? translate('status.inactive')
              : status === Status.ACTIVE
              ? translate('status.active')
              : ''}
          </Label>
        </Stack>

        <Typography variant="body1">
          {translate('table.address')}:{' '}
          <Typography component="span" variant="body1" color={(theme) => theme.palette.grey[600]}>
            {address}
          </Typography>
        </Typography>

        <Typography variant="body1">
          {translate('table.manageEmail')}:{' '}
          <Typography component="span" variant="body1" color={(theme) => theme.palette.grey[600]}>
            {managerEmail}
          </Typography>
        </Typography>
      </Stack>
    </Stack>
  );
}

export default InformationCard;
