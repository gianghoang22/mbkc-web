import { sentenceCase } from 'change-case';
// @mui
import { Avatar, FormControlLabel, IconButton, Stack, Switch, TableCell, TableRow, Typography } from '@mui/material';
// @mui icon
import MoreVertIcon from '@mui/icons-material/MoreVert';
//
import { Store } from '@types';
import { Color } from 'common/enum';
import { Label, Popover } from 'components';
import { usePopover } from 'hooks';

interface StoreTableRowProps {
  handleNavigateDetail: (store: Store, accountId: number) => void;
  store: Store;
  index: number;
  justInfo?: boolean;
}

function StoreTableRow({ index, store, justInfo = false, handleNavigateDetail }: StoreTableRowProps) {
  const { open, handleOpenMenu, handleCloseMenu } = usePopover();

  const handleEdit = () => {};

  return (
    <>
      <TableRow hover tabIndex={-1} key={store.name} sx={{ cursor: 'pointer', height: '72.89px' }}>
        <TableCell width={60} align="center" onClick={() => handleNavigateDetail(store, store.accountId)}>
          {index + 1}
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          padding="none"
          onClick={() => handleNavigateDetail(store, store.accountId)}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={store.name} src={store.logo} />
            <Typography variant="subtitle2" sx={{ width: 150 }} noWrap>
              {store.name}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell align="left" onClick={() => handleNavigateDetail(store, store.accountId)}>
          {store.kitchenCenter}
        </TableCell>
        <TableCell align="left" onClick={() => handleNavigateDetail(store, store.accountId)}>
          {store.partner}
        </TableCell>

        <TableCell align="left">
          <FormControlLabel
            control={<Switch size="small" checked={store.status === 'inactive' ? false : true} />}
            label={
              <Label color={(store.status === 'inactive' && Color.ERROR) || Color.SUCCESS}>
                {sentenceCase(store.status)}
              </Label>
            }
          />
        </TableCell>
        {!justInfo && (
          <TableCell align="right">
            <IconButton color="inherit" onClick={handleOpenMenu}>
              <MoreVertIcon />
            </IconButton>
          </TableCell>
        )}
      </TableRow>

      <Popover open={open} handleCloseMenu={handleCloseMenu} onEdit={handleEdit} />
    </>
  );
}

export default StoreTableRow;
