// @mui
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { MenuItem, Popover as MUIPopover, SxProps } from '@mui/material';

interface PopoverProps {
  sx?: SxProps;
  open: HTMLButtonElement | null;
  handleCloseMenu: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

function Popover({ open, handleCloseMenu, onEdit, onDelete, sx, ...other }: PopoverProps) {
  return (
    <>
      <MUIPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
            ...sx,
          },
        }}
        {...other}
      >
        <MenuItem onClick={onEdit}>
          <EditRoundedIcon fontSize="small" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }} onClick={onDelete}>
          <DeleteRoundedIcon fontSize="small" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </MUIPopover>
    </>
  );
}

export default Popover;
