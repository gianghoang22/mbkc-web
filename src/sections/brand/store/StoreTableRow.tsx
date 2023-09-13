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
import { Store } from '@types';
import { sentenceCase } from 'change-case';
import { Color } from 'common/enum';
import { Label } from 'components';

interface StoreTableRowProps {
  handleNavigateDetail: (storeId: number) => void;
  store: Store;
  index: number;
}

function StoreTableRow(props: StoreTableRowProps) {
  const { index, store, handleNavigateDetail } = props;

  const [open, setOpen] = useState<HTMLButtonElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} key={store.title} sx={{ cursor: 'pointer' }}>
        <TableCell width={60} align="center" onClick={() => handleNavigateDetail(store.storeId)}>
          {index + 1}
        </TableCell>
        <TableCell component="th" scope="row" padding="none" onClick={() => handleNavigateDetail(store.storeId)}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={store.title} src={store.imageUrl} />
            <Typography variant="subtitle2" sx={{ width: 150 }} noWrap>
              {store.title}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell align="left" onClick={() => handleNavigateDetail(store.storeId)}>
          {store.kitchenCenter}
        </TableCell>
        <TableCell align="left" onClick={() => handleNavigateDetail(store.storeId)}>
          {moment(store.startDay).format('ddd, D MMM YYYY').toString()}
        </TableCell>
        <TableCell align="left" onClick={() => handleNavigateDetail(store.storeId)}>
          {moment(store.endDay).format('ddd, D MMM YYYY').toString()}
        </TableCell>
        <TableCell align="left">
          <FormControlLabel
            control={<Switch size="small" checked={store.status === 'inactive' ? false : true} />}
            label={
              <Label color={(store.status === 'inactive' && Color.ERROR) || Color.SUCCESS}>
                {sentenceCase(store.status)}
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
