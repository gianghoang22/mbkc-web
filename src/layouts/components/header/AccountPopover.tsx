import { useNavigate } from 'react-router-dom';
// @mui icon
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutIcon from '@mui/icons-material/Logout';
// @mui
import { Avatar, Button, Divider, MenuItem, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
//
import { MenuPopover } from 'components';
import { useLocales, usePopover } from 'hooks';
import account from 'mock/account';
import { PATH_AUTH } from 'routes/paths';

const MENU_OPTIONS = [
  {
    label: 'My Profile',
    link: '/dashboard/profile',
    icon: <AccountCircleIcon sx={{ mr: 1 }} />,
  },
];

function AccountPopover() {
  const navigate = useNavigate();
  const { translate } = useLocales();
  const { open, handleOpenMenu, handleCloseMenu } = usePopover();

  const handleLogout = () => {
    navigate(PATH_AUTH.login);
    // dispatch(logoutAccount(navigate));
    handleCloseMenu();
  };

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
            {translate('header.brand manager')}
          </Typography>
          <Typography variant="subtitle1" noWrap>
            Tran Phu Son
          </Typography>
        </Stack>
      </Button>

      <MenuPopover open={open} handleCloseMenu={handleCloseMenu} sx={{ width: 180 }}>
        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              onClick={() => {
                handleCloseMenu();
                navigate(option.link);
              }}
            >
              {option.icon}
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          <LogoutIcon sx={{ mr: 1 }} />
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
}

export default AccountPopover;
