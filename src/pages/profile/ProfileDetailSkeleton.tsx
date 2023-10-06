import { Box, Button, Stack, Typography, Skeleton } from '@mui/material';
import { Label } from 'components';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

function ProfileDetail() {
  return (
    <Stack direction="row" paddingLeft={2} paddingRight={2}>
      <Box marginTop={-5} width={100} height={100} borderRadius={50} component="img" />
      <Stack direction="row" justifyContent="space-between" width="100%">
        <Stack marginLeft={2} marginTop={1} rowGap={0.5}>
          <Stack direction="row" spacing={3}>
            <Typography variant="subtitle1">
              <Skeleton />
            </Typography>
            <Label>
              <Skeleton />
            </Label>
          </Stack>

          <Stack direction="row" spacing={1}>
            <Typography mt={0.5} variant="caption">
              Adress:
            </Typography>
            <Typography mt={0.5} variant="caption" color="#919EAB">
              <Skeleton />
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1}>
            <Typography mt={0.5} variant="caption">
              Manager email:
            </Typography>
            <Typography mt={0.5} variant="caption" color="#919EAB">
              <Skeleton />
            </Typography>
          </Stack>
        </Stack>
        <Stack mt={1}>
          <Button variant="outlined" startIcon={<SettingsOutlinedIcon />}>
            Settings
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default ProfileDetail;
