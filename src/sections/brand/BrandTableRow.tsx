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
} from '@mui/material';
// @mui icon
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
//
import { Brand } from '@types';
import { sentenceCase } from 'change-case';
import { Color } from 'common/enum';
import { Label } from 'components';
import { useNavigate } from 'react-router-dom';
import { PATH_ADMIN_APP } from 'routes/paths';

interface BrandTableRowProps {
  handleNavigateDetail: (brand: Brand, brandId: number) => void;
  brand: Brand;
  index: number;
}

function BrandTableRow(props: BrandTableRowProps) {
  const { index, brand, handleNavigateDetail } = props;
  const navigate = useNavigate();

  const [open, setOpen] = useState<HTMLButtonElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} key={brand.brandName} sx={{ cursor: 'pointer' }}>
        <TableCell width={60} align="center" onClick={() => handleNavigateDetail(brand, brand.brandId)}>
          {index + 1}
        </TableCell>
        <TableCell component="th" scope="row" onClick={() => handleNavigateDetail(brand, brand.brandId)}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={brand.brandName} src={brand.brandImgUrl} />
          </Stack>
        </TableCell>
        <TableCell align="left" onClick={() => handleNavigateDetail(brand, brand.brandId)}>
          {brand.brandName}
        </TableCell>
        <TableCell align="left" onClick={() => handleNavigateDetail(brand, brand.brandId)}>
          {brand.address}
        </TableCell>
        <TableCell align="left" onClick={() => handleNavigateDetail(brand, brand.brandId)}>
          {brand.brandManager}
        </TableCell>
        <TableCell align="left">
          <FormControlLabel
            control={<Switch size="small" checked={brand.status === 'inactive' ? false : true} />}
            label={
              <Label color={(brand.status === 'inactive' && Color.ERROR) || Color.SUCCESS}>
                {sentenceCase(brand.status)}
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
        <MenuItem onClick={() => navigate(PATH_ADMIN_APP.brand.editById)}>
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

export default BrandTableRow;
