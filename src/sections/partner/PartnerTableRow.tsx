import { useNavigate } from 'react-router-dom';
// @mui
import { Avatar, IconButton, Stack, Switch, TableCell, TableRow } from '@mui/material';
// @mui icon
import MoreVertIcon from '@mui/icons-material/MoreVert';
// redux
import { useAppDispatch } from 'redux/configStore';
import { deletePartner, setEditPartner, updatePartner } from 'redux/partner/partnerSlice';
//
import { Params, Partner, PartnerToUpdate } from '@types';
import { Color, Status } from 'common/enum';
import { ConfirmDialog, Label, Popover } from 'components';
import { useLocales, useModal, usePagination, usePopover } from 'hooks';
import CreatePartnerModal from './CreatePartnerModal';
import PartnerDetailModal from './PartnerDetailModal';

interface PartnerTableRowProps {
  partner: Partner;
  index: number;
  lengthPartners: number;
  showAction?: boolean;
  setPage?: any;
}

function PartnerTableRow({ lengthPartners, index, partner, showAction = false, setPage }: PartnerTableRowProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { translate } = useLocales();
  const { handleOpen, isOpen } = useModal();
  const { page, rowsPerPage } = usePagination();
  const { open, handleOpenMenu, handleCloseMenu } = usePopover();
  const { handleOpen: handleOpenCreate, isOpen: isOpenCreate } = useModal();
  const { handleOpen: handleOpenDetail, isOpen: isOpenDetail } = useModal();

  const handleEdit = () => {
    handleOpenCreate();
    dispatch(setEditPartner(partner));
  };

  const handleDelete = () => {
    handleOpen();
    if (lengthPartners === 1) {
      setPage(0);
    }
    dispatch(
      deletePartner({
        idParams: { partnerId: partner.partnerId },
        optionParams: {
          itemsPerPage: rowsPerPage,
          currentPage: lengthPartners === 1 ? 1 : page + 1,
        },
        navigate,
      })
    );
  };

  const handleUpdateStatus = () => {
    const paramUpdate: Params<PartnerToUpdate> = {
      data: {
        name: partner.name,
        webUrl: partner.webUrl,
        logo: '',
        status: partner?.status === Status.ACTIVE ? Status.INACTIVE : Status.ACTIVE,
      },
      idParams: { partnerId: partner.partnerId },
      optionParams: {
        itemsPerPage: rowsPerPage,
        currentPage: page + 1,
      },
      navigate,
    };
    dispatch(updatePartner(paramUpdate));
  };

  return (
    <>
      <TableRow hover tabIndex={-1} key={partner.name} sx={{ cursor: 'pointer', height: '72.89px' }}>
        <TableCell width={100} align="center" onClick={handleOpenDetail}>
          {index + 1}
        </TableCell>
        <TableCell component="th" scope="row" padding="none" width={300} onClick={handleOpenDetail}>
          <Avatar alt={partner.name} src={partner.logo} />
        </TableCell>
        <TableCell align="left" padding="none" width={350} onClick={handleOpenDetail}>
          {partner.name}
        </TableCell>

        <TableCell align="left" onClick={handleOpenDetail}>
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
              : translate('status.deActive')}
          </Label>
        </TableCell>
        {showAction && (
          <TableCell align="right">
            <Stack direction="row" alignItems="center" justifyContent="right">
              <Switch
                size="small"
                onClick={handleUpdateStatus}
                inputProps={{ 'aria-label': 'controlled' }}
                disabled={partner.status === Status.DEACTIVE}
                checked={partner.status === Status.INACTIVE || partner.status === Status.DEACTIVE ? false : true}
                color={partner?.status === Status.INACTIVE ? Color.WARNING : Color.SUCCESS}
              />
              <IconButton color="inherit" onClick={handleOpenMenu}>
                <MoreVertIcon />
              </IconButton>
            </Stack>
          </TableCell>
        )}
      </TableRow>

      <Popover open={open} handleCloseMenu={handleCloseMenu} onEdit={handleEdit} onDelete={handleOpen} />

      {isOpenCreate && (
        <CreatePartnerModal page={page} rowsPerPage={rowsPerPage} isOpen={isOpenCreate} handleOpen={handleOpenCreate} />
      )}

      {isOpenDetail && <PartnerDetailModal partner={partner} isOpen={isOpenDetail} handleOpen={handleOpenDetail} />}

      {isOpen && (
        <ConfirmDialog
          open={isOpen}
          onClose={handleOpen}
          onAction={handleDelete}
          model={partner.name}
          title={translate('dialog.confirmDeleteTitle', { model: translate('model.lowercase.partner') })}
          description={translate('dialog.confirmDeleteContent', { model: translate('model.lowercase.partner') })}
        />
      )}
    </>
  );
}

export default PartnerTableRow;
