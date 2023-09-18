import { sentenceCase } from 'change-case';
import { useNavigate } from 'react-router-dom';
// @mui
import { Avatar, FormControlLabel, IconButton, Stack, Switch, TableCell, TableRow, Typography } from '@mui/material';
// @mui icon
import EditRoundedIcon from '@mui/icons-material/EditRounded';
//
import { Store } from '@types';
import { Color } from 'common/enum';
import { Label } from 'components';
import RoutesDynamicKeys from 'constants/RoutesDynamicKeys';

interface StoreTableRowProps {
  handleNavigateDetail: (store: Store, accountId: number) => void;
  store: Store;
  index: number;
}

function StoreTableRow({ index, store, handleNavigateDetail }: StoreTableRowProps) {
  const navigate = useNavigate();

  const handleNavigateToEdit = () => {
    navigate(RoutesDynamicKeys.UPDATE_STORE + `/${store.accountId}`);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} key={store.name} sx={{ cursor: 'pointer' }}>
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
        <TableCell align="right">
          <IconButton color="inherit" onClick={handleNavigateToEdit}>
            <EditRoundedIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
}

export default StoreTableRow;
