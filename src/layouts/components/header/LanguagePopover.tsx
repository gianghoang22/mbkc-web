import { useState } from 'react';
// @mui
import { Box, IconButton, MenuItem, Popover, Stack } from '@mui/material';
import { alpha } from '@mui/material/styles';
import useLocales from 'hooks/useLocales';

// ----------------------------------------------------------------------

function LanguagePopover() {
  const { allLang, currentLang, onChangeLang } = useLocales();

  const [open, setOpen] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = (lng: string) => {
    onChangeLang(lng);
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
        <img src={currentLang.flag} alt={currentLang.label} width="28px" height="20px" />
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
          {allLang.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === currentLang.label}
              onClick={() => handleClose(option.value)}
            >
              <Box component="img" alt={option.label} src={option.flag} sx={{ width: 28, mr: 2 }} />

              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </Popover>
    </>
  );
}

export default LanguagePopover;
