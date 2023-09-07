import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui icon
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
// @mui
import { Avatar, Button, Divider, MenuItem, Popover, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
//
import account from 'mock/account';

const MENU_OPTIONS = [
  {
    label: 'My Profile',
    link: '/dashboard/profile',
    icon: <AccountCircleIcon sx={{ mr: 1 }} />,
  },
];

function AccountPopover() {
  const navigate = useNavigate();

  const [open, setOpen] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleLogout = () => {
    navigate('/login');
    // dispatch(logoutAccount(navigate));
    setOpen(null);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        sx={{
          px: 1,
          py: 0,
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
            Brand manager
          </Typography>
          <Typography variant="subtitle1" noWrap>
            Tran Phu Son
          </Typography>
        </Stack>
      </Button>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              onClick={() => {
                handleClose();
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
      </Popover>
    </>
  );
}

export default AccountPopover;
