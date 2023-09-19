import { sentenceCase } from 'change-case';
import { useNavigate } from 'react-router-dom';

// @mui
import { Avatar, FormControlLabel, IconButton, Switch, TableCell, TableRow, Typography } from '@mui/material';
// @mui icon
import MoreVertIcon from '@mui/icons-material/MoreVert';
//
import { ProductCategory } from '@types';

import { Color } from 'common/enum';
import { Label, Popover } from 'components';
import { usePopover } from 'hooks';
import { PATH_BRAND_APP } from 'routes/paths';

interface CategoryTableRowProps {
  handleNavigateDetail: (category: ProductCategory, storeId: number) => void;
  category: ProductCategory;
  index: number;
}

function CategoryTableRow({ index, category, handleNavigateDetail }: CategoryTableRowProps) {
  const navigate = useNavigate();
  const { open, handleOpenMenu, handleCloseMenu } = usePopover();

  const handleEdit = () => {
    navigate(PATH_BRAND_APP.category.root + `/update/${category.categoryId}`);
  };

  const handleDelete = () => {};

  return (
    <>
      <TableRow hover tabIndex={-1} sx={{ cursor: 'pointer' }}>
        <TableCell width={80} align="center" onClick={() => handleNavigateDetail(category, category.categoryId)}>
          {index + 1}
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          padding="none"
          onClick={() => handleNavigateDetail(category, category.categoryId)}
        >
          <Avatar alt={category.name} src={category.imageUrl} />
        </TableCell>
        <TableCell component="th" scope="row" onClick={() => handleNavigateDetail(category, category.categoryId)}>
          <Typography variant="subtitle2" sx={{ width: 150 }} noWrap>
            {category.name}
          </Typography>
        </TableCell>
        <TableCell align="left" onClick={() => handleNavigateDetail(category, category.categoryId)}>
          {category.code}
        </TableCell>

        <TableCell align="left">
          <FormControlLabel
            control={<Switch size="small" checked={category.status === 'inactive' ? false : true} />}
            label={
              <Label color={(category.status === 'inactive' && Color.ERROR) || Color.SUCCESS}>
                {sentenceCase(category?.status)}
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

      <Popover open={open} handleCloseMenu={handleCloseMenu} onEdit={handleEdit} onDelete={handleDelete} />
    </>
  );
}

export default CategoryTableRow;
