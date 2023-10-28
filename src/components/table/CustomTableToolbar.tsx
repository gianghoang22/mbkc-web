/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useEffect } from 'react';
// @mui
import ReplayIcon from '@mui/icons-material/Replay';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  Autocomplete,
  Checkbox,
  Divider,
  IconButton,
  InputAdornment,
  Popover as MUIPopover,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
//
import { HeadCell, OptionSelect, OrderSortBy } from '@types';
import { Role, Status } from 'common/enum';
import { useLocales, usePopover } from 'hooks';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from 'redux/configStore';
import { PATH_ADMIN_APP } from 'routes/paths';
import { StyledRoot, StyledSearch } from './styles';

interface CustomTableToolbarProps<T> {
  headCells: HeadCell<T>[];
  filterName: string;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selected: readonly string[];
  setSelected: Dispatch<SetStateAction<readonly string[]>>;
  haveSelectStatus?: boolean;
  options?: OptionSelect[];
  status?: OptionSelect | null;
  handleChangeStatus?: (option: OptionSelect | null) => void;
  handleReloadData: () => void;
  model: string;
}

function CustomTableToolbar<T>(props: CustomTableToolbarProps<T>) {
  const {
    headCells,
    filterName,
    onFilterName,
    selected,
    setSelected,
    options,
    status,
    handleChangeStatus,
    haveSelectStatus,
    handleReloadData,
    model,
  } = props;

  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { open, handleOpenMenu, handleCloseMenu } = usePopover();

  const { userAuth } = useAppSelector((state) => state.auth);

  const selectedFilter = selected.filter((cell) => cell !== OrderSortBy.NAME && cell !== OrderSortBy.STATUS);
  const headCellFilter = headCells.filter(
    (cell) => cell.id.toString() !== OrderSortBy.NAME && cell.id.toString() !== OrderSortBy.STATUS
  );

  useEffect(() => {
    const newSelected = headCells.map((n) =>
      userAuth?.roleName === Role.MBKC_ADMIN && pathname === PATH_ADMIN_APP.store.list
        ? n.id.toString() !== OrderSortBy.STORE_MANAGER_EMAIL
          ? n.id.toString()
          : ''
        : n.id.toString()
    );
    setSelected([...newSelected]);
  }, []);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = headCells.map((cell) => cell.id.toString());
      setSelected([...newSelected]);
      return;
    }
    setSelected([OrderSortBy.NAME, OrderSortBy.STATUS]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  return (
    <>
      <StyledRoot>
        <Stack direction="row" gap={2}>
          {handleChangeStatus && haveSelectStatus && (
            <Stack width={250}>
              <Autocomplete
                fullWidth
                size="small"
                options={options ? options : []}
                getOptionLabel={(option) =>
                  option.value === Status.ACTIVE
                    ? translate('status.active')
                    : option.value === Status.INACTIVE
                    ? translate('status.inactive')
                    : option.value === Status.BE_CONFIRMING
                    ? translate('status.beConfirming')
                    : option.value === Status.REJECTED
                    ? translate('status.reject')
                    : ''
                }
                renderInput={(params) => (
                  <TextField {...params} label={translate('table.status')} InputLabelProps={{}} />
                )}
                value={status}
                onChange={(event: any, newValue: OptionSelect | null) => handleChangeStatus(newValue)}
              />
            </Stack>
          )}

          <StyledSearch
            size="small"
            value={filterName}
            onChange={onFilterName}
            placeholder={translate('page.title.search', { model: model })}
            startAdornment={
              <InputAdornment position="start">
                <SearchRoundedIcon sx={{ color: 'text.disabled', width: 20, height: 20 }} />
              </InputAdornment>
            }
          />
        </Stack>

        <Stack direction="row" gap={1}>
          <Tooltip title={translate('button.reload')}>
            <IconButton onClick={handleReloadData}>
              <ReplayIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={translate('button.setting')}>
            <IconButton onClick={handleOpenMenu}>
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </StyledRoot>

      <MUIPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{
          sx: {
            p: 1,
            mt: 0.5,
            minWidth: 180,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Checkbox
            color="primary"
            indeterminate={selectedFilter.length > 0 && selectedFilter.length < headCellFilter.length}
            checked={headCellFilter.length > 0 && selectedFilter.length === headCellFilter.length}
            onChange={handleSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
          Hiển thị cột
        </MenuItem>
        <Divider />
        {headCells
          .filter((cell) => cell.id.toString() !== OrderSortBy.NAME && cell.id.toString() !== OrderSortBy.STATUS)
          .map((cell, index) => {
            const isItemSelected = isSelected(cell.id as string);
            return (
              <MenuItem key={cell.id as string}>
                <Checkbox
                  color="primary"
                  checked={isItemSelected}
                  inputProps={{
                    'aria-labelledby': `enhanced-table-checkbox-${index}`,
                  }}
                  onClick={(event) => handleClick(event, cell.id as string)}
                />
                {cell.label}
              </MenuItem>
            );
          })}
      </MUIPopover>
    </>
  );
}

export default CustomTableToolbar;
