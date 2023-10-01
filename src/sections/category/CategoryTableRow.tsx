import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Avatar, IconButton, Switch, TableCell, TableRow, Typography } from '@mui/material';
// @mui icon
import MoreVertIcon from '@mui/icons-material/MoreVert';
//
import { Category, CategoryType } from '@types';
import { Color, Status } from 'common/enum';
import { ConfirmDialog, Label, Popover } from 'components';
import { useLocales, useModal, usePopover } from 'hooks';
import { getCategoryDetail_local, setCategoryType, setEditCategory } from 'redux/category/categorySlice';
import { useAppDispatch } from 'redux/configStore';
import { PATH_BRAND_APP } from 'routes/paths';
import { setRoutesToBack } from 'redux/routes/routesSlice';

interface CategoryTableRowProps {
  categoryType: CategoryType;
  category: Category;
  index: number;
  showAction?: boolean;
}

function CategoryTableRow({ index, category, categoryType, showAction = false }: CategoryTableRowProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { handleOpen, isOpen } = useModal();
  const { open, handleOpenMenu, handleCloseMenu } = usePopover();

  const handleNavigateDetail = (category: Category, categoryId: number) => {
    navigate(PATH_BRAND_APP.category.root + `/detail/${category.categoryId}`);
    dispatch(setCategoryType(categoryType));
    dispatch(getCategoryDetail_local(category));
  };

  const handleEdit = () => {
    navigate(PATH_BRAND_APP.category.root + `/update/${category.categoryId}`);
    dispatch(setCategoryType(categoryType));
    dispatch(setEditCategory(category));
    dispatch(setRoutesToBack(pathname));
  };

  const handleDelete = () => {};

  const handleUpdateStatus = () => {
    // const paramUpdate: Params<StoreToUpdate> = {
    //   data: {
    //     name: store?.name,
    //     status: store.status === Status.ACTIVE ? Status.INACTIVE : Status.ACTIVE,
    //     logo: '',
    //     storeManagerEmail: store?.storeManagerEmail,
    //   },
    //   idParams: {
    //     brandId: store?.brand.brandId,
    //     storeId: store?.storeId,
    //   },
    //   optionParams: {
    //     itemsPerPage: rowsPerPage,
    //     currentPage: page,
    //   },
    //   pathname: pathname,
    //   navigate,
    // };
    // dispatch(updateStore(paramUpdate));
  };

  return (
    <>
      <TableRow hover tabIndex={-1} sx={showAction ? { cursor: 'pointer', height: '72.89px' } : { cursor: 'pointer' }}>
        <TableCell width={80} align="center">
          {index + 1}
        </TableCell>

        <TableCell
          scope="row"
          component="th"
          padding="none"
          width={100}
          onClick={() => handleNavigateDetail(category, category.categoryId)}
        >
          <Avatar alt={category.name} src={category.imageUrl} />
        </TableCell>
        <TableCell component="th" scope="row" onClick={() => handleNavigateDetail(category, category.categoryId)}>
          <Typography variant="subtitle2" noWrap>
            {category.name}
          </Typography>
        </TableCell>
        <TableCell align="left" onClick={() => handleNavigateDetail(category, category.categoryId)}>
          {category.code}
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
              : translate('status.deactive')}
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
