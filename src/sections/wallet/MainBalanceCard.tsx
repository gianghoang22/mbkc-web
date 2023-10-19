import { Box, Card, Stack, Typography, alpha } from '@mui/material';
import { Color } from 'common/enum';
import { Label } from 'components';
import { StyledIcon } from 'sections/dashboard/AppWidgetSummary';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';

function MainBalanceCard() {
  return (
    <Card>
      <Box padding={2} paddingLeft={3} paddingRight={3}>
        <Stack direction="row" justifyContent="space-between">
          <Stack>
            <Typography variant="h5" color={(theme) => theme.palette.grey[600]} letterSpacing={1}>
              Main Balance
            </Typography>
            <Typography variant="h3">16.520.000 đ</Typography>
          </Stack>
          <Stack>
            <StyledIcon
              sx={{
                color: (theme: any) => theme.palette[Color.PRIMARY].dark,
                backgroundImage: (theme: any) =>
                  `linear-gradient(135deg, ${alpha(theme.palette[Color.PRIMARY].dark, 0)} 0%, ${alpha(
                    theme.palette[Color.PRIMARY].dark,
                    0.24
                  )} 100%)`,
              }}
            >
              <AccountBalanceWalletOutlinedIcon fontSize="large" />
            </StyledIcon>
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6">Kitchen Center</Typography>
          <Label color={Color.PRIMARY}>27/8/2023</Label>
        </Stack>
      </Box>
    </Card>
  );
}

export default MainBalanceCard;
