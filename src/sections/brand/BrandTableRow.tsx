import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Avatar, FormControlLabel, IconButton, Switch, TableCell, TableRow } from '@mui/material';
// @mui icon
import MoreVertIcon from '@mui/icons-material/MoreVert';
//
import { Brand } from '@types';
import { Color, Status } from 'common/enum';
import { ConfirmDialog, Label, Popover } from 'components';
import { useLocales, useModal, usePopover } from 'hooks';
import {
  deleteBrand,
  getBrandDetail,
  getBrandDetail_local,
  setEditBrand,
  setPathToBackBrand,
} from 'redux/brand/brandSlice';
import { useAppDispatch } from 'redux/configStore';
import { PATH_ADMIN_APP } from 'routes/paths';

interface BrandTableRowProps {
  index: number;
  brand: Brand;
  page?: number;
  rowsPerPage?: number;
}

function BrandTableRow({ index, brand, page, rowsPerPage }: BrandTableRowProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { handleOpen, isOpen } = useModal();
  const { open, handleOpenMenu, handleCloseMenu } = usePopover();

  const handleNavigateDetail = (brand: Brand, brandId: number) => {
    const params = {
      brandId,
      navigate,
    };
    navigate(PATH_ADMIN_APP.brand.root + `/detail/${brandId}`);
    dispatch(getBrandDetail(params));
  };

  const handleEdit = () => {
    navigate(PATH_ADMIN_APP.brand.root + `/update/${brand.brandId}`);
    dispatch(setPathToBackBrand(pathname));
    dispatch(setEditBrand(brand));
  };

  const handleDelete = async () => {
    const brandId = brand.brandId;
    const params = {
      brandId,
      navigate,
    };
    dispatch(deleteBrand(params));
  };

  return (
    <>
      <TableRow hover tabIndex={-1} key={brand.name} sx={{ cursor: 'pointer' }}>
        <TableCell width={60} align="center" onClick={() => handleNavigateDetail(brand, brand.brandId)}>
          {index + 1}
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          sx={{ width: 80 }}
          onClick={() => handleNavigateDetail(brand, brand.brandId)}
        >
          <Avatar alt={brand.name} src={brand.logo} />
        </TableCell>
        <TableCell align="left" onClick={() => handleNavigateDetail(brand, brand.brandId)}>
          {brand.name}
        </TableCell>
        <TableCell align="left" onClick={() => handleNavigateDetail(brand, brand.brandId)}>
          {brand.address}
        </TableCell>
        <TableCell align="left">
          <FormControlLabel
            control={<Switch size="small" checked={brand.status === Status.DEACTIVE ? false : true} />}
            label={
              <Label color={(brand.status === Status.DEACTIVE && Color.ERROR) || Color.SUCCESS}>
                {brand?.status === Status.DEACTIVE ? translate('status.inactive') : translate('status.active')}
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

      <Popover open={open} handleCloseMenu={handleCloseMenu} onEdit={handleEdit} onDelete={handleOpen} />

      {isOpen && (
        <ConfirmDialog
          open={isOpen}
          onClose={handleOpen}
          onAction={handleDelete}
          title={translate('dialog.confirmDeleteTitle', { model: translate('model.lowercase.brand') })}
          description={translate('dialog.confirmDeleteContent', { model: translate('model.lowercase.brand') })}
        />
      )}
    </>
  );
}

export default BrandTableRow;
