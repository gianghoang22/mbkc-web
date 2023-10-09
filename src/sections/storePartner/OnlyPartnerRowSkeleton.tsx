import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { IconButton, Stack, Switch, Typography } from '@mui/material';
// @mui icon
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import MoreVertIcon from '@mui/icons-material/MoreVert';
//
import { Avatar } from '@mui/material';
import { PartnerTransform } from '@types';
import { Color, Status } from 'common/enum';
import { ConfirmDialog, Label, Popover } from 'components';
import { useLocales, useModal, usePagination, usePopover } from 'hooks';
import { useAppDispatch } from 'redux/configStore';
import { setRoutesToBack } from 'redux/routes/routesSlice';
import { deleteStore, setEditStore } from 'redux/store/storeSlice';
import { PATH_BRAND_APP } from 'routes/paths';

interface OnlyPartnerRowProps {
  partner: PartnerTransform;
}

function OnlyPartnerRow({ partner }: OnlyPartnerRowProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { handleOpen, isOpen } = useModal();
  const { page, rowsPerPage } = usePagination();
  const { open, handleOpenMenu, handleCloseMenu } = usePopover();

  //   const handleNavigateDetail = (storeId: number) => {
  //     navigate(PATH_BRAND_APP.storePartner.root + `/detail/${storeId}`);
  //     dispatch(setRoutesToBack(pathname));
  //   };

  const handleEdit = () => {
    navigate(PATH_BRAND_APP.storePartner.root + `/update/${partner.partnerId}`);
    dispatch(setRoutesToBack(pathname));
    dispatch(setEditStore(partner));
  };

  const handleDelete = () => {
    handleOpen();
    dispatch(
      deleteStore({
        idParams: { storeId: partner.partnerId },
        optionParams: {
          itemsPerPage: rowsPerPage,
          currentPage: page,
        },
        pathname: pathname,
        navigate,
      })
    );
  };

  // const handleUpdateStatus = () => {
  //   const paramUpdate: Params<ToUpdateStatus> = {
  //     data: {
  //       status: storePartner.status === Status.ACTIVE ? Status.INACTIVE : Status.ACTIVE,
  //     },
  //     idParams: {
  //       storeId: storePartner?.storeId,
  //     },
  //     optionParams: {
  //       itemsPerPage: rowsPerPage,
  //       currentPage: page,
  //     },
  //     pathname: pathname,
  //     navigate,
  //   };
  //   dispatch(updateStatusStore(paramUpdate));
  // };

  return (
    <>
      <Stack direction="row" alignItems="center" sx={{ cursor: 'pointer', height: '72.89px' }}>
        <Stack width={30}>
          <FiberManualRecordIcon sx={{ fontSize: 10, color: (theme) => theme.palette.grey[500] }} />
        </Stack>
        <Stack width={60}>
          <Avatar alt={partner.partnerName} src={partner.partnerLogo} />
        </Stack>
        <Stack width={200}>
          <Typography variant="subtitle2" noWrap>
            {partner.partnerName}
          </Typography>
        </Stack>
        <Stack width={200}>
          <Typography variant="body2" noWrap>
            {partner.userName}
          </Typography>
        </Stack>
        <Stack width={300}>
          <Typography variant="body2" noWrap>
            {partner.password}
          </Typography>
        </Stack>
        <Stack>
          <Label
            color={
              partner?.status === Status.ACTIVE
                ? Color.SUCCESS
                : partner?.status === Status.INACTIVE
                ? Color.WARNING
                : Color.ERROR
            }
          >
            {partner?.status === Status.INACTIVE
              ? translate('status.inactive')
              : partner?.status === Status.ACTIVE
              ? translate('status.active')
              : translate('status.deactive')}
          </Label>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="right" sx={{ ml: 'auto' }}>
          <Switch
            size="small"
            // onClick={handleUpdateStatus}
            inputProps={{ 'aria-label': 'controlled' }}
            disabled={
              partner.status === Status.DEACTIVE ||
              partner.status === Status.BE_CONFIRMING ||
              partner.status === Status.REJECTED
            }
            checked={partner.status === Status.ACTIVE ? true : false}
            color={partner?.status === Status.INACTIVE ? Color.WARNING : Color.SUCCESS}
          />
          <IconButton color="inherit" onClick={handleOpenMenu}>
            <MoreVertIcon />
          </IconButton>
        </Stack>
      </Stack>

      <Popover open={open} handleCloseMenu={handleCloseMenu} onEdit={handleEdit} onDelete={handleOpen} />

      {isOpen && (
        <ConfirmDialog
          open={isOpen}
          model={partner.partnerName}
          onClose={handleOpen}
          onAction={handleDelete}
          title={translate('dialog.confirmDeleteTitle', {
            model: translate('model.lowercase.storePartner'),
          })}
          description={translate('dialog.confirmDeleteContent', {
            model: translate('model.lowercase.storePartner'),
          })}
        />
      )}
    </>
  );
}

export default OnlyPartnerRow;
