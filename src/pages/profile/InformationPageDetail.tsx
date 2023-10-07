import { Box, Stack, Typography } from '@mui/material';
import { Label } from 'components';
import { Color } from 'common/enum';

interface Props {
  name: string | undefined;
  address: string | undefined;
  managerEmail: string | undefined;
  status: string | undefined;
  logo: string | undefined;
}

function ProfileDetail({ name, address, logo, managerEmail, status }: Props) {
  return (
    <Stack direction="row" paddingLeft={2} paddingRight={2}>
      <Box marginTop={-5} width={100} height={100} borderRadius={50} component="img" src={logo} />
      <Stack marginLeft={2} marginTop={1} rowGap={0.5}>
        <Stack direction="row" spacing={3}>
          <Typography variant="subtitle1">{name}</Typography>
          <Label color={status === 'Active' ? Color.SUCCESS : Color.ERROR}>{status}</Label>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Typography mt={0.5} variant="caption">
            Adress:
          </Typography>
          <Typography mt={0.5} variant="caption" color="#919EAB">
            {address}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Typography mt={0.5} variant="caption">
            Manager email:
          </Typography>
          <Typography mt={0.5} variant="caption" color="#919EAB">
            {managerEmail}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default ProfileDetail;
