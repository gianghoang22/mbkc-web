/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
// @mui icon
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutIcon from '@mui/icons-material/Logout';
// @mui
import { Avatar, Button, Divider, MenuItem, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
// redux
import { logout, setUserInfo } from 'redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
//
import { Role } from 'common/enum';
import { MenuPopover } from 'components';
import { useLocales, useNavigate, usePopover } from 'hooks';
import account from 'mock/account';

function AccountPopover() {
  const { navigate, handleNavigateProfile } = useNavigate();
  const dispatch = useAppDispatch();
  const { translate } = useLocales();
  const { open, handleOpenMenu, handleCloseMenu } = usePopover();

  const { userAuth, isLogout } = useAppSelector((state) => state.auth);

  const MENU_OPTIONS = [
    {
      label: translate('header.account'),
      icon: <AccountCircleIcon sx={{ mr: 1 }} />,
    },
  ];

  const handleLogout = () => {
    handleCloseMenu();
    dispatch(logout(navigate));
    dispatch(setUserInfo);
  };

  useEffect(() => {
    if (isLogout) {
      handleLogout();
    }
  }, [isLogout]);

  return (
    <>
      <Button
        onClick={handleOpenMenu}
        sx={{
          px: 1,
          py: 0.2,
          color: (theme) => theme.palette.grey[800],
          bgcolor: (theme) => alpha(theme.palette.grey[300], 0.5),
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '6px',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
        endIcon={<KeyboardArrowDownIcon />}
      >
        <Avatar src={account.photoURL} alt="PhuSon" />
        <Stack alignItems="start" sx={{ ml: 1, my: 0.5 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {userAuth?.roleName === Role.MBKC_ADMIN
              ? translate('role.mbkcAdmin')
              : userAuth?.roleName === Role.BRAND_MANAGER
              ? translate('role.brandManager')
              : userAuth?.roleName === Role.KITCHEN_CENTER_MANAGER
              ? translate('role.kitchenCenterManager')
              : userAuth?.roleName === Role.CASHIER
              ? translate('role.cashier')
              : translate('header.account')}
          </Typography>
          <Typography variant="subtitle1" noWrap sx={{ textTransform: 'none', width: 140 }}>
            {userAuth?.email}
          </Typography>
        </Stack>
      </Button>

      <MenuPopover open={open} handleCloseMenu={handleCloseMenu} sx={{ width: 180 }}>
        {userAuth?.roleName !== Role.MBKC_ADMIN && (
          <>
            <Stack sx={{ p: 1 }}>
              {MENU_OPTIONS.map((option) => (
                <MenuItem
                  key={option.label}
                  onClick={() => {
                    handleCloseMenu();
                    handleNavigateProfile();
                  }}
                >
                  {option.icon}
                  {option.label}
                </MenuItem>
              ))}
            </Stack>
            <Divider sx={{ borderStyle: 'dashed' }} />
          </>
        )}

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          <LogoutIcon sx={{ mr: 1 }} />
          {translate('header.logout')}
        </MenuItem>
      </MenuPopover>
    </>
  );
}

export default AccountPopover;
