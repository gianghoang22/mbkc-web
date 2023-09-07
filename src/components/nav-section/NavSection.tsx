import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Box, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
//
import { NavItem as NavItemInterface } from 'common/interface/NavItem';

const StyledNavItemIcon = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

interface NavItemProps {
  item: NavItemInterface;
}

function NavItem({ item }: NavItemProps) {
  const { title, path, icon } = item;

  return (
    <ListItemButton
      disableGutters
      component={RouterLink}
      to={path}
      sx={(theme) => ({
        ...theme.typography.body2,
        height: 48,
        position: 'relative',
        textTransform: 'capitalize',
        color: theme.palette.text.secondary,
        borderRadius: '6px',
        '&.active': {
          bgcolor: 'primary.lighter',
          color: theme.palette.primary.main,
          fontWeight: theme.typography.fontWeightBold,
        },
      })}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />
    </ListItemButton>
  );
}

interface NavSectionProps {
  data: NavItemInterface[];
}

function NavSection({ data = [], ...other }: NavSectionProps) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item, index) => (
          <NavItem key={index} item={item} />
        ))}
      </List>
    </Box>
  );
}

export default NavSection;
