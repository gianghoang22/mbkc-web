import moment from 'moment';
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
import { Kitchen } from '@types';
import { sentenceCase } from 'change-case';
import { Color } from 'common/enum';
import { Label } from 'components';

interface KitchenTableRowProps {
  // handleNavigateDetail: (kitchenCenter: KitchenCenter, kitchenCenterId: number) => void;?
  kitchen: Kitchen;
  index: number;
}

function KitchenTableRow(props: KitchenTableRowProps) {
  const { index, kitchen } = props;

  const [open, setOpen] = useState<HTMLButtonElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} key={kitchen.kitchenId} sx={{ cursor: 'pointer' }}>
        <TableCell
          width={60}
          align="center"
          // onClick={() => handleNavigateDetail(kitchenCenter, kitchenCenter.kitchenCenterId)}
        >
          {index + 1}
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          padding="none"
          // onClick={() => handleNavigateDetail(kitchenCenter, kitchenCenter.kitchenCenterId)}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={kitchen.kitchenName} src={kitchen.kitchenImgUrl} />
          </Stack>
        </TableCell>
        <TableCell align="left">{kitchen.kitchenName}</TableCell>
        <TableCell align="center">
          <Avatar alt={kitchen.brandName} src={kitchen.brandImgUrl} />
        </TableCell>
        <TableCell align="left">{kitchen.brandName}</TableCell>
        <TableCell align="left">
          <FormControlLabel
            control={<Switch size="small" checked={kitchen.status === 'inactive' ? false : true} />}
            label={
              <Label color={(kitchen.status === 'inactive' && Color.ERROR) || Color.SUCCESS}>
                {sentenceCase(kitchen.status)}
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

export default KitchenTableRow;
