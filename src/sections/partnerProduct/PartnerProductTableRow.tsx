import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { IconButton, Switch, TableCell, TableRow, Typography } from '@mui/material';
// @mui icon
import MoreVertIcon from '@mui/icons-material/MoreVert';
// redux
import { useAppDispatch } from 'redux/configStore';
import {
  deletePartnerProduct,
  getPartnerProductDetail_local,
  setEditPartnerProduct,
  updateStatusPartnerProduct,
} from 'redux/partnerProduct/partnerProductSlice';
import { setRoutesToBack } from 'redux/routes/routesSlice';
//
import { Params, PartnerProduct, ToUpdateStatus } from '@types';
import { Color, Status } from 'common/enum';
import { ConfirmDialog, Label, Popover } from 'components';
import { useLocales, useModal, usePopover } from 'hooks';
import { PATH_BRAND_APP } from 'routes/paths';
import CreatePartnerProductModal from './CreatePartnerProductModal';

interface PartnerProductTableRowProps {
  partnerProduct: PartnerProduct;
  index: number;
  page?: number;
  rowsPerPage?: number;
  length: number;
  setPage?: any;
}

function PartnerProductTableRow({
  index,
  partnerProduct,
  page = 1,
  rowsPerPage = 5,
  length,
  setPage,
}: PartnerProductTableRowProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { handleOpen, isOpen } = useModal();
  const { handleOpen: handleOpenUpdate, isOpen: isOpenUpdate } = useModal();
  const { open, handleOpenMenu, handleCloseMenu } = usePopover();

  const handleNavigateDetail = () => {
    navigate(PATH_BRAND_APP.partnerProduct.root + `/${partnerProduct?.productId}`);
    dispatch(getPartnerProductDetail_local(partnerProduct));
    dispatch(setRoutesToBack(pathname));
  };

  const handleEdit = () => {
    handleOpenUpdate();
    dispatch(setEditPartnerProduct(partnerProduct));
    dispatch(setRoutesToBack(pathname));
  };

  const handleDelete = () => {
    handleOpen();
    if (length === 1) {
      setPage(0);
    }
    dispatch(
      deletePartnerProduct({
        idParams: {
          productId: partnerProduct?.productId,
          partnerId: partnerProduct.partnerId,
          storeId: partnerProduct.storeId,
        },
        pathname: pathname,
        navigate,
      })
    );
  };

  const handleUpdateStatus = () => {
    const paramUpdate: Params<ToUpdateStatus> = {
      data: {
        status: partnerProduct?.status === Status.ACTIVE ? Status.INACTIVE : Status.ACTIVE,
      },
      idParams: {
        productId: partnerProduct.productId,
        partnerId: partnerProduct.partnerId,
        storeId: partnerProduct.storeId,
      },
      optionParams: {
        itemsPerPage: rowsPerPage,
        currentPage: page,
      },
      pathname: pathname,
      navigate,
    };
    dispatch(updateStatusPartnerProduct(paramUpdate));
  };

  return (
    <>
      <TableRow hover tabIndex={-1} sx={{ cursor: 'pointer', height: '72.89px' }}>
        <TableCell width={60} align="center" onClick={handleNavigateDetail}>
          {index + 1}
        </TableCell>
        <TableCell component="th" scope="row" padding="none" onClick={handleNavigateDetail}>
          <Typography variant="subtitle2" noWrap>
            {partnerProduct?.productName}
          </Typography>
        </TableCell>
        <TableCell align="left" onClick={handleNavigateDetail}>
          <Typography variant="body2" noWrap>
            {partnerProduct?.productCode}
          </Typography>
        </TableCell>
        <TableCell align="left" padding="none" onClick={handleNavigateDetail}>
          {partnerProduct?.partnerName}
        </TableCell>
        <TableCell align="left" onClick={handleNavigateDetail}>
          {partnerProduct?.storeName}
        </TableCell>
        <TableCell align="left" onClick={handleNavigateDetail}>
          <Label
            color={
              partnerProduct?.status === Status.ACTIVE
                ? Color.SUCCESS
                : partnerProduct?.status === Status.INACTIVE
                ? Color.WARNING
                : Color.ERROR
            }
          >
            {partnerProduct?.status === Status.INACTIVE
              ? translate('status.inactive')
              : partnerProduct?.status === Status.ACTIVE
              ? translate('status.active')
              : translate('status.deActive')}
          </Label>
        </TableCell>
        <TableCell align="right">
          <Switch
            size="small"
            onClick={handleUpdateStatus}
            inputProps={{ 'aria-label': 'controlled' }}
            disabled={partnerProduct?.status === Status.DEACTIVE}
            checked={
              partnerProduct?.status === Status.INACTIVE || partnerProduct?.status === Status.DEACTIVE ? false : true
            }
            color={partnerProduct?.status === Status.INACTIVE ? Color.WARNING : Color.SUCCESS}
          />
          <IconButton color="inherit" onClick={handleOpenMenu}>
            <MoreVertIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover open={open} handleCloseMenu={handleCloseMenu} onEdit={handleEdit} onDelete={handleOpen} />

      {isOpenUpdate && (
        <CreatePartnerProductModal
          isOpen={isOpenUpdate}
          handleOpen={handleOpenUpdate}
          partnerProduct={partnerProduct}
        />
      )}

      {isOpen && (
        <ConfirmDialog
          open={isOpen}
          onClose={handleOpen}
          onAction={handleDelete}
          model={partnerProduct?.partnerName}
          title={translate('dialog.confirmDeleteTitle', { model: translate('model.lowercase.product') })}
          description={translate('dialog.confirmDeleteContent', { model: translate('model.lowercase.product') })}
        />
      )}
    </>
  );
}

export default PartnerProductTableRow;
