import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Avatar, IconButton, Stack, Switch, TableCell, TableRow } from '@mui/material';
// @mui icon
import MoreVertIcon from '@mui/icons-material/MoreVert';
// redux
import { deleteBrand, setEditBrand, updateStatusBrand } from 'redux/brand/brandSlice';
import { useAppDispatch } from 'redux/configStore';
import { setRoutesToBack } from 'redux/routes/routesSlice';
//
import { Brand, OrderSortBy, Params, ToUpdateStatus } from '@types';
import { Color, Status } from 'common/enum';
import { ConfirmDialog, Label, Popover } from 'components';
import { useLocales, useModal, usePopover } from 'hooks';
import { PATH_ADMIN_APP } from 'routes/paths';

interface BrandTableRowProps {
  index: number;
  brand: Brand;
  page: number;
  rowsPerPage: number;
  selected: readonly string[];
  filterName: string;
}

function BrandTableRow({ index, brand, page, rowsPerPage, selected, filterName }: BrandTableRowProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { handleOpen, isOpen } = useModal();
  const { open, handleOpenMenu, handleCloseMenu } = usePopover();

  const handleNavigateDetail = () => {
    navigate(PATH_ADMIN_APP.brand.root + `/${brand.brandId}`);
    dispatch(setRoutesToBack(pathname));
  };

  const handleEdit = () => {
    navigate(PATH_ADMIN_APP.brand.root + `/updation/${brand.brandId}`);
    dispatch(setRoutesToBack(pathname));
    dispatch(setEditBrand(brand));
  };

  const handleDelete = () => {
    handleOpen();
    dispatch<any>(
      deleteBrand({
        idParams: { brandId: brand?.brandId },
        optionParams: { searchValue: filterName },
        navigate,
      })
    );
  };

  const handleChangeStatus = () => {
    const paramUpdateStatus: Params<ToUpdateStatus> = {
      data: {
        status: brand.status === Status.ACTIVE ? Status.INACTIVE : Status.ACTIVE,
      },
      idParams: {
        brandId: brand?.brandId,
      },
      optionParams: {
        searchValue: filterName,
        itemsPerPage: rowsPerPage,
        currentPage: page + 1,
      },
      navigate,
    };
    dispatch<any>(updateStatusBrand(paramUpdateStatus));
  };

  return (
    <>
      <TableRow hover tabIndex={-1} key={brand.name} sx={{ cursor: 'pointer' }}>
        <TableCell width={60} align="center" onClick={handleNavigateDetail}>
          {index + 1}
        </TableCell>

        {selected.includes(OrderSortBy.LOGO) && (
          <TableCell component="th" scope="row" sx={{ width: 80 }} onClick={handleNavigateDetail}>
            <Avatar alt={brand.name} src={brand.logo} />
          </TableCell>
        )}

        <TableCell align="left" onClick={handleNavigateDetail}>
          {brand.name}
        </TableCell>

        {selected.includes(OrderSortBy.ADDRESS) && (
          <TableCell align="left" onClick={handleNavigateDetail} sx={{ minWidth: 500 }}>
            {brand?.address
              .split(', ')
              .slice(0, brand?.address.split(', ').length - 3)
              .join(', ')}
          </TableCell>
        )}

        <TableCell align="left">
          <Label
            color={
              brand?.status === Status.ACTIVE
                ? Color.SUCCESS
                : brand?.status === Status.INACTIVE
                ? Color.WARNING
                : Color.ERROR
            }
          >
            {brand?.status === Status.INACTIVE
              ? translate('status.inactive')
              : brand?.status === Status.ACTIVE
              ? translate('status.active')
              : translate('status.deActive')}
          </Label>
        </TableCell>

        <TableCell align="right">
          <Stack direction="row" alignItems="center" justifyContent="right">
            <Switch
              onChange={handleChangeStatus}
              size="small"
              inputProps={{ 'aria-label': 'controlled' }}
              disabled={brand.status === Status.DEACTIVE}
              checked={brand.status === Status.INACTIVE || brand.status === Status.DEACTIVE ? false : true}
              color={brand?.status === Status.INACTIVE ? Color.WARNING : Color.SUCCESS}
            />
            <IconButton color="inherit" onClick={handleOpenMenu}>
              <MoreVertIcon />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>

      <Popover open={open} handleCloseMenu={handleCloseMenu} onEdit={handleEdit} onDelete={handleOpen} />

      {isOpen && (
        <ConfirmDialog
          open={isOpen}
          onClose={handleOpen}
          onAction={handleDelete}
          model={brand?.name}
          title={translate('dialog.confirmDeleteTitle', { model: translate('model.lowercase.brand') })}
          description={translate('dialog.confirmDeleteContent', { model: translate('model.lowercase.brand') })}
        />
      )}
    </>
  );
}

export default BrandTableRow;
