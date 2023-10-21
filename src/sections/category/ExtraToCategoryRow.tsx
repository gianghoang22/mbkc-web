import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Avatar, Checkbox, IconButton, Switch, TableCell, TableRow, Typography } from '@mui/material';
// @mui icon
import MoreVertIcon from '@mui/icons-material/MoreVert';
//
import { Category, CategoryType } from '@types';
import { Color, Status } from 'common/enum';
import { ConfirmDialog, Label, Popover } from 'components';
import { useLocales, useModal, usePopover } from 'hooks';
import { setCategoryType, setEditCategory } from 'redux/category/categorySlice';
import { useAppDispatch } from 'redux/configStore';
import { setRoutesToBack } from 'redux/routes/routesSlice';
import { PATH_BRAND_APP } from 'routes/paths';

interface ExtraToCategoryRowProps {
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
}: ExtraToCategoryRowProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { handleOpen, isOpen } = useModal();
  const { open, handleOpenMenu, handleCloseMenu } = usePopover();

  const handleNavigateDetail = (category: Category, categoryId: number) => {
    navigate(PATH_BRAND_APP.category.root + `/${categoryId}`);
    dispatch(setCategoryType(categoryType));
    dispatch(setRoutesToBack(pathname));
  };

  const handleEdit = () => {
    navigate(PATH_BRAND_APP.category.root + `/updation/${category.categoryId}`);
    dispatch(setCategoryType(categoryType));
    dispatch(setEditCategory(category));
    dispatch(setRoutesToBack(pathname));
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
        <TableCell align="left" onClick={() => handleNavigateDetail(category, category.categoryId)}>
          <Typography variant="body2" pl={2}>
            {category.displayOrder}
          </Typography>
        </TableCell>

        <TableCell align="left">
          <Label
            color={
              category?.status === Status.ACTIVE
                ? Color.SUCCESS
                : category?.status === Status.INACTIVE
                ? Color.WARNING
                : Color.ERROR
            }
          >
            {category?.status === Status.INACTIVE
              ? translate('status.inactive')
              : category?.status === Status.ACTIVE
              ? translate('status.active')
              : translate('status.deActive')}
          </Label>
        </TableCell>
        {!showAction && (
          <TableCell align="right">
            <Switch
              size="small"
              inputProps={{ 'aria-label': 'controlled' }}
              disabled={category.status === Status.DEACTIVE}
              checked={category.status === Status.INACTIVE || category.status === Status.DEACTIVE ? false : true}
              color={category?.status === Status.INACTIVE ? Color.WARNING : Color.SUCCESS}
            />
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
          title={translate('dialog.confirmDeleteTitle', { model: translate('model.lowercase.extraCategory') })}
          description={translate('dialog.confirmDeleteContent', { model: translate('model.lowercase.extraCategory') })}
        />
      )}
    </>
  );
}

export default ExtraToCategoryRow;
