// @mui
import { Avatar, IconButton, Switch, TableCell, TableRow } from '@mui/material';
// @mui icon
import MoreVertIcon from '@mui/icons-material/MoreVert';
//
import { Partner } from '@types';
import { Color, Status } from 'common/enum';
import { ConfirmDialog, Label, Popover } from 'components';
import { useLocales, useModal, usePopover } from 'hooks';
import { useAppDispatch } from 'redux/configStore';
import { getPartnerDetail_local, setEditPartner } from 'redux/partner/partnerSlice';

interface PartnerTableRowProps {
  partner: Partner;
  index: number;
  showAction?: boolean;
}

function PartnerTableRow({ index, partner, showAction = false }: PartnerTableRowProps) {
  const dispatch = useAppDispatch();
  const { translate } = useLocales();
  const { handleOpen, isOpen } = useModal();
  const { open, handleOpenMenu, handleCloseMenu } = usePopover();

  const handleNavigateDetail = (partner: Partner, partnerId: number) => {
    dispatch(getPartnerDetail_local(partner));
  };

  const handleEdit = () => {
    dispatch(setEditPartner(partner));
  };

  const handleDelete = () => {};

  return (
    <>
      <TableRow hover tabIndex={-1} key={partner.name} sx={{ cursor: 'pointer', height: '72.89px' }}>
        <TableCell width={100} align="center" onClick={() => handleNavigateDetail(partner, partner.partnerId)}>
          {index + 1}
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          padding="none"
          sx={{ width: 120 }}
          onClick={() => handleNavigateDetail(partner, partner.partnerId)}
        >
          <Avatar alt={partner.name} src={partner.logo} />
        </TableCell>
        <TableCell align="left" padding="none" onClick={() => handleNavigateDetail(partner, partner.partnerId)}>
          {partner.name}
        </TableCell>

        <TableCell align="left">
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
        </TableCell>
        {showAction && (
          <TableCell align="right">
            <Switch
              size="small"
              inputProps={{ 'aria-label': 'controlled' }}
              disabled={partner.status === Status.DEACTIVE}
              checked={partner.status === Status.INACTIVE || partner.status === Status.DEACTIVE ? false : true}
              color={partner?.status === Status.INACTIVE ? Color.WARNING : Color.SUCCESS}
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
          model={partner.name}
          title={translate('dialog.confirmDeleteTitle', { model: translate('model.lowercase.partner') })}
          description={translate('dialog.confirmDeleteContent', { model: translate('model.lowercase.partner') })}
        />
      )}
    </>
  );
}

export default PartnerTableRow;
