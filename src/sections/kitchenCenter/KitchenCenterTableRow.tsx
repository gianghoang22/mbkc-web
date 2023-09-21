import React, { useState } from 'react';
// @mui
import {
  Avatar,
  FormControlLabel,
  IconButton,
  MenuItem,
  Popover,
  Stack,
  Switch,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
// @mui icon
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
//
import { KitchenCenter } from '@types';
import { sentenceCase } from 'change-case';
import { Color } from 'common/enum';
import { Label } from 'components';

interface KitchenCenterTableRowProps {
  handleNavigateDetail: (kitchenCenter: KitchenCenter, kitchenCenterId: number) => void;
  kitchenCenter: KitchenCenter;
  index: number;
}

function StoreTableRow(props: KitchenCenterTableRowProps) {
  const { index, kitchenCenter, handleNavigateDetail } = props;

  const [open, setOpen] = useState<HTMLButtonElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} key={kitchenCenter.title} sx={{ cursor: 'pointer' }}>
        <TableCell
          width={60}
          align="center"
          onClick={() => handleNavigateDetail(kitchenCenter, kitchenCenter.kitchenCenterId)}
        >
          {index + 1}
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          padding="none"
          onClick={() => handleNavigateDetail(kitchenCenter, kitchenCenter.kitchenCenterId)}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={kitchenCenter.title} src={kitchenCenter.imageUrl} />
            <Typography variant="subtitle2" sx={{ width: 150 }} noWrap>
              {kitchenCenter.title}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell align="left" onClick={() => handleNavigateDetail(kitchenCenter, kitchenCenter.kitchenCenterId)}>
          {kitchenCenter.address}
        </TableCell>
        <TableCell align="left" onClick={() => handleNavigateDetail(kitchenCenter, kitchenCenter.kitchenCenterId)}>
          {kitchenCenter.numberOfKitchens}
        </TableCell>
        <TableCell align="left">
          <FormControlLabel
            control={<Switch size="small" checked={kitchenCenter.status === 'inactive' ? false : true} />}
            label={
              <Label color={(kitchenCenter.status === 'inactive' && Color.ERROR) || Color.SUCCESS}>
                {sentenceCase(kitchenCenter.status)}
              </Label>
            }
          />
        </TableCell>
        <TableCell align="right">
          <IconButton color="inherit" onClick={handleOpenMenu}>
            <MoreVertIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
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
          },
        }}
      >
        <MenuItem>
          <EditRoundedIcon fontSize="small" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <DeleteRoundedIcon fontSize="small" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

export default StoreTableRow;
