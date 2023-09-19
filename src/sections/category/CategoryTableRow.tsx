import React, { useState } from 'react';
// @mui
import {
  Avatar,
  FormControlLabel,
  IconButton,
  MenuItem,
  Popover,
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
import { ProductCategory } from '@types';
import { sentenceCase } from 'change-case';
import { Color } from 'common/enum';
import { Label } from 'components';

interface CategoryTableRowProps {
  handleNavigateDetail: (category: ProductCategory, storeId: number) => void;
  productCategory: ProductCategory;
  index: number;
}

function CategoryTableRow(props: CategoryTableRowProps) {
  const { index, productCategory, handleNavigateDetail } = props;

  const [open, setOpen] = useState<HTMLButtonElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} key={productCategory.name} sx={{ cursor: 'pointer' }}>
        <TableCell
          width={80}
          align="center"
          onClick={() => handleNavigateDetail(productCategory, productCategory.categoryId)}
        >
          {index + 1}
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          padding="none"
          onClick={() => handleNavigateDetail(productCategory, productCategory.categoryId)}
        >
          <Avatar alt={productCategory.name} src={productCategory.imageUrl} />
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          onClick={() => handleNavigateDetail(productCategory, productCategory.categoryId)}
        >
          <Typography variant="subtitle2" sx={{ width: 150 }} noWrap>
            {productCategory.name}
          </Typography>
        </TableCell>
        <TableCell align="left" onClick={() => handleNavigateDetail(productCategory, productCategory.categoryId)}>
          {productCategory.code}
        </TableCell>

        <TableCell align="left">
          <FormControlLabel
            control={<Switch size="small" checked={productCategory.status === 'inactive' ? false : true} />}
            label={
              <Label color={(productCategory.status === 'inactive' && Color.ERROR) || Color.SUCCESS}>
                {sentenceCase(productCategory?.status)}
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

export default CategoryTableRow;
