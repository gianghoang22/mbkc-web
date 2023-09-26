import { sentenceCase } from 'change-case';
import { useNavigate } from 'react-router-dom';
// @mui
import { Avatar, Checkbox, FormControlLabel, IconButton, Switch, TableCell, TableRow, Typography } from '@mui/material';
// @mui icon
import MoreVertIcon from '@mui/icons-material/MoreVert';
//
import { Category, CategoryType } from '@types';
import { Color } from 'common/enum';
import { ConfirmDialog, Label, Popover } from 'components';
import { useLocales, useModal, usePopover } from 'hooks';
import { setCategoryType, setEditCategory } from 'redux/category/categorySlice';
import { useAppDispatch } from 'redux/configStore';
import { PATH_BRAND_APP } from 'routes/paths';

interface ExtraToCategoryRowProps {
  handleNavigateDetail: (category: Category, categoryId: number) => void;
  handleClick: (event: React.MouseEvent<unknown>, categoryId: number) => void;
  categoryType: CategoryType;
  category: Category;
  index: number;
  showAction?: boolean;
  checkbox?: boolean;
  isItemSelected?: boolean;
}

function ExtraToCategoryRow({
  index,
  category,
  categoryType,
  showAction = false,
  checkbox = false,
  isItemSelected = false,
  handleClick,
  handleNavigateDetail,
}: ExtraToCategoryRowProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { translate } = useLocales();
  const { handleOpen, isOpen } = useModal();
  const { open, handleOpenMenu, handleCloseMenu } = usePopover();

  const handleEdit = () => {
    navigate(PATH_BRAND_APP.category.root + `/update/${category.categoryId}`);
    dispatch(setCategoryType(categoryType));
    dispatch(setEditCategory(category));
  };

  const handleDelete = () => {};

  return (
    <>
      <TableRow
        hover
        tabIndex={-1}
        role={checkbox ? 'checkbox' : ''}
        selected={isItemSelected}
        aria-checked={isItemSelected}
        sx={showAction ? { cursor: 'pointer', height: '72.89px' } : { cursor: 'pointer' }}
      >
        {checkbox ? (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              checked={isItemSelected}
              inputProps={{
                'aria-labelledby': `enhanced-table-checkbox-${index}`,
              }}
              onClick={(event) => handleClick(event, category.categoryId)}
            />
          </TableCell>
        ) : (
          <TableCell width={80} align="center">
            {index + 1}
          </TableCell>
        )}

        <TableCell
          scope="row"
          component="th"
          padding="none"
          width={80}
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
          {showAction ? (
            <Label color={(category.status === 'inactive' && Color.ERROR) || Color.SUCCESS}>
              {sentenceCase(category?.status)}
            </Label>
          ) : (
            <FormControlLabel
              control={<Switch size="small" checked={category.status === 'inactive' ? false : true} />}
              label={
                <Label color={(category.status === 'inactive' && Color.ERROR) || Color.SUCCESS}>
                  {sentenceCase(category?.status)}
                </Label>
              }
            />
          )}
        </TableCell>
        {!showAction && (
          <TableCell align="right">
            <IconButton color="inherit" onClick={handleOpenMenu}>
              <MoreVertIcon />
            </IconButton>
          </TableCell>
        )}
      </TableRow>

      <Popover open={open} handleCloseMenu={handleCloseMenu} onEdit={handleEdit} onDelete={handleOpen} />

      {isOpen && (
        <ConfirmDialog
          open={isOpen}
          onClose={handleOpen}
          onAction={handleDelete}
          title={translate('dialog.confirmDeleteTitle', { model: translate('model.extraCategory') })}
          description={translate('dialog.confirmDeleteContent', { model: translate('model.extraCategory') })}
        />
      )}
    </>
  );
}

export default ExtraToCategoryRow;
