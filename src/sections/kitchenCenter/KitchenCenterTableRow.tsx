import React, { useState } from 'react';
// @mui
import { Avatar, FormControlLabel, IconButton, MenuItem, Popover, Switch, TableCell, TableRow } from '@mui/material';
// @mui icon
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
//
import { KitchenCenter } from '@types';
import { sentenceCase } from 'change-case';
import { Color, Status } from 'common/enum';
import { Label } from 'components';
import { useDispatch } from 'react-redux';
import { deleteKitchenCenter } from 'redux/kitchenCenter/kitchenCenterSlice';
import { useNavigate } from 'react-router-dom';

interface KitchenCenterTableRowProps {
  handleNavigateDetail: (kitchenCenter: KitchenCenter, kitchenCenterId: number) => void;
  kitchenCenter: KitchenCenter;
  index: number;
}

function StoreTableRow(props: KitchenCenterTableRowProps) {
  const { index, kitchenCenter, handleNavigateDetail } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState<HTMLButtonElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleDeleteKitchenCenter = (kitchenCenterId: number) => {
    const params = {
      kitchenCenterId,
      navigate,
    };

    dispatch<any>(deleteKitchenCenter(params));
  };

  return (
    <>
      <TableRow hover tabIndex={-1} key={kitchenCenter.name} sx={{ cursor: 'pointer' }}>
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
          onClick={() => handleNavigateDetail(kitchenCenter, kitchenCenter.kitchenCenterId)}
        >
          <Avatar alt={kitchenCenter.name} src={kitchenCenter.logo} />
        </TableCell>
        <TableCell align="left" onClick={() => handleNavigateDetail(kitchenCenter, kitchenCenter.kitchenCenterId)}>
          {kitchenCenter.name}
        </TableCell>

        <TableCell align="left" onClick={() => handleNavigateDetail(kitchenCenter, kitchenCenter.kitchenCenterId)}>
          {kitchenCenter.address}
        </TableCell>
        <TableCell align="left">
          <FormControlLabel
            control={<Switch size="small" checked={kitchenCenter.status === Status.DEACTIVE ? false : true} />}
            label={
              <Label color={(kitchenCenter.status === Status.DEACTIVE && Color.ERROR) || Color.SUCCESS}>
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

        <MenuItem sx={{ color: 'error.main' }} onClick={() => handleDeleteKitchenCenter(kitchenCenter.kitchenCenterId)}>
          <DeleteRoundedIcon fontSize="small" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

export default StoreTableRow;
