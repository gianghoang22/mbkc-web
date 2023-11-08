// @mui
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import { Box, Card, Stack, Typography, alpha } from '@mui/material';
// section
import { StyledIcon } from 'sections/dashboard/AppWidgetSummary';
//
import { Color, Role } from 'common/enum';
import { Label } from 'components';
import { useLocales } from 'hooks';
import { useAppSelector } from 'redux/configStore';

function MainBalanceCard() {
  const { translate } = useLocales();

  const { userAuth } = useAppSelector((state) => state.auth);

  return (
    <Card sx={{ p: 1, boxShadow: 'none', border: 1, borderColor: (theme) => theme.palette.grey[400] }}>
      <Box padding={2} paddingLeft={3} paddingRight={3}>
        <Stack direction="row" justifyContent="space-between">
          <Stack>
            <Typography variant="h5" color={(theme) => theme.palette.grey[600]} letterSpacing={1}>
              {translate('page.content.mainBalance')}
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
          <Typography variant="h6">
            {userAuth?.roleName === Role.KITCHEN_CENTER_MANAGER
              ? translate('model.capitalize.kitchenCenter')
              : translate('model.capitalize.cashier')}
          </Typography>
          <Label color={Color.PRIMARY}>27/8/2023</Label>
        </Stack>
      </Box>
    </Card>
  );
}

export default MainBalanceCard;
