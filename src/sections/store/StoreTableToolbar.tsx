/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import ReplayIcon from '@mui/icons-material/Replay';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { IconButton, InputAdornment, MenuItem, Stack, TextField, Tooltip } from '@mui/material';
// redux
import { useAppDispatch } from 'redux/configStore';
import { getAllStores } from 'redux/store/storeSlice';
//
import { ListParams, STORE_STATUS_TABS } from '@types';
import { Status } from 'common/enum';
import { useDebounce, useLocales, usePagination } from 'hooks';
import { StyledRoot, StyledSearch } from '../styles';

// ----------------------------------------------------------------------

interface StoreTableToolbarProps {
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filterName: string;
  haveSelectStatus?: boolean;
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
}

function StoreTableToolbar({ filterName, onFilterName, status, setStatus, haveSelectStatus }: StoreTableToolbarProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { translate } = useLocales();
  const { page, rowsPerPage } = usePagination();

  const debounceValue = useDebounce(filterName, 500);

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        itemsPerPage: rowsPerPage,
        currentPage: page + 1,
        searchValue: debounceValue,
      },
      navigate,
    };
  }, [page, rowsPerPage, debounceValue]);

  return (
    <StyledRoot>
      <Stack direction="row" gap={2}>
        {haveSelectStatus && (
          <Stack width={180}>
            <TextField
              label={translate('table.status')}
              select
              size="small"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              fullWidth
            >
              {STORE_STATUS_TABS.map((statusItem) => (
                <MenuItem key={statusItem.id} value={statusItem.value}>
                  {statusItem.value === Status.ACTIVE
                    ? translate('status.active')
                    : statusItem.value === Status.INACTIVE
                    ? translate('status.inactive')
                    : statusItem.value === Status.BE_CONFIRMING
                    ? translate('status.beConfirming')
                    : statusItem.value === Status.REJECTED
                    ? translate('status.reject')
                    : ''}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        )}

        <StyledSearch
          size="small"
          value={filterName}
          onChange={onFilterName}
          placeholder={translate('page.title.search', { model: translate('model.lowercase.store') })}
          startAdornment={
            <InputAdornment position="start">
              <SearchRoundedIcon sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          }
        />
      </Stack>

      <Tooltip title={translate('button.reload')}>
        <IconButton onClick={() => dispatch<any>(getAllStores(params))}>
          <ReplayIcon />
        </IconButton>
      </Tooltip>
    </StyledRoot>
  );
}

export default StoreTableToolbar;
