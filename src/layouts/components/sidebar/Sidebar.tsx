import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { Box, Button, Drawer, Stack, Typography } from '@mui/material';
// hooks
import useResponsive from 'hooks/useResponsive';
// components
import { Logo, NavSection } from 'components';
import { navConfigBrandManager } from './configSidebar';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

interface SidebarProps {
  openNav: boolean;
  onCloseNav: () => void;
}

function Sidebar({ openNav, onCloseNav }: SidebarProps) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Stack
      justifyContent="space-between"
      sx={(theme) => ({
        height: '100vh',
        overflowY: 'scroll',
        '&::-webkit-scrollbar': { width: 5 },
        '&::-webkit-scrollbar-thumb': {
          borderRadius: 2,
          bgcolor: theme.palette.grey[500],
        },
      })}
    >
      <Box>
        <Box sx={{ px: 2.5, py: 2.5, display: 'inline-flex' }}>
          <Logo />
        </Box>

        <Box width="100%">
          {navConfigBrandManager.map((navConfigItem, index) => (
            <Box key={index} mb={1}>
              <Typography
                sx={{
                  ml: 1,
                  fontSize: '15px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  color: (theme) => theme.palette.grey[600],
                }}
              >
                {navConfigItem.missions}
              </Typography>
              <NavSection data={navConfigItem.listNav} />
            </Box>
          ))}
        </Box>
      </Box>

      <Stack alignItems="center" spacing={3} sx={{ p: 2.5 }}>
        <Box width={180} component="img" src="/assets/illustrations/illustration_store.svg" />

        <Button href="https://material-ui.com/store/items/minimal-dashboard/" target="_blank" variant="contained">
          Brand management
        </Button>
      </Stack>
    </Stack>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

export default Sidebar;
