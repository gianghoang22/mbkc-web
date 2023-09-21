// @mui
import { Avatar, FormControlLabel, IconButton, Stack, Switch, TableCell, TableRow } from '@mui/material';
// @mui icon
import MoreVertIcon from '@mui/icons-material/MoreVert';
//
import { Kitchen } from '@types';
import { sentenceCase } from 'change-case';
import { Color } from 'common/enum';
import { Label, Popover } from 'components';
import { usePopover } from 'hooks';

interface KitchenTableRowProps {
  // handleNavigateDetail: (kitchenCenter: KitchenCenter, kitchenCenterId: number) => void;?
  kitchen: Kitchen;
  index: number;
}

function KitchenTableRow(props: KitchenTableRowProps) {
  const { index, kitchen } = props;
  const { open, handleOpenMenu, handleCloseMenu } = usePopover();

  return (
    <>
      <TableRow hover tabIndex={-1} key={kitchen.kitchenId} sx={{ cursor: 'pointer' }}>
        <TableCell
          width={60}
          align="center"
          // onClick={() => handleNavigateDetail(kitchenCenter, kitchenCenter.kitchenCenterId)}
        >
          {index + 1}
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          padding="none"
          // onClick={() => handleNavigateDetail(kitchenCenter, kitchenCenter.kitchenCenterId)}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={kitchen.kitchenName} src={kitchen.kitchenImgUrl} />
          </Stack>
        </TableCell>
        <TableCell align="left">{kitchen.kitchenName}</TableCell>
        <TableCell align="center">
          <Avatar alt={kitchen.brandName} src={kitchen.brandImgUrl} />
        </TableCell>
        <TableCell align="left">{kitchen.brandName}</TableCell>
        <TableCell align="left">
          <FormControlLabel
            control={<Switch size="small" checked={kitchen.status === 'inactive' ? false : true} />}
            label={
              <Label color={(kitchen.status === 'inactive' && Color.ERROR) || Color.SUCCESS}>
                {sentenceCase(kitchen.status)}
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

      <Popover open={open} handleCloseMenu={handleCloseMenu} />
    </>
  );
}

export default KitchenTableRow;
