import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, Stack, IconButton, Popover } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { locales } from 'language/i18n/i18n';

// ----------------------------------------------------------------------

const LANGS = [
  {
    value: 'en',
    label: 'Eng',
    icon: '/assets/icons/ic_flag_en.svg',
  },
  {
    value: 'vi',
    label: 'Vie',
    icon: '/assets/icons/ic_flag_vn.svg',
  },
];

// ----------------------------------------------------------------------

function LanguagePopover() {
  const [open, setOpen] = useState<null | HTMLElement>(null);
  const { i18n } = useTranslation();
  const currentLanguage = locales[i18n.language as keyof typeof locales];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = (lng: string) => {
    changeLanguage(lng);
    setOpen(null);
  };

  const bgColorStyle = open
    ? {
        bgcolor: (theme: any) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
      }
    : {};

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...bgColorStyle,
        }}
      >
        <img src={currentLanguage.flag} alt={LANGS[0].label} />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            mt: 1.5,
            ml: 0.75,
            width: 120,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Stack spacing={0.75}>
          {LANGS.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === currentLanguage.label}
              onClick={() => handleClose(option.value)}
            >
              <Box component="img" alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} />

              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </Popover>
    </>
  );
}

export default LanguagePopover;
