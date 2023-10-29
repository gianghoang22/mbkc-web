import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Avatar, IconButton, Switch, TableCell, TableRow, Typography } from '@mui/material';
// @mui icon
import MoreVertIcon from '@mui/icons-material/MoreVert';
// redux
import { deleteCategory, setCategoryType, setEditCategory, updateCategory } from 'redux/category/categorySlice';
import { useAppDispatch } from 'redux/configStore';
import { setRoutesToBack } from 'redux/routes/routesSlice';
//
import { Category, CategoryToUpdate, CategoryType, OrderSortBy, Params } from '@types';
import { Color, Status } from 'common/enum';
import { ConfirmDialog, Label, Popover } from 'components';
import { useLocales, useModal, usePopover } from 'hooks';
import { PATH_BRAND_APP } from 'routes/paths';

interface CategoryTableRowProps {
  categoryType: CategoryType;
  category: Category;
  index: number;
  showAction?: boolean;
  page?: number;
  rowsPerPage?: number;
  length?: number;
  setPage?: any;
  selected: readonly string[];
}

function CategoryTableRow({
  index,
  page = 1,
  rowsPerPage = 5,
  category,
  categoryType,
  showAction = false,
  length,
  setPage,
  selected,
}: CategoryTableRowProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { handleOpen, isOpen } = useModal();
  const { open, handleOpenMenu, handleCloseMenu } = usePopover();

  const handleNavigateDetail = () => {
    if (categoryType === CategoryType.NORMAL) {
      navigate(PATH_BRAND_APP.category.root + `/${category.categoryId}`);
    } else {
      navigate(PATH_BRAND_APP.category.rootExtra + `/${category.categoryId}`);
    }
    dispatch(setCategoryType(categoryType));
    dispatch(setRoutesToBack(pathname));
  };

  const handleEdit = () => {
    if (categoryType === CategoryType.NORMAL) {
      navigate(PATH_BRAND_APP.category.root + `/updation/${category.categoryId}`);
    } else {
      navigate(PATH_BRAND_APP.category.rootExtra + `/updation/${category.categoryId}`);
    }
    dispatch(setCategoryType(categoryType));
    dispatch(setEditCategory(category));
    dispatch(setRoutesToBack(pathname));
  };

  const handleDelete = () => {
    handleOpen(category.name);
    if (length === 1) {
      setPage(0);
    }
    dispatch(
      deleteCategory({
        idParams: { categoryId: category.categoryId },
        optionParams: {
          type: category.type,
          itemsPerPage: rowsPerPage,
          currentPage: length === 1 ? 1 : page,
        },
        pathname: pathname,
        navigate,
      })
    );
  };

  const handleUpdateStatus = () => {
    const paramUpdate: Params<CategoryToUpdate> = {
      data: {
        name: category.name,
        code: category.code,
        displayOrder: category.displayOrder,
        imageUrl: '',
        description: category.description,
        status: category?.status === Status.ACTIVE ? Status.INACTIVE : Status.ACTIVE,
      },
      idParams: {
        categoryId: category?.categoryId,
      },
      optionParams: {
        type: category?.type,
        currentPage: page,
        itemsPerPage: rowsPerPage,
      },
      pathname: pathname,
      navigate,
    };
    dispatch(updateCategory(paramUpdate));
  };

  return (
    <>
      <TableRow hover tabIndex={-1} sx={showAction ? { cursor: 'pointer', height: '72.89px' } : { cursor: 'pointer' }}>
        <TableCell width={80} align="center">
          {index + 1}
        </TableCell>
        {selected.includes(OrderSortBy.IMAGE_URL) && (
          <TableCell scope="row" component="th" padding="none" width={100} onClick={handleNavigateDetail}>
            <Avatar alt={category.name} src={category.imageUrl} />
          </TableCell>
        )}
        <TableCell component="th" scope="row" onClick={handleNavigateDetail}>
          <Typography variant="subtitle2" noWrap>
            {category.name}
          </Typography>
        </TableCell>
        {selected.includes(OrderSortBy.CODE) && (
          <TableCell align="left" onClick={handleNavigateDetail}>
            {category.code}
          </TableCell>
        )}
        {selected.includes(OrderSortBy.DISPLAY_ORDER) && (
          <TableCell align="left" onClick={handleNavigateDetail}>
            <Typography variant="body2" pl={2}>
              {category.displayOrder}
            </Typography>
          </TableCell>
        )}
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
              onClick={handleUpdateStatus}
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
          model={category.name}
          title={translate('dialog.confirmDeleteTitle', { model: translate('model.lowercase.category') })}
          description={translate('dialog.confirmDeleteContent', { model: translate('model.lowercase.category') })}
        />
      )}
    </>
  );
}

export default CategoryTableRow;
